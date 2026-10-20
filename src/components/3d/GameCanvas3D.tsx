import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LocationId, InteractableObject } from '../../types';
import { LOCATIONS } from '../../data/locations';
import { INTERACTABLE_OBJECTS, getCollisionBoxes, WORLD_WIDTH, WORLD_HEIGHT } from '../../data/worldMap';
import { sound } from '../../services/sound';
import { createCharacterMesh } from './CharacterMesh';
import { build3DWorld } from './SceneBuilder';

export interface GameCanvas3DProps {
  playerPos: { x: number; y: number };
  onPlayerMove: (pos: { x: number; y: number }) => void;
  onLocationChange: (loc: LocationId) => void;
  onNearbyObjectChange: (obj: InteractableObject | null) => void;
  onTriggerInteraction: () => void;
  touchDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;
  speedMultiplier?: number;
  isPaused?: boolean;
  isPlayerVisible?: boolean;
  playerInterferenceMode?: boolean;
  darknessLevel?: number;
  glitchActive?: boolean;
  discoveredRecordIds?: string[];
}

export const GameCanvas3D: React.FC<GameCanvas3DProps> = ({
  playerPos,
  onPlayerMove,
  onLocationChange,
  onNearbyObjectChange,
  onTriggerInteraction,
  touchDirection,
  speedMultiplier = 1.0,
  isPaused = false,
  isPlayerVisible = true,
  playerInterferenceMode = false,
  darknessLevel = 0,
  glitchActive = false,
  discoveredRecordIds = [],
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Mutable refs to decouple Three.js render loop from React state re-renders
  const stateRef = useRef({
    player: {
      x: playerPos.x,
      y: playerPos.y,
      direction: 'DOWN' as 'UP' | 'DOWN' | 'LEFT' | 'RIGHT',
      isMoving: false,
      stepCounter: 0,
    },
    touchDirection,
    speedMultiplier,
    isPaused,
    isPlayerVisible,
    playerInterferenceMode,
    darknessLevel,
    glitchActive,
    discoveredRecordIds,
    cameraYaw: 0, // radians
    cameraPitch: 0.35, // radians elevation
    cameraDist: 180, // follow distance
    velX: 0,
    velY: 0,
    isDragging: false,
    dragLastX: 0,
    dragLastY: 0,
  });

  // Sync props to ref
  stateRef.current.touchDirection = touchDirection;
  stateRef.current.speedMultiplier = speedMultiplier;
  stateRef.current.isPaused = isPaused;
  stateRef.current.isPlayerVisible = isPlayerVisible;
  stateRef.current.playerInterferenceMode = playerInterferenceMode;
  stateRef.current.darknessLevel = darknessLevel;
  stateRef.current.glitchActive = glitchActive;
  stateRef.current.discoveredRecordIds = discoveredRecordIds;

  const callbacksRef = useRef({
    onPlayerMove,
    onLocationChange,
    onNearbyObjectChange,
    onTriggerInteraction,
  });
  callbacksRef.current = {
    onPlayerMove,
    onLocationChange,
    onNearbyObjectChange,
    onTriggerInteraction,
  };

  const keysPressedRef = useRef<{ [key: string]: boolean }>({});
  const lastLocationRef = useRef<LocationId | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js guidelines
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as WebGLRenderingContext).RENDERER;
        const gpu = String((gl as WebGLRenderingContext).getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Width & Height
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: !isSoftwareGl,
      stencil: false,
      depth: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.85;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(54, width / height, 1, 3000);

    // 3. Scene and World Setup
    const { scene, disposables, update: updateWorld, interactiveMarkers } = build3DWorld();

    // High-visibility, crisp retro daytime illumination
    const hemiLight = new THREE.HemisphereLight(0xbdf5ca, 0x476b4e, 1.6);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0x7ea886, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf2fff5, 2.0);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 600;
    dirLight.shadow.camera.left = -180;
    dirLight.shadow.camera.right = 180;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -180;
    dirLight.shadow.bias = -0.0006;
    scene.add(dirLight);

    // Complementary fill light to soften building backsides and alley shadows
    const fillLight = new THREE.DirectionalLight(0x9bd4aa, 1.2);
    fillLight.position.set(-200, 140, -180);
    scene.add(fillLight);

    // 4. Character (Lucas) Setup
    const character = createCharacterMesh();
    scene.add(character.group);

    // Lucas ambient aura light - illuminates surrounding paths, doorways, and interiors
    const playerAura = new THREE.PointLight(0xc6fad2, 1.4, 250, 1.3);
    playerAura.position.set(0, 16, 0);
    character.group.add(playerAura);

    // Collision Boxes from worldMap
    const collisionBoxes = getCollisionBoxes();

    const checkCollision = (cx: number, cy: number, radius = 9.5): boolean => {
      // Map boundaries
      if (cx - radius < 0 || cx + radius > WORLD_WIDTH || cy - radius < 0 || cy + radius > WORLD_HEIGHT) {
        return true;
      }

      for (let i = 0; i < collisionBoxes.length; i++) {
        const box = collisionBoxes[i];
        const closestX = Math.max(box.x, Math.min(cx, box.x + box.w));
        const closestY = Math.max(box.y, Math.min(cy, box.y + box.h));
        const distX = cx - closestX;
        const distY = cy - closestY;
        if (distX * distX + distY * distY < radius * radius) {
          return true;
        }
      }
      return false;
    };

    // Reusable Vector trackers (zero memory allocations in render loop)
    const camTarget = new THREE.Vector3(playerPos.x, 18, playerPos.y);
    const camCurrentPos = new THREE.Vector3(playerPos.x, 90, playerPos.y + 180);
    camera.position.copy(camCurrentPos);
    camera.lookAt(camTarget);

    let animationFrameId = 0;
    let lastTime = performance.now();
    let tickCount = 0;
    let eKeyDownTime = 0;

    // Game loop
    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      tickCount++;

      const state = stateRef.current;
      const player = state.player;

      // Handle pause or freeze
      if (state.isPaused) {
        character.update(false, dt);
        renderer.render(scene, camera);
        return;
      }

      // Keyboard camera rotation (Q and E keys)
      if (keysPressedRef.current['KeyQ'] || keysPressedRef.current['q'] || keysPressedRef.current['BracketLeft']) {
        state.cameraYaw -= 2.5 * dt;
      }
      if (keysPressedRef.current['KeyE'] || keysPressedRef.current['e'] || keysPressedRef.current['BracketRight']) {
        state.cameraYaw += 2.5 * dt;
      }

      // Input gathering: Forward/Backward & Strafe Left/Right
      let inputForward = 0;
      let inputStrafe = 0;

      if (keysPressedRef.current['KeyW'] || keysPressedRef.current['w'] || keysPressedRef.current['ArrowUp']) inputForward += 1;
      if (keysPressedRef.current['KeyS'] || keysPressedRef.current['s'] || keysPressedRef.current['ArrowDown']) inputForward -= 1;
      if (keysPressedRef.current['KeyD'] || keysPressedRef.current['d'] || keysPressedRef.current['ArrowRight']) inputStrafe += 1;
      if (keysPressedRef.current['KeyA'] || keysPressedRef.current['a'] || keysPressedRef.current['ArrowLeft']) inputStrafe -= 1;

      if (state.touchDirection) {
        if (state.touchDirection === 'UP') inputForward += 1;
        if (state.touchDirection === 'DOWN') inputForward -= 1;
        if (state.touchDirection === 'RIGHT') inputStrafe += 1;
        if (state.touchDirection === 'LEFT') inputStrafe -= 1;
      }

      // Camera-relative movement calculation
      // Forward vector projected on world XZ ground plane:
      let targetDirX = 0;
      let targetDirY = 0;

      if (inputForward !== 0 || inputStrafe !== 0) {
        const fX = -Math.sin(state.cameraYaw);
        const fY = -Math.cos(state.cameraYaw);
        const rX = Math.cos(state.cameraYaw);
        const rY = -Math.sin(state.cameraYaw);

        targetDirX = fX * inputForward + rX * inputStrafe;
        targetDirY = fY * inputForward + rY * inputStrafe;

        const len = Math.hypot(targetDirX, targetDirY);
        if (len > 0.001) {
          targetDirX /= len;
          targetDirY /= len;
        }
      }

      // Smooth velocity interpolation for fluid, responsive acceleration
      const maxSpeed = 230 * state.speedMultiplier;
      const targetVx = targetDirX * maxSpeed;
      const targetVy = targetDirY * maxSpeed;

      state.velX = THREE.MathUtils.damp(state.velX, targetVx, 24, dt);
      state.velY = THREE.MathUtils.damp(state.velY, targetVy, 24, dt);

      const currentSpeed = Math.hypot(state.velX, state.velY);
      const isMoving = currentSpeed > 6;

      if (isMoving) {
        const moveX = state.velX * dt;
        const moveY = state.velY * dt;

        // Collision detection with intelligent sliding and corner assist
        // 1. Try full movement
        if (!checkCollision(player.x + moveX, player.y + moveY, 9.5)) {
          player.x += moveX;
          player.y += moveY;
        } else {
          // 2. Try horizontal slide
          let moved = false;
          if (Math.abs(moveX) > 0.001 && !checkCollision(player.x + moveX, player.y, 9.5)) {
            player.x += moveX;
            moved = true;
          }
          // 3. Try vertical slide
          if (Math.abs(moveY) > 0.001 && !checkCollision(player.x, player.y + moveY, 9.5)) {
            player.y += moveY;
            moved = true;
          }

          // 4. Corner rounding assist: gentle lateral nudge when hitting corners/doorways
          if (!moved) {
            if (Math.abs(moveX) > Math.abs(moveY)) {
              if (!checkCollision(player.x + moveX * 0.7, player.y - 6, 9.5)) {
                player.y -= 130 * dt;
              } else if (!checkCollision(player.x + moveX * 0.7, player.y + 6, 9.5)) {
                player.y += 130 * dt;
              }
            } else {
              if (!checkCollision(player.x - 6, player.y + moveY * 0.7, 9.5)) {
                player.x -= 130 * dt;
              } else if (!checkCollision(player.x + 6, player.y + moveY * 0.7, 9.5)) {
                player.x += 130 * dt;
              }
            }
          }
        }

        // Full 360-degree smooth character rotation facing movement vector
        const headingAngle = Math.atan2(state.velX, state.velY);
        character.setTargetAngle(headingAngle);

        // Cardinal direction for 2D sync
        if (Math.abs(state.velY) > Math.abs(state.velX)) {
          player.direction = state.velY > 0 ? 'DOWN' : 'UP';
        } else {
          player.direction = state.velX > 0 ? 'RIGHT' : 'LEFT';
        }

        player.stepCounter += 1;
        if (player.stepCounter % 18 === 0) {
          sound.playStep();
        }

        // Periodic location sync to parent
        if (tickCount % 10 === 0) {
          callbacksRef.current.onPlayerMove({ x: player.x, y: player.y });
        }
      }

      player.isMoving = isMoving;

      // Sync character 3D position & animation
      character.group.position.set(player.x, 0, player.y);
      character.group.visible = state.isPlayerVisible;
      character.update(player.isMoving, dt, state.speedMultiplier);

      // Detect current location
      let detectedLocation: LocationId | null = null;
      for (const [locKey, locData] of Object.entries(LOCATIONS)) {
        const b = locData.bounds;
        if (player.x >= b.x && player.x <= b.x + b.w && player.y >= b.y && player.y <= b.y + b.h) {
          detectedLocation = locKey as LocationId;
          break;
        }
      }

      if (detectedLocation && detectedLocation !== lastLocationRef.current) {
        lastLocationRef.current = detectedLocation;
        callbacksRef.current.onLocationChange(detectedLocation);
      }

      // Proximity detection for interactables
      let closestObj: InteractableObject | null = null;
      let minDist = 85;

      for (const obj of INTERACTABLE_OBJECTS) {
        const cx = obj.x + obj.width / 2;
        const cy = obj.y + obj.height / 2;
        const dist = Math.hypot(player.x - cx, player.y - cy);
        if (dist < minDist) {
          minDist = dist;
          closestObj = obj;
        }
      }

      callbacksRef.current.onNearbyObjectChange(closestObj);

      // Update 3D World animation elements
      updateWorld(currentTime * 0.001, dt);

      // Hide or dim markers for already discovered records
      interactiveMarkers.forEach((m) => {
        const isDiscovered = state.discoveredRecordIds.some((id) => m.id.includes(id.toLowerCase()));
        m.group.visible = !isDiscovered;
      });

      // Directional light tracks Lucas
      dirLight.position.set(player.x + 80, 160, player.y + 110);
      dirLight.target.position.set(player.x, 15, player.y);
      dirLight.target.updateMatrixWorld();

      // Third-person spherical orbit camera following Lucas
      const followDist = state.cameraDist;
      const pitch = state.cameraPitch;
      const yaw = state.cameraYaw;

      const horizDist = Math.cos(pitch) * followDist;
      const idealCamX = player.x + Math.sin(yaw) * horizDist;
      const idealCamZ = player.y + Math.cos(yaw) * horizDist;
      const idealCamY = Math.max(25, 20 + Math.sin(pitch) * followDist + 45);

      camCurrentPos.x = THREE.MathUtils.damp(camCurrentPos.x, idealCamX, 9, dt);
      camCurrentPos.y = THREE.MathUtils.damp(camCurrentPos.y, idealCamY, 9, dt);
      camCurrentPos.z = THREE.MathUtils.damp(camCurrentPos.z, idealCamZ, 9, dt);

      camTarget.x = THREE.MathUtils.damp(camTarget.x, player.x, 14, dt);
      camTarget.y = THREE.MathUtils.damp(camTarget.y, 18, 14, dt);
      camTarget.z = THREE.MathUtils.damp(camTarget.z, player.y, 14, dt);

      // Glitch shaking during ending sequence
      if (state.glitchActive) {
        const jitterX = (Math.random() - 0.5) * 8;
        const jitterY = (Math.random() - 0.5) * 8;
        camera.position.set(camCurrentPos.x + jitterX, camCurrentPos.y + jitterY, camCurrentPos.z);
      } else {
        camera.position.copy(camCurrentPos);
      }

      camera.lookAt(camTarget);

      // Tone mapping exposure adjustment for darkness/ending
      renderer.toneMappingExposure = Math.max(0.05, 1.85 * (1 - state.darknessLevel));

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      keysPressedRef.current[e.code] = true;
      keysPressedRef.current[e.key] = true;

      if (e.key === 'e' || e.key === 'E') {
        eKeyDownTime = performance.now();
      } else if (e.key === 'Enter' || e.code === 'Space') {
        callbacksRef.current.onTriggerInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressedRef.current[e.code] = false;
      keysPressedRef.current[e.key] = false;

      if (e.key === 'e' || e.key === 'E') {
        // Quick tap (< 280ms) triggers interaction, while holding rotates camera smoothly
        if (performance.now() - eKeyDownTime < 280) {
          callbacksRef.current.onTriggerInteraction();
        }
      }
    };

    // Mouse / Touch orbit camera drag
    const handleMouseDown = (e: MouseEvent) => {
      // Support left click (0) or right click (2)
      if (e.button === 0 || e.button === 2) {
        stateRef.current.isDragging = true;
        stateRef.current.dragLastX = e.clientX;
        stateRef.current.dragLastY = e.clientY;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragLastX;
        const deltaY = e.clientY - stateRef.current.dragLastY;
        stateRef.current.dragLastX = e.clientX;
        stateRef.current.dragLastY = e.clientY;

        stateRef.current.cameraYaw -= deltaX * 0.0055;
        stateRef.current.cameraPitch = Math.max(-0.15, Math.min(0.9, stateRef.current.cameraPitch + deltaY * 0.004));
      }
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    // Mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.cameraDist = Math.max(90, Math.min(270, stateRef.current.cameraDist + e.deltaY * 0.16));
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Touch orbit camera drag
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1 && e.touches[0].clientX > window.innerWidth * 0.4) {
        stateRef.current.isDragging = true;
        stateRef.current.dragLastX = e.touches[0].clientX;
        stateRef.current.dragLastY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - stateRef.current.dragLastX;
        const deltaY = e.touches[0].clientY - stateRef.current.dragLastY;
        stateRef.current.dragLastX = e.touches[0].clientX;
        stateRef.current.dragLastY = e.touches[0].clientY;

        stateRef.current.cameraYaw -= deltaX * 0.007;
        stateRef.current.cameraPitch = Math.max(-0.15, Math.min(0.9, stateRef.current.cameraPitch + deltaY * 0.005));
      }
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    // Custom event listener for camera controls from UI/HUD buttons
    const handleCustomCameraTurn = (e: Event) => {
      const evt = e as CustomEvent<{ deltaYaw?: number; deltaZoom?: number }>;
      if (evt.detail?.deltaYaw) {
        stateRef.current.cameraYaw += evt.detail.deltaYaw;
      }
      if (evt.detail?.deltaZoom) {
        stateRef.current.cameraDist = Math.max(90, Math.min(270, stateRef.current.cameraDist + evt.detail.deltaZoom));
      }
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);
    window.addEventListener('turnCamera3D', handleCustomCameraTurn);

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', handleMouseDown);
    canvasDom.addEventListener('wheel', handleWheel, { passive: false });
    canvasDom.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvasDom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('turnCamera3D', handleCustomCameraTurn);

      canvasDom.removeEventListener('mousedown', handleMouseDown);
      canvasDom.removeEventListener('wheel', handleWheel);
      canvasDom.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvasDom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      character.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#030804] select-none cursor-grab active:cursor-grabbing"
      title="Clique e arraste ou use Q/E para virar a câmera | Roda do mouse para zoom"
    />
  );
};
