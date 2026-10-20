import * as THREE from 'three';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  BUILDINGS,
  ROADS,
  CROSSWALKS,
  BUILDING_WALKWAYS,
  ZOO_WALKWAYS,
  ZOO_ENCLOSURES,
  PROPS,
  INTERACTABLE_OBJECTS,
  LAKE_POINTS,
} from '../../data/worldMap';
import { TOWN_FURNITURE } from '../../data/furniture';
import {
  createFurnitureMaterials,
  buildFurnitureModel,
  buildParkBench,
  buildWoodenPier,
  buildPhoneBooth,
} from './FurnitureModelFactory';

export interface SceneAssets {
  scene: THREE.Scene;
  disposables: { dispose: () => void }[];
  update: (time: number, dt: number) => void;
  interactiveMarkers: { id: string; group: THREE.Group; light?: THREE.PointLight }[];
}

export function build3DWorld(): SceneAssets {
  const scene = new THREE.Scene();
  const disposables: { dispose: () => void }[] = [];
  const interactiveMarkers: { id: string; group: THREE.Group; light?: THREE.PointLight }[] = [];

  // Clear, bright atmospheric retro sky with soft depth (no more pitch black!)
  scene.background = new THREE.Color(0x1a3a24);
  scene.fog = new THREE.Fog(0x1a3a24, 600, 2600);

  // Reusable Materials (Brightened, high readability, maintaining 1983 retro aesthetic)
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x2e5436,
    roughness: 0.82,
    metalness: 0.05,
    flatShading: true,
  });
  disposables.push(groundMat);

  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x334037,
    roughness: 0.85,
    metalness: 0.1,
  });
  disposables.push(roadMat);

  const sidewalkMat = new THREE.MeshStandardMaterial({
    color: 0x58775f,
    roughness: 0.72,
    metalness: 0.08,
  });
  disposables.push(sidewalkMat);

  const crosswalkMat = new THREE.MeshStandardMaterial({
    color: 0x76c985,
    roughness: 0.6,
    metalness: 0.1,
  });
  disposables.push(crosswalkMat);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x486950,
    roughness: 0.75,
    metalness: 0.1,
    flatShading: true,
  });
  disposables.push(wallMat);

  const wallTrimMat = new THREE.MeshStandardMaterial({
    color: 0x65936e,
    roughness: 0.65,
    metalness: 0.15,
  });
  disposables.push(wallTrimMat);

  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x384c3c,
    roughness: 0.8,
    metalness: 0.15,
    flatShading: true,
  });
  disposables.push(roofMat);

  const windowLitMat = new THREE.MeshStandardMaterial({
    color: 0x75ff8a,
    emissive: 0x3df070,
    emissiveIntensity: 0.8,
    roughness: 0.2,
  });
  disposables.push(windowLitMat);

  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1f6f52,
    emissive: 0x0c3a27,
    emissiveIntensity: 0.35,
    roughness: 0.25,
    metalness: 0.55,
  });
  disposables.push(waterMat);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x6e4c2f,
    roughness: 0.75,
    metalness: 0.05,
    flatShading: true,
  });
  disposables.push(woodMat);

  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0x3e824c,
    roughness: 0.8,
    metalness: 0.05,
    flatShading: true,
  });
  disposables.push(foliageMat);

  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x543c24,
    roughness: 0.85,
    metalness: 0.05,
  });
  disposables.push(trunkMat);

  const metalMat = new THREE.MeshStandardMaterial({
    color: 0x5b7562,
    roughness: 0.4,
    metalness: 0.5,
  });
  disposables.push(metalMat);

  const crtGlowMat = new THREE.MeshStandardMaterial({
    color: 0x47ff76,
    emissive: 0x26e85a,
    emissiveIntensity: 1.2,
    roughness: 0.2,
  });
  disposables.push(crtGlowMat);

  const markerGlowMat = new THREE.MeshStandardMaterial({
    color: 0x6fff85,
    emissive: 0x55ff6a,
    emissiveIntensity: 1.6,
    wireframe: true,
  });
  disposables.push(markerGlowMat);

  // High-fidelity material library for furniture & interior models
  const furnitureMats = createFurnitureMaterials(disposables);

  // Interior Architectural Materials
  const interiorWallMat = new THREE.MeshStandardMaterial({
    color: 0xded8cc, // Retro warm eggshell / plaster
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });
  disposables.push(interiorWallMat);

  const interiorDoorFrameMat = new THREE.MeshStandardMaterial({
    color: 0x5a3d24, // Warm retro wood doorframe casing
    roughness: 0.6,
    metalness: 0.08,
    flatShading: true,
  });
  disposables.push(interiorDoorFrameMat);

  const parquetFloorMat = new THREE.MeshStandardMaterial({
    color: 0x825432, // Brazilian warm polished parquet
    roughness: 0.5,
    metalness: 0.05,
    flatShading: true,
  });
  disposables.push(parquetFloorMat);

  const tileFloorMat = new THREE.MeshStandardMaterial({
    color: 0xc4cac2, // Retro light ceramic tiles
    roughness: 0.65,
    metalness: 0.04,
    flatShading: true,
  });
  disposables.push(tileFloorMat);

  const marbleFloorMat = new THREE.MeshStandardMaterial({
    color: 0x223026, // Stately deep green-black municipal marble
    roughness: 0.35,
    metalness: 0.15,
    flatShading: true,
  });
  disposables.push(marbleFloorMat);

  // 1. Base Terrain Ground Plane
  const groundGeo = new THREE.PlaneGeometry(WORLD_WIDTH + 800, WORLD_HEIGHT + 800, 32, 32);
  groundGeo.rotateX(-Math.PI / 2);
  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.position.set(WORLD_WIDTH / 2, 0, WORLD_HEIGHT / 2);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);
  disposables.push(groundGeo);

  // 2. Lake Polygon from LAKE_POINTS
  const lakeShape = new THREE.Shape();
  if (LAKE_POINTS.length > 0) {
    lakeShape.moveTo(LAKE_POINTS[0].x, LAKE_POINTS[0].y);
    for (let i = 1; i < LAKE_POINTS.length; i++) {
      lakeShape.lineTo(LAKE_POINTS[i].x, LAKE_POINTS[i].y);
    }
    lakeShape.closePath();
    const lakeGeo = new THREE.ShapeGeometry(lakeShape);
    lakeGeo.rotateX(Math.PI / 2); // Rotate to lay on XZ plane
    const lakeMesh = new THREE.Mesh(lakeGeo, waterMat);
    lakeMesh.position.set(0, 0.15, 0);
    lakeMesh.receiveShadow = true;
    scene.add(lakeMesh);
    disposables.push(lakeGeo);
  }

  // 3. Roads & Sidewalks
  ROADS.forEach((road) => {
    // Sidewalk border
    const swGeo = new THREE.BoxGeometry(road.w + 14, 0.35, road.h + 14);
    const swMesh = new THREE.Mesh(swGeo, sidewalkMat);
    swMesh.position.set(road.x + road.w / 2, 0.18, road.y + road.h / 2);
    swMesh.receiveShadow = true;
    scene.add(swMesh);
    disposables.push(swGeo);

    // Asphalt surface
    const roadGeo = new THREE.BoxGeometry(road.w, 0.45, road.h);
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.position.set(road.x + road.w / 2, 0.24, road.y + road.h / 2);
    roadMesh.receiveShadow = true;
    scene.add(roadMesh);
    disposables.push(roadGeo);
  });

  // Crosswalks
  CROSSWALKS.forEach((cw) => {
    const cwGeo = new THREE.BoxGeometry(cw.w, 0.5, cw.h);
    const cwMesh = new THREE.Mesh(cwGeo, crosswalkMat);
    cwMesh.position.set(cw.x + cw.w / 2, 0.26, cw.y + cw.h / 2);
    scene.add(cwMesh);
    disposables.push(cwGeo);
  });

  // Building paved access walkways
  BUILDING_WALKWAYS.forEach((bw) => {
    const bwGeo = new THREE.BoxGeometry(bw.w, 0.4, bw.h);
    const bwMesh = new THREE.Mesh(bwGeo, sidewalkMat);
    bwMesh.position.set(bw.x + bw.w / 2, 0.2, bw.y + bw.h / 2);
    bwMesh.receiveShadow = true;
    scene.add(bwMesh);
    disposables.push(bwGeo);
  });

  // Zoo Walkways & Plazas
  ZOO_WALKWAYS.forEach((walk) => {
    const walkGeo = new THREE.BoxGeometry(walk.w, 0.42, walk.h);
    const walkMesh = new THREE.Mesh(walkGeo, sidewalkMat);
    walkMesh.position.set(walk.x + walk.w / 2, 0.21, walk.y + walk.h / 2);
    walkMesh.receiveShadow = true;
    scene.add(walkMesh);
    disposables.push(walkGeo);
  });

  // 4. Buildings (Outer walls, tall door openings, interior floors, roofs, interior partition rooms)
  BUILDINGS.forEach((b) => {
    // Proportional Heights:
    // Lucas is ~40 units tall (head at 32-35, fedora crown at 40).
    // Door opening height: 52 units (generous 12-unit headroom overhead).
    // Wall heights:
    // - Residential houses: 72 units (comfortable 1.8x character height)
    // - Commercial shops & kiosks: 76 units (1.9x character height)
    // - Medium civic buildings (school, supermarket, library, zoo lab/admin, clinic): 86 units (2.15x character height)
    // - Grand municipal headquarters (Prefeitura, Câmara): 96 units (2.4x character height)
    const wallHeight = (() => {
      if (b.id === 'b_prefeitura' || b.id === 'b_camara') return 96;
      if (
        b.id === 'b_supermercado' ||
        b.id === 'b_escola' ||
        b.id === 'b_biblioteca' ||
        b.id === 'b_clinica' ||
        b.id.startsWith('b_zoo_lab') ||
        b.id.startsWith('b_zoo_admin')
      ) return 86;
      if (b.id.startsWith('b_casa_')) return 72;
      return 76;
    })();

    const doorOpeningHeight = 52;
    const wallThickness = 3.5;
    const door = b.door;

    // Interior floor base
    const baseFloorMat =
      b.id === 'b_prefeitura' || b.id === 'b_camara'
        ? marbleFloorMat
        : b.id.startsWith('b_casa_')
        ? parquetFloorMat
        : b.id === 'b_farmacia' || b.id === 'b_posto_saude' || b.id === 'b_supermercado' || b.id === 'b_clinica'
        ? tileFloorMat
        : sidewalkMat;

    const floorGeo = new THREE.BoxGeometry(b.w - wallThickness * 2, 0.3, b.h - wallThickness * 2);
    const floorMesh = new THREE.Mesh(floorGeo, baseFloorMat);
    floorMesh.position.set(b.x + b.w / 2, 0.25, b.y + b.h / 2);
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    disposables.push(floorGeo);

    // Left wall
    const leftWallGeo = new THREE.BoxGeometry(wallThickness, wallHeight, b.h);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(b.x + wallThickness / 2, wallHeight / 2, b.y + b.h / 2);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    disposables.push(leftWallGeo);

    // Right wall
    const rightWallGeo = new THREE.BoxGeometry(wallThickness, wallHeight, b.h);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.set(b.x + b.w - wallThickness / 2, wallHeight / 2, b.y + b.h / 2);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    scene.add(rightWall);
    disposables.push(rightWallGeo);

    // Check door position (top or bottom wall)
    const isNorthDoor = door && Math.abs(door.y - b.y) < 25;

    // Top (North) wall
    if (isNorthDoor && door) {
      const leftSegW = Math.max(0, door.x - b.x);
      if (leftSegW > 2) {
        const segGeo = new THREE.BoxGeometry(leftSegW, wallHeight, wallThickness);
        const seg = new THREE.Mesh(segGeo, wallMat);
        seg.position.set(b.x + leftSegW / 2, wallHeight / 2, b.y + wallThickness / 2);
        seg.castShadow = true;
        scene.add(seg);
        disposables.push(segGeo);
      }
      const rightSegW = Math.max(0, b.x + b.w - (door.x + door.w));
      if (rightSegW > 2) {
        const segGeo = new THREE.BoxGeometry(rightSegW, wallHeight, wallThickness);
        const seg = new THREE.Mesh(segGeo, wallMat);
        seg.position.set(door.x + door.w + rightSegW / 2, wallHeight / 2, b.y + wallThickness / 2);
        seg.castShadow = true;
        scene.add(seg);
        disposables.push(segGeo);
      }
      // Lintel above door (from doorOpeningHeight to wallHeight)
      const lintelH = wallHeight - doorOpeningHeight;
      const lintelGeo = new THREE.BoxGeometry(door.w, lintelH, wallThickness);
      const lintel = new THREE.Mesh(lintelGeo, wallTrimMat);
      lintel.position.set(door.x + door.w / 2, doorOpeningHeight + lintelH / 2, b.y + wallThickness / 2);
      scene.add(lintel);
      disposables.push(lintelGeo);

      // Wooden door casing posts (Left & Right)
      const postGeo = new THREE.BoxGeometry(2, doorOpeningHeight, wallThickness + 0.8);
      const postL = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postL.position.set(door.x, doorOpeningHeight / 2, b.y + wallThickness / 2);
      scene.add(postL);
      const postR = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postR.position.set(door.x + door.w, doorOpeningHeight / 2, b.y + wallThickness / 2);
      scene.add(postR);
      disposables.push(postGeo);
    } else {
      const northWallGeo = new THREE.BoxGeometry(b.w, wallHeight, wallThickness);
      const northWall = new THREE.Mesh(northWallGeo, wallMat);
      northWall.position.set(b.x + b.w / 2, wallHeight / 2, b.y + wallThickness / 2);
      northWall.castShadow = true;
      northWall.receiveShadow = true;
      scene.add(northWall);
      disposables.push(northWallGeo);
    }

    // Bottom (South) wall
    if (!isNorthDoor && door) {
      const leftSegW = Math.max(0, door.x - b.x);
      if (leftSegW > 2) {
        const segGeo = new THREE.BoxGeometry(leftSegW, wallHeight, wallThickness);
        const seg = new THREE.Mesh(segGeo, wallMat);
        seg.position.set(b.x + leftSegW / 2, wallHeight / 2, b.y + b.h - wallThickness / 2);
        seg.castShadow = true;
        scene.add(seg);
        disposables.push(segGeo);
      }
      const rightSegW = Math.max(0, b.x + b.w - (door.x + door.w));
      if (rightSegW > 2) {
        const segGeo = new THREE.BoxGeometry(rightSegW, wallHeight, wallThickness);
        const seg = new THREE.Mesh(segGeo, wallMat);
        seg.position.set(door.x + door.w + rightSegW / 2, wallHeight / 2, b.y + b.h - wallThickness / 2);
        seg.castShadow = true;
        scene.add(seg);
        disposables.push(segGeo);
      }
      // Lintel above door (from doorOpeningHeight to wallHeight)
      const lintelH = wallHeight - doorOpeningHeight;
      const lintelGeo = new THREE.BoxGeometry(door.w, lintelH, wallThickness);
      const lintel = new THREE.Mesh(lintelGeo, wallTrimMat);
      lintel.position.set(door.x + door.w / 2, doorOpeningHeight + lintelH / 2, b.y + b.h - wallThickness / 2);
      scene.add(lintel);
      disposables.push(lintelGeo);

      // Wooden door casing posts (Left & Right)
      const postGeo = new THREE.BoxGeometry(2, doorOpeningHeight, wallThickness + 0.8);
      const postL = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postL.position.set(door.x, doorOpeningHeight / 2, b.y + b.h - wallThickness / 2);
      scene.add(postL);
      const postR = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postR.position.set(door.x + door.w, doorOpeningHeight / 2, b.y + b.h - wallThickness / 2);
      scene.add(postR);
      disposables.push(postGeo);
    } else if (!door) {
      const southWallGeo = new THREE.BoxGeometry(b.w, wallHeight, wallThickness);
      const southWall = new THREE.Mesh(southWallGeo, wallMat);
      southWall.position.set(b.x + b.w / 2, wallHeight / 2, b.y + b.h - wallThickness / 2);
      southWall.castShadow = true;
      southWall.receiveShadow = true;
      scene.add(southWall);
      disposables.push(southWallGeo);
    }

    // Roof border trim
    const roofTrimGeo = new THREE.BoxGeometry(b.w + 4, 3, b.h + 4);
    const roofTrim = new THREE.Mesh(roofTrimGeo, roofMat);
    roofTrim.position.set(b.x + b.w / 2, wallHeight + 1.5, b.y + b.h / 2);
    roofTrim.castShadow = true;
    scene.add(roofTrim);
    disposables.push(roofTrimGeo);

    // Decorative exterior window slots (scaled and positioned for taller walls)
    const winGeo = new THREE.BoxGeometry(8, 14, 0.4);
    if (b.w > 120) {
      const win1 = new THREE.Mesh(winGeo, windowLitMat);
      win1.position.set(b.x + 30, 32, isNorthDoor ? b.y + b.h + 0.2 : b.y - 0.2);
      scene.add(win1);
      const win2 = new THREE.Mesh(winGeo, windowLitMat);
      win2.position.set(b.x + b.w - 30, 32, isNorthDoor ? b.y + b.h + 0.2 : b.y - 0.2);
      scene.add(win2);
      disposables.push(winGeo);
    }
  });

  // --- Interior Room Divisions & Partition Walls ---
  const partWallThickness = 2.8;
  const partWallHeight = 66;

  const addHPartition = (
    y: number,
    startX: number,
    endX: number,
    doors: Array<{ start: number; width: number }>,
    customWallHeight: number = partWallHeight
  ) => {
    const sortedDoors = [...doors].sort((a, b) => a.start - b.start);
    let curX = startX;

    for (const d of sortedDoors) {
      const segW = d.start - curX;
      if (segW > 2) {
        const segGeo = new THREE.BoxGeometry(segW, customWallHeight, partWallThickness);
        const seg = new THREE.Mesh(segGeo, interiorWallMat);
        seg.position.set(curX + segW / 2, customWallHeight / 2, y);
        seg.castShadow = true;
        seg.receiveShadow = true;
        scene.add(seg);
        disposables.push(segGeo);
      }

      // Lintel above internal doorway
      const lintelH = customWallHeight - 52;
      if (lintelH > 2) {
        const lintelGeo = new THREE.BoxGeometry(d.width, lintelH, partWallThickness);
        const lintel = new THREE.Mesh(lintelGeo, interiorWallMat);
        lintel.position.set(d.start + d.width / 2, 52 + lintelH / 2, y);
        scene.add(lintel);
        disposables.push(lintelGeo);
      }

      // Wood casing on doorway
      const postGeo = new THREE.BoxGeometry(1.6, 52, partWallThickness + 0.6);
      const postL = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postL.position.set(d.start, 26, y);
      scene.add(postL);
      const postR = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postR.position.set(d.start + d.width, 26, y);
      scene.add(postR);
      disposables.push(postGeo);

      curX = d.start + d.width;
    }

    const endSegW = endX - curX;
    if (endSegW > 2) {
      const segGeo = new THREE.BoxGeometry(endSegW, customWallHeight, partWallThickness);
      const seg = new THREE.Mesh(segGeo, interiorWallMat);
      seg.position.set(curX + endSegW / 2, customWallHeight / 2, y);
      seg.castShadow = true;
      seg.receiveShadow = true;
      scene.add(seg);
      disposables.push(segGeo);
    }
  };

  const addVPartition = (
    x: number,
    startY: number,
    endY: number,
    doors: Array<{ start: number; width: number }>,
    customWallHeight: number = partWallHeight
  ) => {
    const sortedDoors = [...doors].sort((a, b) => a.start - b.start);
    let curY = startY;

    for (const d of sortedDoors) {
      const segH = d.start - curY;
      if (segH > 2) {
        const segGeo = new THREE.BoxGeometry(partWallThickness, customWallHeight, segH);
        const seg = new THREE.Mesh(segGeo, interiorWallMat);
        seg.position.set(x, customWallHeight / 2, curY + segH / 2);
        seg.castShadow = true;
        seg.receiveShadow = true;
        scene.add(seg);
        disposables.push(segGeo);
      }

      // Lintel
      const lintelH = customWallHeight - 52;
      if (lintelH > 2) {
        const lintelGeo = new THREE.BoxGeometry(partWallThickness, lintelH, d.width);
        const lintel = new THREE.Mesh(lintelGeo, interiorWallMat);
        lintel.position.set(x, 52 + lintelH / 2, d.start + d.width / 2);
        scene.add(lintel);
        disposables.push(lintelGeo);
      }

      // Wood casing
      const postGeo = new THREE.BoxGeometry(partWallThickness + 0.6, 52, 1.6);
      const postT = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postT.position.set(x, 26, d.start);
      scene.add(postT);
      const postB = new THREE.Mesh(postGeo, interiorDoorFrameMat);
      postB.position.set(x, 26, d.start + d.width);
      scene.add(postB);
      disposables.push(postGeo);

      curY = d.start + d.width;
    }

    const endSegH = endY - curY;
    if (endSegH > 2) {
      const segGeo = new THREE.BoxGeometry(partWallThickness, customWallHeight, endSegH);
      const seg = new THREE.Mesh(segGeo, interiorWallMat);
      seg.position.set(x, customWallHeight / 2, curY + endSegH / 2);
      seg.castShadow = true;
      seg.receiveShadow = true;
      scene.add(seg);
      disposables.push(segGeo);
    }
  };

  // 4b. Partitions for Residential Houses (3 distinct rooms: Sala de Estar, Quarto, Cozinha/Copa)
  BUILDINGS.filter((b) => b.id.startsWith('b_casa_')).forEach((house) => {
    // 1. Horizontal partition separating Sala de Estar (South) from Bedroom & Kitchen (North)
    addHPartition(
      house.y + 92,
      house.x + 4,
      house.x + house.w - 4,
      [{ start: house.x + 55, width: 42 }], // wide doorway passage aligned with entrance
      64
    );

    // 2. Vertical partition separating Bedroom (West) from Kitchen/Copa (East)
    addVPartition(
      house.x + 95,
      house.y + 4,
      house.y + 92,
      [{ start: house.y + 38, width: 38 }], // doorway connecting the rooms
      64
    );

    // 3. Room Floor Overlays: Kitchen gets bright ceramic tile floor!
    const kitchenTileGeo = new THREE.BoxGeometry(house.w - 99, 0.32, 88);
    const kitchenTile = new THREE.Mesh(kitchenTileGeo, tileFloorMat);
    kitchenTile.position.set(house.x + 95 + (house.w - 99) / 2, 0.28, house.y + 4 + 44);
    kitchenTile.receiveShadow = true;
    scene.add(kitchenTile);
    disposables.push(kitchenTileGeo);
  });

  // 4c. Partitions for Public & Civic Facilities
  // Posto de Saúde:
  addHPartition(430, 884, 1176, [{ start: 990, width: 55 }], 70); // Recepção to Clinic
  addVPartition(1025, 184, 430, [{ start: 280, width: 45 }], 70); // Triagem to Consultório

  // Farmácia:
  addHPartition(390, 1244, 1496, [{ start: 1400, width: 48 }], 70); // Atendimento to Estoque

  // Prefeitura Municipal:
  addHPartition(440, 1654, 2166, [{ start: 1740, width: 55 }, { start: 2000, width: 55 }], 86); // Saguão to Offices
  addVPartition(1910, 154, 440, [{ start: 260, width: 48 }], 86); // Arquivo to Gabinete

  // Câmara Municipal:
  addHPartition(380, 2954, 3466, [{ start: 3150, width: 65 }], 86); // Plenário to Offices
  addVPartition(3210, 154, 380, [{ start: 240, width: 48 }], 86); // Arquivo to Presidência

  // Supermercado:
  addHPartition(1170, 1584, 2156, [{ start: 1710, width: 62 }, { start: 2000, width: 48 }], 76); // Salão to Backroom
  addVPartition(1930, 984, 1170, [{ start: 1040, width: 45 }], 76); // Depósito to Escritório

  // Escola Municipal:
  addHPartition(2030, 1584, 2156, [{ start: 1700, width: 50 }, { start: 1970, width: 50 }], 76); // Corredor to Classrooms
  addVPartition(1865, 1784, 2030, [], 76); // Solid wall between Sala 01 and Sala de Ciências

  // Biblioteca Municipal:
  addHPartition(1290, 2304, 2696, [{ start: 2450, width: 65 }], 76); // Salão de Leitura to Arquivos

  // Clínica Especializada:
  addHPartition(2590, 2954, 3386, [{ start: 3120, width: 55 }], 76); // Recepção to Consultório

  // Zoo Administração:
  addVPartition(3130, 924, 1136, [{ start: 1000, width: 45 }], 74); // Diretoria to Reuniões

  // Zoo Centro de Pesquisa (Lab):
  addHPartition(1230, 3504, 3736, [{ start: 3580, width: 50 }], 76);
  addHPartition(1075, 3504, 3736, [{ start: 3580, width: 50 }], 76);
  addVPartition(3620, 1075, 1230, [{ start: 1130, width: 42 }], 76);

  // Zoo Quarentena:
  addHPartition(1675, 3504, 3736, [{ start: 3570, width: 50 }], 74);

  // 5. Zoo Grand Entrance & Enclosures
  // Grand Entrance Archway at Zoo gateway (height increased so Lucas passes under with grandeur)
  const archColGeo = new THREE.BoxGeometry(12, 78, 12);
  const archLeft = new THREE.Mesh(archColGeo, wallTrimMat);
  archLeft.position.set(2850, 39, 1310);
  archLeft.castShadow = true;
  scene.add(archLeft);
  disposables.push(archColGeo);

  const archRight = new THREE.Mesh(archColGeo, wallTrimMat);
  archRight.position.set(2850, 39, 1420);
  archRight.castShadow = true;
  scene.add(archRight);

  const archSpanGeo = new THREE.BoxGeometry(14, 12, 115);
  const archSpan = new THREE.Mesh(archSpanGeo, crtGlowMat);
  archSpan.position.set(2850, 78, 1365);
  archSpan.castShadow = true;
  scene.add(archSpan);
  disposables.push(archSpanGeo);

  // Zoo Enclosures (Aves, Mamíferos, Répteis, Aquáticos)
  ZOO_ENCLOSURES.forEach((enc) => {
    const fenceHeight = enc.category === 'AVES' ? 38 : 16;
    const postGeo = new THREE.CylinderGeometry(0.8, 0.8, fenceHeight, 6);
    const postMat = metalMat;

    const corners = [
      [enc.x, enc.y],
      [enc.x + enc.w, enc.y],
      [enc.x + enc.w, enc.y + enc.h],
      [enc.x, enc.y + enc.h],
    ];

    corners.forEach(([cx, cy]) => {
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.set(cx, fenceHeight / 2, cy);
      post.castShadow = true;
      scene.add(post);
    });

    const railXGeo = new THREE.BoxGeometry(enc.w, 0.8, 0.8);
    const topRailNorth = new THREE.Mesh(railXGeo, postMat);
    topRailNorth.position.set(enc.x + enc.w / 2, fenceHeight - 1, enc.y);
    scene.add(topRailNorth);

    const topRailSouth = new THREE.Mesh(railXGeo, postMat);
    topRailSouth.position.set(enc.x + enc.w / 2, fenceHeight - 1, enc.y + enc.h);
    scene.add(topRailSouth);

    if (enc.category === 'AVES') {
      const branchGeo = new THREE.CylinderGeometry(1.2, 1.8, 28, 6);
      const branch = new THREE.Mesh(branchGeo, woodMat);
      branch.position.set(enc.x + enc.w / 2, 14, enc.y + enc.h / 2);
      branch.castShadow = true;
      scene.add(branch);
      disposables.push(branchGeo);
    } else if (enc.waterFeature || enc.category === 'AQUATICOS') {
      const poolGeo = new THREE.BoxGeometry(enc.w - 20, 1.5, enc.h - 20);
      const pool = new THREE.Mesh(poolGeo, waterMat);
      pool.position.set(enc.x + enc.w / 2, 0.4, enc.y + enc.h / 2);
      scene.add(pool);
      disposables.push(poolGeo);
    } else if (enc.category === 'MAMIFEROS') {
      const rockGeo = new THREE.DodecahedronGeometry(14);
      const rock = new THREE.Mesh(rockGeo, sidewalkMat);
      rock.position.set(enc.x + enc.w * 0.65, 8, enc.y + enc.h * 0.45);
      rock.castShadow = true;
      scene.add(rock);
      disposables.push(rockGeo);
    }
  });

  // Quiosque Awning (striped canopy) at Zoo
  const awningGeo = new THREE.BoxGeometry(80, 2, 80);
  const awningMat = new THREE.MeshStandardMaterial({
    color: 0x478c50,
    roughness: 0.6,
  });
  const awning = new THREE.Mesh(awningGeo, awningMat);
  awning.position.set(3365, 24, 1275);
  awning.castShadow = true;
  scene.add(awning);
  disposables.push(awningGeo, awningMat);

  // Restricted Research Security Fence & Gate
  const secFenceGeo = new THREE.BoxGeometry(100, 22, 2);
  const secFence = new THREE.Mesh(secFenceGeo, metalMat);
  secFence.position.set(3500, 11, 1310);
  secFence.castShadow = true;
  scene.add(secFence);
  disposables.push(secFenceGeo);

  // Blinking Amber Hazard Beacon on Security Gate
  const beaconLight = new THREE.PointLight(0xffa500, 1.2, 120);
  beaconLight.position.set(3470, 26, 1310);
  scene.add(beaconLight);

  // Quarantine Bunker Terminal Antigo (DOC-20) Ambient CRT Lighting
  const terminalLight = new THREE.PointLight(0x26e85a, 2.4, 180);
  terminalLight.position.set(3615, 20, 1740);
  scene.add(terminalLight);

  // 6. Realistic Low-Poly Procedural Furniture & Interior Props (TOWN_FURNITURE from furniture.ts)
  TOWN_FURNITURE.forEach((f) => {
    const furnitureModel = buildFurnitureModel(f, furnitureMats, disposables);
    scene.add(furnitureModel);
  });

  // 7. Urban Props & Vegetation (PROPS from worldMap.ts)
  const treeTrunkGeo = new THREE.CylinderGeometry(1.6, 2.4, 22, 6);
  const treeFoliageLowerGeo = new THREE.ConeGeometry(15, 22, 7);
  const treeFoliageUpperGeo = new THREE.ConeGeometry(11, 18, 7);
  const lampPedestalGeo = new THREE.CylinderGeometry(1.8, 2.5, 4, 6);
  const poleGeo = new THREE.CylinderGeometry(0.7, 1.0, 34, 6);
  const lampArmGeo = new THREE.BoxGeometry(7, 1.2, 1.2);
  const lampLanternGeo = new THREE.CylinderGeometry(2.4, 1.5, 5.5, 6);
  const lampCapGeo = new THREE.ConeGeometry(3.0, 2.5, 6);
  disposables.push(
    treeTrunkGeo,
    treeFoliageLowerGeo,
    treeFoliageUpperGeo,
    lampPedestalGeo,
    poleGeo,
    lampArmGeo,
    lampLanternGeo,
    lampCapGeo
  );

  PROPS.forEach((prop, propIdx) => {
    if (prop.type === 'TREE') {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(prop.x, 0, prop.y);

      const trunk = new THREE.Mesh(treeTrunkGeo, trunkMat);
      trunk.position.y = 11;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const lowerFoliage = new THREE.Mesh(treeFoliageLowerGeo, foliageMat);
      lowerFoliage.position.y = 24;
      lowerFoliage.castShadow = true;
      treeGroup.add(lowerFoliage);

      const upperFoliage = new THREE.Mesh(treeFoliageUpperGeo, foliageMat);
      upperFoliage.position.y = 36;
      upperFoliage.castShadow = true;
      treeGroup.add(upperFoliage);

      scene.add(treeGroup);
    } else if (prop.type === 'LAMP') {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(prop.x, 0, prop.y);

      // Fluted pedestal base
      const ped = new THREE.Mesh(lampPedestalGeo, metalMat);
      ped.position.y = 2;
      ped.castShadow = true;
      lampGroup.add(ped);

      // Lamp pole
      const pole = new THREE.Mesh(poleGeo, metalMat);
      pole.position.y = 19;
      pole.castShadow = true;
      lampGroup.add(pole);

      // Curved/arched bracket arm
      const arm = new THREE.Mesh(lampArmGeo, metalMat);
      arm.position.set(2.5, 36, 0);
      lampGroup.add(arm);

      // Classic vintage hexagonal glass lantern
      const lantern = new THREE.Mesh(lampLanternGeo, crtGlowMat);
      lantern.position.set(5.5, 34, 0);
      lampGroup.add(lantern);

      const cap = new THREE.Mesh(lampCapGeo, metalMat);
      cap.position.set(5.5, 37.5, 0);
      lampGroup.add(cap);

      scene.add(lampGroup);

      // Strategic street lights at key intersections (optimized for performance)
      if (propIdx % 4 === 0) {
        const lampLight = new THREE.PointLight(0xa8f5ba, 1.4, 240, 1.4);
        lampLight.position.set(prop.x + 5.5, 34, prop.y);
        scene.add(lampLight);
      }
    } else if (prop.type === 'BENCH') {
      const bench = buildParkBench(prop.w, prop.h, furnitureMats, disposables);
      bench.position.set(prop.x + prop.w / 2, 0.25, prop.y + prop.h / 2);
      scene.add(bench);
    } else if (prop.type === 'PIER') {
      const pier = buildWoodenPier(prop.w, prop.h, furnitureMats, disposables);
      pier.position.set(prop.x + prop.w / 2, 0.2, prop.y + prop.h / 2);
      scene.add(pier);
    }
  });

  // 8. Interactable Object Markers (Floating retro phosphor indicators)
  const markerGeo = new THREE.OctahedronGeometry(4, 0);
  disposables.push(markerGeo);

  INTERACTABLE_OBJECTS.forEach((obj) => {
    const markerGroup = new THREE.Group();
    markerGroup.position.set(obj.x + obj.width / 2, 22, obj.y + obj.height / 2);

    const markerMesh = new THREE.Mesh(markerGeo, markerGlowMat);
    markerGroup.add(markerMesh);

    let pLight: THREE.PointLight | undefined;
    if (obj.archiveRecordId || obj.type === 'TERMINAL') {
      pLight = new THREE.PointLight(0x55ff6a, 0.8, 60);
      markerGroup.add(pLight);
    }

    scene.add(markerGroup);
    interactiveMarkers.push({ id: obj.id, group: markerGroup, light: pLight });
  });

  // Animation update loop for 3D world elements
  const update = (time: number, _dt: number) => {
    // Oscillate interactable markers bobbing and rotating
    interactiveMarkers.forEach((marker, idx) => {
      marker.group.rotation.y = time * 2 + idx;
      marker.group.position.y = 22 + Math.sin(time * 3 + idx) * 3;
    });

    // Blinking amber hazard light at Zoo Restricted Research gate
    beaconLight.intensity = Math.sin(time * 6) > 0 ? 1.6 : 0.2;

    // Terminal Antigo CRT screen subtle phosphor pulsing
    terminalLight.intensity = 2.0 + Math.sin(time * 4) * 0.4;
  };

  return {
    scene,
    disposables,
    update,
    interactiveMarkers,
  };
}
