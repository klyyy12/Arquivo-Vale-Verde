import React, { useEffect, useRef } from 'react';
import {
  InteractableObject,
  LocationId,
  PlayerState,
} from '../types';
import {
  BUILDINGS,
  BUILDING_WALKWAYS,
  CROSSWALKS,
  getCollisionBoxes,
  INTERACTABLE_OBJECTS,
  LAKE_POINTS,
  PROPS,
  ROADS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  ZOO_ENCLOSURES,
  ZOO_WALKWAYS,
} from '../data/worldMap';
import { LOCATIONS } from '../data/locations';
import { TOWN_FURNITURE } from '../data/furniture';
import { renderFurnitureItem } from '../utils/furnitureRenderer';
import { sound } from '../services/sound';

interface GameCanvasProps {
  playerPos: { x: number; y: number };
  onPlayerMove: (pos: { x: number; y: number }) => void;
  onLocationChange: (locationId: LocationId) => void;
  onNearbyObjectChange: (obj: InteractableObject | null) => void;
  onTriggerInteraction: () => void;
  touchDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;
  speedMultiplier: number;
  isPaused: boolean;
  isPlayerVisible?: boolean;
  playerInterferenceMode?: boolean;
  darknessLevel?: number;
  glitchActive?: boolean;
  discoveredRecordIds?: string[];
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  playerPos,
  onPlayerMove,
  onLocationChange,
  onNearbyObjectChange,
  onTriggerInteraction,
  touchDirection,
  speedMultiplier,
  isPaused,
  isPlayerVisible = true,
  playerInterferenceMode = false,
  darknessLevel = 0,
  glitchActive = false,
  discoveredRecordIds = [],
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Player state refs to ensure 60fps without React re-render lags
  const playerRef = useRef<PlayerState>({
    x: playerPos.x,
    y: playerPos.y,
    vx: 0,
    vy: 0,
    direction: 'DOWN',
    isMoving: false,
    stepCounter: 0,
  });

  const cameraRef = useRef<{ x: number; y: number }>({
    x: Math.max(0, playerPos.x - window.innerWidth / 2),
    y: Math.max(0, playerPos.y - window.innerHeight / 2),
  });

  const keysHeld = useRef<Record<string, boolean>>({});
  const lastLocationRef = useRef<LocationId | null>(null);
  const collisionBoxesRef = useRef(getCollisionBoxes());
  const tickRef = useRef<number>(0);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysHeld.current[e.key.toLowerCase()] = true;
      keysHeld.current[e.code] = true;

      if ((e.key === 'e' || e.key === 'E') && !isPaused) {
        onTriggerInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysHeld.current[e.key.toLowerCase()] = false;
      keysHeld.current[e.code] = false;
    };

    const handleBlur = () => {
      keysHeld.current = {};
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isPaused, onTriggerInteraction]);

  // Main game loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Responsive canvas resizing
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const checkCollision = (x: number, y: number, radius = 12): boolean => {
      const pLeft = x - radius;
      const pRight = x + radius;
      const pTop = y - radius;
      const pBottom = y + radius;

      for (const box of collisionBoxesRef.current) {
        if (
          pRight > box.x &&
          pLeft < box.x + box.w &&
          pBottom > box.y &&
          pTop < box.y + box.h
        ) {
          return true;
        }
      }
      return false;
    };

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      tickRef.current += 1;

      if (!isPaused) {
        const player = playerRef.current;
        let dx = 0;
        let dy = 0;

        // Input polling
        if (keysHeld.current['w'] || keysHeld.current['arrowup'] || touchDirection === 'UP') dy -= 1;
        if (keysHeld.current['s'] || keysHeld.current['arrowdown'] || touchDirection === 'DOWN') dy += 1;
        if (keysHeld.current['a'] || keysHeld.current['arrowleft'] || touchDirection === 'LEFT') dx -= 1;
        if (keysHeld.current['d'] || keysHeld.current['arrowright'] || touchDirection === 'RIGHT') dx += 1;

        if (dx !== 0 && dy !== 0) {
          dx *= Math.SQRT1_2;
          dy *= Math.SQRT1_2;
        }

        const baseSpeed = 220 * speedMultiplier;
        const moveDistX = dx * baseSpeed * dt;
        const moveDistY = dy * baseSpeed * dt;

        // X collision resolution with corner sliding assist
        if (moveDistX !== 0) {
          const nextX = player.x + moveDistX;
          if (!checkCollision(nextX, player.y, 12)) {
            player.x = nextX;
          } else {
            // Corner slide assist when moving horizontally near doorway/obstacle edge
            if (dy === 0) {
              if (!checkCollision(nextX, player.y - 8, 12)) {
                player.y -= baseSpeed * dt * 0.6;
                if (!checkCollision(nextX, player.y, 12)) player.x = nextX;
              } else if (!checkCollision(nextX, player.y + 8, 12)) {
                player.y += baseSpeed * dt * 0.6;
                if (!checkCollision(nextX, player.y, 12)) player.x = nextX;
              }
            }
          }
        }

        // Y collision resolution with corner sliding assist
        if (moveDistY !== 0) {
          const nextY = player.y + moveDistY;
          if (!checkCollision(player.x, nextY, 12)) {
            player.y = nextY;
          } else {
            // Corner slide assist when moving vertically near doorway/obstacle edge
            if (dx === 0) {
              if (!checkCollision(player.x - 8, nextY, 12)) {
                player.x -= baseSpeed * dt * 0.6;
                if (!checkCollision(player.x, nextY, 12)) player.y = nextY;
              } else if (!checkCollision(player.x + 8, nextY, 12)) {
                player.x += baseSpeed * dt * 0.6;
                if (!checkCollision(player.x, nextY, 12)) player.y = nextY;
              }
            }
          }
        }

        // Update direction & movement state
        player.isMoving = dx !== 0 || dy !== 0;
        if (player.isMoving) {
          if (Math.abs(dy) > Math.abs(dx)) {
            player.direction = dy > 0 ? 'DOWN' : 'UP';
          } else {
            player.direction = dx > 0 ? 'RIGHT' : 'LEFT';
          }

          player.stepCounter += 1;
          if (player.stepCounter % 18 === 0) {
            sound.playStep();
          }

          // Report player position every few frames for saving
          if (tickRef.current % 15 === 0) {
            onPlayerMove({ x: player.x, y: player.y });
          }
        }

        // Location identification check
        let detectedLocation: LocationId | null = null;
        for (const [locKey, locData] of Object.entries(LOCATIONS)) {
          const b = locData.bounds;
          if (
            player.x >= b.x &&
            player.x <= b.x + b.w &&
            player.y >= b.y &&
            player.y <= b.y + b.h
          ) {
            detectedLocation = locKey as LocationId;
            break;
          }
        }

        if (detectedLocation && detectedLocation !== lastLocationRef.current) {
          lastLocationRef.current = detectedLocation;
          onLocationChange(detectedLocation);
        }

        // Proximity detection for interactable objects (Comfortable 85px threshold)
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
        onNearbyObjectChange(closestObj);

        // Smooth camera lerp
        const targetCamX = player.x - canvas.width / 2;
        const targetCamY = player.y - canvas.height / 2;
        const maxCamX = Math.max(0, WORLD_WIDTH - canvas.width);
        const maxCamY = Math.max(0, WORLD_HEIGHT - canvas.height);

        cameraRef.current.x += (Math.max(0, Math.min(targetCamX, maxCamX)) - cameraRef.current.x) * 0.1;
        cameraRef.current.y += (Math.max(0, Math.min(targetCamY, maxCamY)) - cameraRef.current.y) * 0.1;
      }

      // RENDER PASS
      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;
      const player = playerRef.current;

      ctx.save();
      // 1. Clear background
      ctx.fillStyle = '#020702';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.translate(-camX, -camY);

      // 2. Draw ground grid / sector lines
      ctx.strokeStyle = '#051806';
      ctx.lineWidth = 1;
      const gridSize = 100;
      const startGridX = Math.floor(camX / gridSize) * gridSize;
      const endGridX = camX + canvas.width + gridSize;
      const startGridY = Math.floor(camY / gridSize) * gridSize;
      const endGridY = camY + canvas.height + gridSize;

      for (let gx = startGridX; gx <= endGridX; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, camY);
        ctx.lineTo(gx, camY + canvas.height);
        ctx.stroke();
      }
      for (let gy = startGridY; gy <= endGridY; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(camX, gy);
        ctx.lineTo(camX + canvas.width, gy);
        ctx.stroke();
      }

      // 3. Draw Building Access Walkways & Sidewalk Connections
      for (const walk of BUILDING_WALKWAYS) {
        ctx.fillStyle = '#061d09';
        ctx.fillRect(walk.x, walk.y, walk.w, walk.h);
        ctx.strokeStyle = '#1a5c28';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(walk.x, walk.y, walk.w, walk.h);

        // Subtle paving pattern
        ctx.strokeStyle = '#0e3816';
        ctx.lineWidth = 1;
        if (walk.h > walk.w) {
          for (let py = walk.y + 16; py < walk.y + walk.h; py += 16) {
            ctx.beginPath();
            ctx.moveTo(walk.x + 2, py);
            ctx.lineTo(walk.x + walk.w - 2, py);
            ctx.stroke();
          }
        } else {
          for (let px = walk.x + 16; px < walk.x + walk.w; px += 16) {
            ctx.beginPath();
            ctx.moveTo(px, walk.y + 2);
            ctx.lineTo(px, walk.y + walk.h - 2);
            ctx.stroke();
          }
        }
      }

      // Draw Roads
      for (const road of ROADS) {
        // Road surface
        ctx.fillStyle = '#041205';
        ctx.fillRect(road.x, road.y, road.w, road.h);

        // Road borders
        ctx.strokeStyle = '#1b5c27';
        ctx.lineWidth = 2;
        ctx.strokeRect(road.x, road.y, road.w, road.h);

        // Road dashed centerline
        ctx.strokeStyle = '#26E85A';
        ctx.lineWidth = 2;
        ctx.setLineDash([16, 16]);
        ctx.beginPath();
        if (road.w > road.h) {
          ctx.moveTo(road.x, road.y + road.h / 2);
          ctx.lineTo(road.x + road.w, road.y + road.h / 2);
        } else {
          ctx.moveTo(road.x + road.w / 2, road.y);
          ctx.lineTo(road.x + road.w / 2, road.y + road.h);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Road Street Name in 1983 green phosphor
        ctx.font = '10px "Courier Prime", monospace';
        ctx.fillStyle = '#478C50';
        ctx.fillText(road.name, road.x + 12, road.y + 18);
      }

      // Draw Crosswalks (Faixas de Pedestre)
      for (const cw of CROSSWALKS) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 3;
        if (cw.isHorizontal) {
          for (let px = cw.x + 6; px < cw.x + cw.w - 6; px += 14) {
            ctx.beginPath();
            ctx.moveTo(px, cw.y + 4);
            ctx.lineTo(px, cw.y + cw.h - 4);
            ctx.stroke();
          }
        } else {
          for (let py = cw.y + 6; py < cw.y + cw.h - 6; py += 14) {
            ctx.beginPath();
            ctx.moveTo(cw.x + 4, py);
            ctx.lineTo(cw.x + cw.w - 4, py);
            ctx.stroke();
          }
        }
      }

      // 4. Draw Lake (Lago Vale Verde)
      ctx.fillStyle = '#031908';
      ctx.beginPath();
      ctx.moveTo(LAKE_POINTS[0].x, LAKE_POINTS[0].y);
      for (let i = 1; i < LAKE_POINTS.length; i++) {
        ctx.lineTo(LAKE_POINTS[i].x, LAKE_POINTS[i].y);
      }
      ctx.closePath();
      ctx.fill();

      // Shoreline outline
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Animated wave ripples on Lake
      ctx.strokeStyle = '#1c7230';
      ctx.lineWidth = 1.5;
      const waveT = tickRef.current * 0.04;
      for (let wy = 450; wy < 2500; wy += 90) {
        for (let wx = 80; wx < 600; wx += 140) {
          const shift = Math.sin(waveT + wx * 0.05 + wy * 0.02) * 8;
          ctx.beginPath();
          ctx.moveTo(wx + shift, wy);
          ctx.lineTo(wx + 40 + shift, wy);
          ctx.stroke();
        }
      }

      // Lake Title & Warning
      ctx.font = 'bold 16px "Courier Prime", monospace';
      ctx.fillStyle = '#55FF6A';
      ctx.fillText('LAGO VALE VERDE', 180, 700);
      ctx.font = '11px "Courier Prime", monospace';
      ctx.fillStyle = '#FFB000';
      ctx.fillText('ÁREA DE REPRESA MUNICIPAL — ACESSO RESTRITO', 180, 725);

      // Pier over lake
      ctx.fillStyle = '#1c381c';
      ctx.fillRect(620, 1200, 150, 60);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 2;
      ctx.strokeRect(620, 1200, 150, 60);
      // Pier planks
      for (let px = 630; px < 760; px += 14) {
        ctx.beginPath();
        ctx.moveTo(px, 1200);
        ctx.lineTo(px, 1260);
        ctx.stroke();
      }

      // 5. Draw Buildings & Detailed Interiors
      for (const b of BUILDINGS) {
        // Floor area
        ctx.fillStyle = '#061a08';
        ctx.fillRect(b.x, b.y, b.w, b.h);

        // Floor grid tiles
        ctx.strokeStyle = '#0a280f';
        ctx.lineWidth = 1;
        for (let fx = b.x + 30; fx < b.x + b.w; fx += 30) {
          ctx.beginPath();
          ctx.moveTo(fx, b.y);
          ctx.lineTo(fx, b.y + b.h);
          ctx.stroke();
        }
        for (let fy = b.y + 30; fy < b.y + b.h; fy += 30) {
          ctx.beginPath();
          ctx.moveTo(b.x, fy);
          ctx.lineTo(b.x + b.w, fy);
          ctx.stroke();
        }

        // Room partitions
        if (b.rooms) {
          ctx.strokeStyle = '#185022';
          ctx.lineWidth = 2;
          for (const rm of b.rooms) {
            ctx.strokeRect(rm.x, rm.y, rm.w, rm.h);
            ctx.font = '9px "Courier Prime", monospace';
            ctx.fillStyle = '#478C50';
            ctx.fillText(rm.name, rm.x + 8, rm.y + 16);
          }
        }

        // Interior Furniture & Props for this building
        for (const f of TOWN_FURNITURE) {
          if (f.buildingId === b.id) {
            renderFurnitureItem(ctx, f, tickRef.current);
          }
        }

        // Exterior Walls (with doorway gap supporting North and South entrances)
        ctx.strokeStyle = '#26E85A';
        ctx.lineWidth = 3;

        const isNorthDoor = Math.abs(b.door.y - b.y) <= 30;
        const d = b.door;

        if (isNorthDoor) {
          // Top wall has the entrance cutout
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(d.x, b.y);
          ctx.moveTo(d.x + d.w, b.y);
          ctx.lineTo(b.x + b.w, b.y);
          // East wall
          ctx.lineTo(b.x + b.w, b.y + b.h);
          // South wall (solid)
          ctx.lineTo(b.x, b.y + b.h);
          // West wall
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // Entrance threshold marker on north
          ctx.strokeStyle = '#55FF6A';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(d.x, d.y - 4, d.w, 8);
          ctx.setLineDash([]);
        } else {
          // Standard South wall entrance cutout
          // Top, left, right walls
          ctx.beginPath();
          ctx.moveTo(b.x, b.y + b.h);
          ctx.lineTo(b.x, b.y);
          ctx.lineTo(b.x + b.w, b.y);
          ctx.lineTo(b.x + b.w, b.y + b.h);
          ctx.stroke();

          // Bottom wall with entrance cutout
          ctx.beginPath();
          ctx.moveTo(b.x, b.y + b.h);
          ctx.lineTo(d.x, b.y + b.h);
          ctx.moveTo(d.x + d.w, b.y + b.h);
          ctx.lineTo(b.x + b.w, b.y + b.h);
          ctx.stroke();

          // Entrance threshold marker on south
          ctx.strokeStyle = '#55FF6A';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(d.x, d.y - 4, d.w, 8);
          ctx.setLineDash([]);
        }

        // Building Facade Name
        ctx.font = 'bold 12px "Courier Prime", monospace';
        ctx.fillStyle = '#55FF6A';
        ctx.fillText(b.name, b.x + 12, b.y - 8);
      }

      // 6. Draw Zoo Trails, Plaza, Enclosures & Technical Research Complex
      // 6.1 Paved Visitor Pathways & Technical Corridors
      for (const walk of ZOO_WALKWAYS) {
        if (walk.type === 'MAIN_PLAZA') {
          ctx.fillStyle = '#061f0c';
          ctx.fillRect(walk.x, walk.y, walk.w, walk.h);
          ctx.strokeStyle = '#1b5a28';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(walk.x, walk.y, walk.w, walk.h);

          // Radial decorative cobblestone rays from center plaza
          ctx.strokeStyle = '#0e3816';
          ctx.lineWidth = 1;
          for (let px = walk.x + 20; px < walk.x + walk.w; px += 25) {
            ctx.beginPath();
            ctx.moveTo(px, walk.y);
            ctx.lineTo(px, walk.y + walk.h);
            ctx.stroke();
          }
        } else if (walk.type === 'TECHNICAL') {
          // Technical restricted corridor
          ctx.fillStyle = '#041508';
          ctx.fillRect(walk.x, walk.y, walk.w, walk.h);
          ctx.strokeStyle = '#26E85A';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(walk.x, walk.y, walk.w, walk.h);

          // Diagonal caution hazard stripes along border
          ctx.strokeStyle = '#FFB000';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
          ctx.strokeRect(walk.x + 2, walk.y + 2, walk.w - 4, walk.h - 4);
          ctx.setLineDash([]);
        } else {
          // Standard visitor gravel / stone trails
          ctx.fillStyle = '#051a09';
          ctx.fillRect(walk.x, walk.y, walk.w, walk.h);
          ctx.strokeStyle = '#185022';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(walk.x, walk.y, walk.w, walk.h);

          // Trail border dots
          ctx.fillStyle = '#1e632b';
          if (walk.w > walk.h) {
            for (let px = walk.x + 8; px < walk.x + walk.w; px += 20) {
              ctx.fillRect(px, walk.y + 2, 2, 2);
              ctx.fillRect(px, walk.y + walk.h - 4, 2, 2);
            }
          } else {
            for (let py = walk.y + 8; py < walk.y + walk.h; py += 20) {
              ctx.fillRect(walk.x + 2, py, 2, 2);
              ctx.fillRect(walk.x + walk.w - 4, py, 2, 2);
            }
          }
        }
      }

      // Central Plaza Ornamental Vector Fountain / Pond
      const fontX = 3100;
      const fontY = 1320;
      const fontRad = 24;
      ctx.fillStyle = '#031a09';
      ctx.beginPath();
      ctx.arc(fontX, fontY, fontRad, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Animated water ripple rings in the fountain
      const fountainRipple = (tickRef.current * 0.05) % 1;
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(fontX, fontY, fontRad * fountainRipple, 0, Math.PI * 2);
      ctx.stroke();

      // Fountain center spout
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(fontX - 2, fontY - 2, 4, 4);

      // 6.2 Zoo 4 Enclosures with Rich Visual Details
      for (const enc of ZOO_ENCLOSURES) {
        ctx.fillStyle = enc.waterFeature ? '#031d0a' : '#051808';
        ctx.fillRect(enc.x, enc.y, enc.w, enc.h);

        // Heavy chainlink fence boundary
        ctx.strokeStyle = '#26E85A';
        ctx.lineWidth = 2;
        ctx.strokeRect(enc.x, enc.y, enc.w, enc.h);

        // Enclosure Name Header
        ctx.font = 'bold 10px "Courier Prime", monospace';
        ctx.fillStyle = '#55FF6A';
        ctx.fillText(enc.name, enc.x + 8, enc.y + 16);

        // Detail per Category:
        if (enc.category === 'AVES') {
          // Aviary diamond wire mesh texture
          ctx.strokeStyle = '#0d3816';
          ctx.lineWidth = 1;
          for (let mx = enc.x + 20; mx < enc.x + enc.w; mx += 30) {
            ctx.beginPath();
            ctx.moveTo(mx, enc.y + 24);
            ctx.lineTo(mx + 20, enc.y + enc.h - 10);
            ctx.stroke();
          }

          // Perches and nesting platforms
          ctx.strokeStyle = '#478C50';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(enc.x + 40, enc.y + 80);
          ctx.lineTo(enc.x + 120, enc.y + 80);
          ctx.moveTo(enc.x + 140, enc.y + 120);
          ctx.lineTo(enc.x + 200, enc.y + 120);
          ctx.stroke();

          // Animated flying / gliding bird silhouettes
          const birdTick = tickRef.current * 0.08;
          const b1X = enc.x + 60 + Math.sin(birdTick) * 35;
          const b1Y = enc.y + 70 + Math.cos(birdTick * 0.7) * 15;
          const wing = Math.sin(birdTick * 3) * 4;

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(b1X - 6, b1Y - wing);
          ctx.lineTo(b1X, b1Y);
          ctx.lineTo(b1X + 6, b1Y - wing);
          ctx.stroke();

          // Second bird silhouette
          const b2X = enc.x + 150 + Math.cos(birdTick * 0.9) * 25;
          const b2Y = enc.y + 110 + Math.sin(birdTick * 0.8) * 12;
          ctx.beginPath();
          ctx.moveTo(b2X - 5, b2Y + wing);
          ctx.lineTo(b2X, b2Y);
          ctx.lineTo(b2X + 5, b2Y + wing);
          ctx.stroke();
        } else if (enc.category === 'MAMIFEROS') {
          // Cerrado grassland and shelter canopy
          ctx.fillStyle = '#092911';
          ctx.fillRect(enc.x + 30, enc.y + 40, 70, 50);
          ctx.strokeStyle = '#185022';
          ctx.strokeRect(enc.x + 30, enc.y + 40, 70, 50);
          ctx.font = '8px "Courier Prime", monospace';
          ctx.fillStyle = '#478C50';
          ctx.fillText('ABRIGO', enc.x + 46, enc.y + 68);

          // Water trough
          ctx.fillStyle = '#031407';
          ctx.fillRect(enc.x + 130, enc.y + 60, 40, 20);
          ctx.strokeStyle = '#26E85A';
          ctx.strokeRect(enc.x + 130, enc.y + 60, 40, 20);

          // Subtle deer / wolf resting silhouette
          ctx.strokeStyle = '#55FF6A';
          ctx.lineWidth = 1.5;
          const mx = enc.x + 110;
          const my = enc.y + 130;
          ctx.beginPath();
          ctx.ellipse(mx, my, 14, 8, 0, 0, Math.PI * 2);
          ctx.stroke();
          // Ears / Antlers
          ctx.beginPath();
          ctx.moveTo(mx + 10, my - 6);
          ctx.lineTo(mx + 16, my - 14);
          ctx.stroke();
        } else if (enc.category === 'REPTEIS') {
          // Terrarium glass wall dividers
          ctx.strokeStyle = '#55FF6A';
          ctx.lineWidth = 1;
          ctx.setLineDash([8, 8]);
          ctx.strokeRect(enc.x + 20, enc.y + 35, enc.w - 40, enc.h - 55);
          ctx.setLineDash([]);

          // Basking rock with warm amber lamp halo
          const rx = enc.x + enc.w / 2;
          const ry = enc.y + enc.h / 2;
          ctx.fillStyle = 'rgba(255, 176, 0, 0.1)';
          ctx.beginPath();
          ctx.arc(rx, ry, 30, 0, Math.PI * 2);
          ctx.fill();

          // Rock vector
          ctx.fillStyle = '#08250f';
          ctx.beginPath();
          ctx.ellipse(rx, ry, 22, 14, 0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#26E85A';
          ctx.stroke();

          // Coiled serpent silhouette on rock
          ctx.strokeStyle = '#FFB000';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(rx, ry, 7, 0, Math.PI * 1.5);
          ctx.stroke();
        } else if (enc.category === 'AQUATICOS') {
          // Inner pool with animated water ripples
          const px = enc.x + 25;
          const py = enc.y + 35;
          const pw = enc.w - 50;
          const ph = enc.h - 55;

          ctx.fillStyle = '#021808';
          ctx.fillRect(px, py, pw, ph);
          ctx.strokeStyle = '#227b37';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px, py, pw, ph);

          // Wave ripples
          const waveT = tickRef.current * 0.05;
          ctx.strokeStyle = '#55FF6A';
          ctx.lineWidth = 1;
          for (let wy = py + 20; wy < py + ph - 10; wy += 28) {
            const shift = Math.sin(waveT + wy * 0.1) * 6;
            ctx.beginPath();
            ctx.moveTo(px + 15 + shift, wy);
            ctx.lineTo(px + 50 + shift, wy);
            ctx.moveTo(px + 80 + shift, wy);
            ctx.lineTo(px + 120 + shift, wy);
            ctx.stroke();
          }

          // Floating lily pads / aquatic silhouettes
          ctx.fillStyle = '#1c7230';
          ctx.beginPath();
          ctx.arc(px + 30, py + 30, 6, 0, Math.PI * 1.8);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px + 110, py + 70, 7, 0, Math.PI * 1.8);
          ctx.fill();
        }
      }

      // 6.3 Zoo Outer Perimeter Fence (with visible open entrance at y: 1320-1420)
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 3;
      const zX = 2880;
      const zY = 850;
      const zW = 880;
      const zH = 1300;
      const gY = 1320;
      const gH = 100;

      // North, East, South walls
      ctx.beginPath();
      ctx.moveTo(zX, zY);
      ctx.lineTo(zX + zW, zY);
      ctx.lineTo(zX + zW, zY + zH);
      ctx.lineTo(zX, zY + zH);
      // West fence top segment
      ctx.lineTo(zX, gY + gH);
      // Open gate gap!
      ctx.moveTo(zX, gY);
      ctx.lineTo(zX, zY);
      ctx.stroke();

      // Grand Entrance Archway (Pórtico Principal do Zoológico)
      ctx.fillStyle = '#08250f';
      ctx.fillRect(zX - 35, gY - 25, 35, gH + 50);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(zX - 35, gY - 25, 35, gH + 50);

      // Entrance Pillars & Turnstiles (Catracas)
      ctx.fillStyle = '#0f3816';
      ctx.fillRect(zX - 18, gY + 15, 14, 25);
      ctx.fillRect(zX - 18, gY + 60, 14, 25);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(zX - 18, gY + 15, 14, 25);
      ctx.strokeRect(zX - 18, gY + 60, 14, 25);
      // Turnstile rotating arms
      const turnArm = (tickRef.current * 0.04) % (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(zX - 11, gY + 27, 8, turnArm, turnArm + Math.PI * 0.7);
      ctx.arc(zX - 11, gY + 72, 8, turnArm, turnArm + Math.PI * 0.7);
      ctx.stroke();

      // Grand Zoo Title Banner with Institutional Crest
      ctx.save();
      ctx.translate(zX - 12, gY + gH + 15);
      ctx.rotate(-Math.PI / 2);
      ctx.font = 'bold 12px "Courier Prime", monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('PARQUE ZOOLÓGICO VALE VERDE', 0, 0);
      ctx.font = '8px "Courier Prime", monospace';
      ctx.fillStyle = '#55FF6A';
      ctx.fillText('CONSERVAÇÃO, FAUNA E PESQUISA BIOLÓGICA — 1983', 0, 12);
      ctx.restore();

      // Quiosque Awning & Terrace Furniture
      ctx.fillStyle = '#14461e';
      ctx.fillRect(3215, 1235, 100, 12);
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(3215, 1235, 100, 12);
      for (let ax = 3215; ax < 3315; ax += 16) {
        ctx.fillStyle = ax % 32 === 0 ? '#55FF6A' : '#08250f';
        ctx.fillRect(ax, 1235, 16, 12);
      }
      // Outdoor picnic tables on the quiosque terrace
      const tables = [{ x: 3340, y: 1250 }, { x: 3340, y: 1295 }];
      for (const tbl of tables) {
        // Table top
        ctx.fillStyle = '#0a2e12';
        ctx.fillRect(tbl.x, tbl.y, 45, 20);
        ctx.strokeStyle = '#478C50';
        ctx.strokeRect(tbl.x, tbl.y, 45, 20);
        // Table umbrella pole & canvas top
        ctx.strokeStyle = '#26E85A';
        ctx.beginPath();
        ctx.arc(tbl.x + 22, tbl.y + 10, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(tbl.x + 21, tbl.y + 9, 3, 3);
      }

      // 6.4 Technical Research Area Security Separation Fence (Along x: 3480)
      const secX = 3480;
      const secGateY = 1250;
      const secGateH = 100;

      // Heavy Security Barbed Wire Fence along x: 3480
      ctx.strokeStyle = '#FFB000';
      ctx.lineWidth = 2.5;
      // Top segment
      ctx.beginPath();
      ctx.moveTo(secX, zY);
      ctx.lineTo(secX, secGateY);
      // Bottom segment
      ctx.moveTo(secX, secGateY + secGateH);
      ctx.lineTo(secX, zY + zH);
      ctx.stroke();

      // Barbed wire spiral coils along fence top
      ctx.strokeStyle = '#7c5500';
      ctx.lineWidth = 1;
      for (let fy = zY + 15; fy < zY + zH - 10; fy += 20) {
        if (fy < secGateY || fy > secGateY + secGateH) {
          ctx.beginPath();
          ctx.arc(secX, fy, 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Security Gate Warning Overhead Portal
      ctx.fillStyle = '#061a09';
      ctx.fillRect(secX - 12, secGateY, 24, secGateH);
      ctx.strokeStyle = '#FFB000';
      ctx.lineWidth = 2;
      ctx.strokeRect(secX - 12, secGateY, 24, secGateH);

      // Yellow/Black diagonal hazard stripes along security gate threshold
      ctx.strokeStyle = '#FFB000';
      ctx.lineWidth = 1;
      for (let hy = secGateY + 6; hy < secGateY + secGateH - 6; hy += 14) {
        ctx.beginPath();
        ctx.moveTo(secX - 10, hy);
        ctx.lineTo(secX + 10, hy + 8);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(secX + 4, secGateY + secGateH - 8);
      ctx.rotate(-Math.PI / 2);
      ctx.font = 'bold 9px "Courier Prime", monospace';
      ctx.fillStyle = '#FFB000';
      ctx.fillText('ÁREA RESTRITA — SOMENTE AUTORIZADOS', 0, 0);
      ctx.restore();

      // Dual alternating safety strobe beacons at the gate
      const beaconFlash = (tickRef.current * 0.15) % 2 > 1;
      ctx.fillStyle = beaconFlash ? '#FFB000' : '#4a3500';
      ctx.beginPath();
      ctx.arc(secX - 10, secGateY - 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = !beaconFlash ? '#55FF6A' : '#14461e';
      ctx.beginPath();
      ctx.arc(secX + 10, secGateY - 8, 4, 0, Math.PI * 2);
      ctx.fill();

      // Heavy industrial conduit cables snaking across the corridor between Lab and Isolation Sector
      ctx.strokeStyle = '#185022';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(3570, 1380);
      ctx.lineTo(3570, 1540);
      ctx.moveTo(3610, 1380);
      ctx.lineTo(3610, 1540);
      ctx.stroke();
      // Cable mounting brackets
      ctx.fillStyle = '#478C50';
      for (let by = 1400; by < 1530; by += 25) {
        ctx.fillRect(3566, by, 8, 3);
        ctx.fillRect(3606, by, 8, 3);
      }

      // Live Oscilloscope Display in Research Laboratory (b_zoo_lab observation room at 3520, 1100)
      const oscX = 3525;
      const oscY = 1105;
      const oscW = 40;
      const oscH = 24;
      ctx.fillStyle = '#021205';
      ctx.fillRect(oscX, oscY, oscW, oscH);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1;
      ctx.strokeRect(oscX, oscY, oscW, oscH);
      // Oscilloscope reticle grid
      ctx.strokeStyle = '#0a3012';
      ctx.beginPath();
      ctx.moveTo(oscX, oscY + oscH / 2);
      ctx.lineTo(oscX + oscW, oscY + oscH / 2);
      ctx.moveTo(oscX + oscW / 2, oscY);
      ctx.lineTo(oscX + oscW / 2, oscY + oscH);
      ctx.stroke();
      // Undulating biological telemetry sine wave
      ctx.strokeStyle = '#55FF6A';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const wavePhase = tickRef.current * 0.12;
      for (let wx = 0; wx < oscW; wx += 2) {
        const wy = oscY + oscH / 2 + Math.sin(wavePhase + wx * 0.3) * 6;
        if (wx === 0) ctx.moveTo(oscX + wx, wy);
        else ctx.lineTo(oscX + wx, wy);
      }
      ctx.stroke();

      // Rotating IBM Mainframe Tape Reels in Laboratory Server Room (3640, 1090)
      const reel1X = 3652;
      const reel1Y = 1102;
      const reel2X = 3672;
      const reel2Y = 1102;
      const reelAngle = tickRef.current * 0.08;
      ctx.fillStyle = '#061f0a';
      ctx.fillRect(3642, 1092, 44, 28);
      ctx.strokeStyle = '#26E85A';
      ctx.lineWidth = 1;
      ctx.strokeRect(3642, 1092, 44, 28);
      for (const rx of [reel1X, reel2X]) {
        ctx.strokeStyle = '#55FF6A';
        ctx.beginPath();
        ctx.arc(rx, reel1Y, 7, 0, Math.PI * 2);
        ctx.stroke();
        // Spokes inside reel
        ctx.beginPath();
        ctx.moveTo(rx - Math.cos(reelAngle) * 6, reel1Y - Math.sin(reelAngle) * 6);
        ctx.lineTo(rx + Math.cos(reelAngle) * 6, reel1Y + Math.sin(reelAngle) * 6);
        ctx.moveTo(rx - Math.sin(reelAngle) * 6, reel1Y + Math.cos(reelAngle) * 6);
        ctx.lineTo(rx + Math.sin(reelAngle) * 6, reel1Y - Math.cos(reelAngle) * 6);
        ctx.stroke();
      }

      // Terminal Antigo Centerpiece (DOC-20 at 3615, 1740)
      // Climax mystery location in the deepest chamber of Setor Isolado
      const termX = 3615;
      const termY = 1740;
      const termGlow = 0.22 + Math.sin(tickRef.current * 0.2) * 0.1;
      const glowGrad = ctx.createRadialGradient(termX, termY, 4, termX, termY, 65);
      glowGrad.addColorStop(0, `rgba(85, 255, 106, ${termGlow})`);
      glowGrad.addColorStop(0.5, `rgba(38, 232, 90, ${termGlow * 0.4})`);
      glowGrad.addColorStop(1, 'rgba(85, 255, 106, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(termX, termY, 65, 0, Math.PI * 2);
      ctx.fill();

      // Yellow/Black diagonal safety perimeter on floor around Terminal Antigo
      ctx.strokeStyle = '#FFB000';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(termX - 35, termY - 26, 70, 52);
      for (let hx = termX - 35; hx < termX + 35; hx += 12) {
        ctx.beginPath();
        ctx.moveTo(hx, termY - 26);
        ctx.lineTo(hx + 6, termY - 20);
        ctx.stroke();
      }

      // CRT Scanline raster sweep beam across terminal monitor
      const scanBeamY = termY - 14 + ((tickRef.current * 1.5) % 24);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(termX - 18, scanBeamY);
      ctx.lineTo(termX + 18, scanBeamY);
      ctx.stroke();

      // Blinking terminal core status LED
      const coreBlink = (tickRef.current * 0.1) % 2 > 1;
      ctx.fillStyle = coreBlink ? '#55FF6A' : '#14461e';
      ctx.fillRect(termX + 16, termY - 18, 3, 3);

      // 7. Draw Props (Trees, Lamps, Benches)
      for (const prop of PROPS) {
        if (prop.type === 'TREE') {
          // Tree shadow
          ctx.fillStyle = '#020b03';
          ctx.beginPath();
          ctx.arc(prop.x + 18, prop.y + 24, 18, 0, Math.PI * 2);
          ctx.fill();

          // Vector tree crown
          ctx.strokeStyle = '#26E85A';
          ctx.lineWidth = 2;
          ctx.fillStyle = '#08250b';
          ctx.beginPath();
          ctx.arc(prop.x + 18, prop.y + 18, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Tree trunk
          ctx.fillStyle = '#478C50';
          ctx.fillRect(prop.x + 15, prop.y + 15, 6, 8);
        } else if (prop.type === 'LAMP') {
          // Light cone halo on ground
          const grad = ctx.createRadialGradient(
            prop.x + 10,
            prop.y + 10,
            2,
            prop.x + 10,
            prop.y + 10,
            45
          );
          grad.addColorStop(0, 'rgba(85, 255, 106, 0.18)');
          grad.addColorStop(1, 'rgba(85, 255, 106, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(prop.x + 10, prop.y + 10, 45, 0, Math.PI * 2);
          ctx.fill();

          // Lamp post
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(prop.x + 8, prop.y + 8, 4, 4);
          ctx.strokeStyle = '#26E85A';
          ctx.strokeRect(prop.x + 7, prop.y + 7, 6, 6);
        } else if (prop.type === 'BENCH') {
          ctx.fillStyle = '#0c3010';
          ctx.fillRect(prop.x, prop.y, prop.w, prop.h);
          ctx.strokeStyle = '#478C50';
          ctx.strokeRect(prop.x, prop.y, prop.w, prop.h);
        }
      }

      // 7.5 Draw Exterior Town Furniture & Props (Orelhões 1983, Dumpsters, Hydrants, Mailboxes, Civic Benches)
      for (const f of TOWN_FURNITURE) {
        if (!f.buildingId) {
          if (
            f.x + f.w > camX - 40 &&
            f.x < camX + canvas.width + 40 &&
            f.y + f.h > camY - 40 &&
            f.y < camY + canvas.height + 40
          ) {
            renderFurnitureItem(ctx, f, tickRef.current);
          }
        }
      }

      // 8. Draw Interactive Objects
      for (const obj of INTERACTABLE_OBJECTS) {
        const isNear =
          Math.hypot(
            player.x - (obj.x + obj.width / 2),
            player.y - (obj.y + obj.height / 2)
          ) < 85;

        const isDiscovered = obj.archiveRecordId ? discoveredRecordIds.includes(obj.archiveRecordId) : false;

        // Base item render
        ctx.fillStyle = isNear ? '#0c3b12' : '#06200a';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

        ctx.strokeStyle = isNear ? '#FFFFFF' : isDiscovered ? '#185022' : '#26E85A';
        ctx.lineWidth = isNear ? 2 : 1.5;
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

        // Icon / Symbol inside the object
        ctx.font = 'bold 10px "Courier Prime", monospace';
        ctx.fillStyle = isNear ? '#FFFFFF' : isDiscovered ? '#478C50' : '#55FF6A';
        let symbol = '■';
        if (obj.type === 'COMPUTER' || obj.type === 'TERMINAL') symbol = 'CRT';
        if (obj.type === 'DOCUMENT') symbol = 'DOC';
        if (obj.type === 'CABINET') symbol = 'ARQ';
        if (obj.type === 'BOOKSHELF') symbol = 'LIV';
        if (obj.type === 'MURAL') symbol = 'MUR';
        if (obj.type === 'CRATE') symbol = 'CX';
        if (obj.type === 'LOCKED_DOOR') symbol = 'TRC';
        if (obj.type === 'DOOR') symbol = 'POR';
        if (obj.type === 'ABANDONED_OBJECT') symbol = 'OBJ';
        if (obj.type === 'SIGN') symbol = 'PLC';
        if (obj.type === 'COUNTER') symbol = 'BLC';

        ctx.textAlign = 'center';
        ctx.fillText(symbol, obj.x + obj.width / 2, obj.y + obj.height / 2 + 3);
        ctx.textAlign = 'start';

        // Undiscovered document gentle diamond indicator
        if (!isDiscovered && obj.archiveRecordId && !isNear) {
          const diamondBob = Math.sin(tickRef.current * 0.08 + obj.x * 0.05) * 3;
          ctx.fillStyle = '#55FF6A';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('◆', obj.x + obj.width / 2, obj.y - 6 + diamondBob);
          ctx.textAlign = 'start';
        }

        // Proximity highlight indicator
        if (isNear) {
          ctx.strokeStyle = '#55FF6A';
          ctx.lineWidth = 1.5;
          const pulse = Math.sin(tickRef.current * 0.1) * 3;
          ctx.strokeRect(
            obj.x - 4 - pulse,
            obj.y - 4 - pulse,
            obj.width + 8 + pulse * 2,
            obj.height + 8 + pulse * 2
          );

          // In-world label floating above with [E] badge
          ctx.font = 'bold 9px "Courier Prime", monospace';
          ctx.fillStyle = '#020702';
          const badgeText = '[E] INTERAGIR';
          const badgeW = ctx.measureText(badgeText).width + 8;
          ctx.fillStyle = '#55FF6A';
          ctx.fillRect(obj.x + obj.width / 2 - badgeW / 2, obj.y - 26, badgeW, 14);
          ctx.fillStyle = '#020702';
          ctx.textAlign = 'center';
          ctx.fillText(badgeText, obj.x + obj.width / 2, obj.y - 15);

          ctx.font = '10px "Courier Prime", monospace';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(obj.name, obj.x + obj.width / 2, obj.y - 5);
          ctx.textAlign = 'start';
        }
      }

      // 9. Draw Player or Interference Mark
      if (playerInterferenceMode) {
        // Eerie interference silhouette / phantom static marks where Lucas stood
        ctx.save();
        const flicker = Math.sin(tickRef.current * 0.4) > 0;
        ctx.strokeStyle = flicker ? '#55FF6A' : '#26E85A';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.strokeRect(player.x - 9 + (Math.random() - 0.5) * 3, player.y - 10, 18, 22);
        ctx.setLineDash([]);

        // Phosphor particles drifting
        for (let i = 0; i < 7; i++) {
          ctx.fillStyle = i % 2 === 0 ? '#7CFF8B' : '#478C50';
          ctx.fillRect(
            player.x - 12 + Math.random() * 24,
            player.y - 12 + Math.random() * 26,
            2,
            2
          );
        }
        ctx.restore();
      } else if (isPlayerVisible) {
        // Flashlight cone in direction of view
        ctx.save();
        const coneLength = 110;
        let angle = Math.PI / 2; // DOWN
        if (player.direction === 'UP') angle = -Math.PI / 2;
        if (player.direction === 'LEFT') angle = Math.PI;
        if (player.direction === 'RIGHT') angle = 0;

        const flashGrad = ctx.createRadialGradient(
          player.x,
          player.y,
          10,
          player.x + Math.cos(angle) * coneLength,
          player.y + Math.sin(angle) * coneLength,
          coneLength
        );
        flashGrad.addColorStop(0, 'rgba(85, 255, 106, 0.35)');
        flashGrad.addColorStop(1, 'rgba(85, 255, 106, 0)');

        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.arc(player.x, player.y, coneLength, angle - 0.45, angle + 0.45);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Player Sprite: Lucas dos Santos Pereira (1983 boy investigator)
        // Player shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(player.x, player.y + 10, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Animated walking stride legs
        const legStride = player.isMoving ? Math.sin(tickRef.current * 0.3) * 4 : 0;
        ctx.fillStyle = '#1b4a22';
        ctx.fillRect(player.x - 7, player.y + 6 + legStride, 5, 8);
        ctx.fillRect(player.x + 2, player.y + 6 - legStride, 5, 8);

        // Lucas Jacket / Shoulders
        ctx.fillStyle = '#08260b';
        ctx.fillRect(player.x - 10, player.y - 8, 20, 16);
        ctx.strokeStyle = '#26E85A';
        ctx.lineWidth = 2;
        ctx.strokeRect(player.x - 10, player.y - 8, 20, 16);

        // Lucas Head / Cap
        ctx.fillStyle = '#55FF6A';
        ctx.beginPath();
        ctx.arc(player.x, player.y - 4, 7, 0, Math.PI * 2);
        ctx.fill();

        // Flashlight hand beacon
        ctx.fillStyle = '#FFFFFF';
        let fx = player.x;
        let fy = player.y;
        if (player.direction === 'DOWN') { fx += 8; fy += 8; }
        else if (player.direction === 'UP') { fx -= 8; fy -= 8; }
        else if (player.direction === 'LEFT') { fx -= 10; fy += 4; }
        else if (player.direction === 'RIGHT') { fx += 10; fy += 4; }
        ctx.fillRect(fx - 2, fy - 2, 4, 4);
      }

      ctx.restore();

      // Screen Glitch Effect
      if (glitchActive && Math.random() > 0.4) {
        const sliceY = Math.random() * canvas.height;
        const sliceH = 8 + Math.random() * 25;
        const shiftX = (Math.random() - 0.5) * 20;
        ctx.drawImage(canvas, 0, sliceY, canvas.width, sliceH, shiftX, sliceY, canvas.width, sliceH);
      }

      // Gradual Fade to Black / Darkness Level
      if (darknessLevel > 0) {
        ctx.fillStyle = `rgba(2, 7, 2, ${Math.min(1, Math.max(0, darknessLevel))})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    isPaused,
    onPlayerMove,
    onLocationChange,
    onNearbyObjectChange,
    onTriggerInteraction,
    touchDirection,
    speedMultiplier,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block cursor-crosshair"
    />
  );
};
