import * as THREE from 'three';
import { FurnitureCategory, FurnitureItem } from '../../data/furniture';

/**
 * High-Fidelity Low-Poly Furniture & Interior Props Factory (1983 Vintage Aesthetic)
 * Every piece is crafted as a composite 3-12 part procedural model with realistic
 * proportions, chamfers, cushions, handles, dials, and period-accurate details.
 */

export interface MaterialLibrary {
  woodWarm: THREE.MeshStandardMaterial;
  woodDark: THREE.MeshStandardMaterial;
  woodPolished: THREE.MeshStandardMaterial;
  metalChrome: THREE.MeshStandardMaterial;
  metalDark: THREE.MeshStandardMaterial;
  metalBrass: THREE.MeshStandardMaterial;
  metalEnamelWhite: THREE.MeshStandardMaterial;
  metalOlive: THREE.MeshStandardMaterial;
  fabricCream: THREE.MeshStandardMaterial;
  fabricGreen: THREE.MeshStandardMaterial;
  fabricRust: THREE.MeshStandardMaterial;
  fabricBlue: THREE.MeshStandardMaterial;
  glassTranslucent: THREE.MeshStandardMaterial;
  screenCrtGlow: THREE.MeshStandardMaterial;
  paperWhite: THREE.MeshStandardMaterial;
  chalkboardGreen: THREE.MeshStandardMaterial;
  corkboard: THREE.MeshStandardMaterial;
  plantFoliage: THREE.MeshStandardMaterial;
  terracotta: THREE.MeshStandardMaterial;
  waterAqua: THREE.MeshStandardMaterial;
  plasticOrange: THREE.MeshStandardMaterial;
}

export function createFurnitureMaterials(disposables: { dispose: () => void }[]): MaterialLibrary {
  const woodWarm = new THREE.MeshStandardMaterial({
    color: 0x825432,
    roughness: 0.68,
    metalness: 0.05,
    flatShading: true,
  });
  const woodDark = new THREE.MeshStandardMaterial({
    color: 0x4e311a,
    roughness: 0.72,
    metalness: 0.05,
    flatShading: true,
  });
  const woodPolished = new THREE.MeshStandardMaterial({
    color: 0x96613d,
    roughness: 0.45,
    metalness: 0.08,
    flatShading: true,
  });
  const metalChrome = new THREE.MeshStandardMaterial({
    color: 0xc4d4c8,
    roughness: 0.22,
    metalness: 0.85,
    flatShading: true,
  });
  const metalDark = new THREE.MeshStandardMaterial({
    color: 0x323c35,
    roughness: 0.55,
    metalness: 0.65,
    flatShading: true,
  });
  const metalBrass = new THREE.MeshStandardMaterial({
    color: 0xcca34a,
    roughness: 0.35,
    metalness: 0.75,
    flatShading: true,
  });
  const metalEnamelWhite = new THREE.MeshStandardMaterial({
    color: 0xe6ede8,
    roughness: 0.38,
    metalness: 0.2,
    flatShading: true,
  });
  const metalOlive = new THREE.MeshStandardMaterial({
    color: 0x485a44,
    roughness: 0.65,
    metalness: 0.45,
    flatShading: true,
  });
  const fabricCream = new THREE.MeshStandardMaterial({
    color: 0xe3dec8,
    roughness: 0.85,
    metalness: 0.02,
    flatShading: true,
  });
  const fabricGreen = new THREE.MeshStandardMaterial({
    color: 0x3d6948,
    roughness: 0.82,
    metalness: 0.02,
    flatShading: true,
  });
  const fabricRust = new THREE.MeshStandardMaterial({
    color: 0x9e4b2d,
    roughness: 0.82,
    metalness: 0.02,
    flatShading: true,
  });
  const fabricBlue = new THREE.MeshStandardMaterial({
    color: 0x36526e,
    roughness: 0.82,
    metalness: 0.02,
    flatShading: true,
  });
  const glassTranslucent = new THREE.MeshStandardMaterial({
    color: 0x76bfa2,
    roughness: 0.15,
    metalness: 0.1,
    transparent: true,
    opacity: 0.65,
  });
  const screenCrtGlow = new THREE.MeshStandardMaterial({
    color: 0x47ff76,
    emissive: 0x26e85a,
    emissiveIntensity: 1.1,
    roughness: 0.2,
    flatShading: true,
  });
  const paperWhite = new THREE.MeshStandardMaterial({
    color: 0xf5f3ea,
    roughness: 0.9,
    metalness: 0.0,
    flatShading: true,
  });
  const chalkboardGreen = new THREE.MeshStandardMaterial({
    color: 0x284732,
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true,
  });
  const corkboard = new THREE.MeshStandardMaterial({
    color: 0xaf7c4b,
    roughness: 0.92,
    metalness: 0.0,
    flatShading: true,
  });
  const plantFoliage = new THREE.MeshStandardMaterial({
    color: 0x2e8544,
    roughness: 0.78,
    metalness: 0.05,
    flatShading: true,
  });
  const terracotta = new THREE.MeshStandardMaterial({
    color: 0xb05a36,
    roughness: 0.82,
    metalness: 0.05,
    flatShading: true,
  });
  const waterAqua = new THREE.MeshStandardMaterial({
    color: 0x36b088,
    roughness: 0.25,
    metalness: 0.4,
    transparent: true,
    opacity: 0.75,
  });
  const plasticOrange = new THREE.MeshStandardMaterial({
    color: 0xd96523,
    roughness: 0.5,
    metalness: 0.1,
    flatShading: true,
  });

  const allMats = [
    woodWarm,
    woodDark,
    woodPolished,
    metalChrome,
    metalDark,
    metalBrass,
    metalEnamelWhite,
    metalOlive,
    fabricCream,
    fabricGreen,
    fabricRust,
    fabricBlue,
    glassTranslucent,
    screenCrtGlow,
    paperWhite,
    chalkboardGreen,
    corkboard,
    plantFoliage,
    terracotta,
    waterAqua,
    plasticOrange,
  ];
  allMats.forEach((m) => disposables.push(m));

  return {
    woodWarm,
    woodDark,
    woodPolished,
    metalChrome,
    metalDark,
    metalBrass,
    metalEnamelWhite,
    metalOlive,
    fabricCream,
    fabricGreen,
    fabricRust,
    fabricBlue,
    glassTranslucent,
    screenCrtGlow,
    paperWhite,
    chalkboardGreen,
    corkboard,
    plantFoliage,
    terracotta,
    waterAqua,
    plasticOrange,
  };
}

/**
 * Creates an authentic, low-poly procedural 3D model for any FurnitureItem.
 */
export function buildFurnitureModel(
  item: FurnitureItem,
  mats: MaterialLibrary,
  disposables: { dispose: () => void }[]
): THREE.Group {
  const group = new THREE.Group();
  const w = item.w;
  const h = item.h;
  const isHospital = item.buildingId === 'b_posto_saude' || item.id.includes('maca') || item.id.includes('med');

  switch (item.type) {
    case 'BED':
    case 'STRETCHER': {
      if (item.type === 'STRETCHER' || item.id.includes('maca')) {
        // --- Hospital Stretcher / Gurney ---
        const legRadius = 0.5;
        const frameHeight = 12;
        // Chrome tubular frame
        const frameGeo = new THREE.BoxGeometry(w, 1.2, h);
        const frame = new THREE.Mesh(frameGeo, mats.metalChrome);
        frame.position.y = frameHeight;
        frame.castShadow = true;
        group.add(frame);
        disposables.push(frameGeo);

        // 4 tubular legs with caster wheels
        const legGeo = new THREE.CylinderGeometry(legRadius, legRadius, frameHeight, 6);
        const wheelGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.6, 6);
        wheelGeo.rotateZ(Math.PI / 2);
        disposables.push(legGeo, wheelGeo);

        const xOff = w / 2 - 2.5;
        const zOff = h / 2 - 2.5;
        [[-xOff, -zOff], [xOff, -zOff], [-xOff, zOff], [xOff, zOff]].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(legGeo, mats.metalChrome);
          leg.position.set(lx, frameHeight / 2, lz);
          leg.castShadow = true;
          group.add(leg);

          const wheel = new THREE.Mesh(wheelGeo, mats.metalDark);
          wheel.position.set(lx, 1.2, lz);
          group.add(wheel);
        });

        // Clinical teal vinyl mattress
        const matGeo = new THREE.BoxGeometry(w - 2, 2.5, h - 2);
        const mattress = new THREE.Mesh(matGeo, mats.fabricGreen);
        mattress.position.y = frameHeight + 1.8;
        mattress.castShadow = true;
        group.add(mattress);
        disposables.push(matGeo);

        // Pillow at head
        const pilGeo = new THREE.BoxGeometry(w * 0.45, 1.8, h * 0.25);
        const pillow = new THREE.Mesh(pilGeo, mats.fabricCream);
        pillow.position.set(0, frameHeight + 3.2, -h / 2 + h * 0.2);
        group.add(pillow);
        disposables.push(pilGeo);

        // IV Drip Pole with Saline Bag
        const ivPoleGeo = new THREE.CylinderGeometry(0.3, 0.3, 26, 6);
        const ivPole = new THREE.Mesh(ivPoleGeo, mats.metalChrome);
        ivPole.position.set(-w / 2 + 1.5, 13, -h / 2 + 1.5);
        group.add(ivPole);

        const dripBagGeo = new THREE.BoxGeometry(2, 4, 1);
        const dripBag = new THREE.Mesh(dripBagGeo, mats.waterAqua);
        dripBag.position.set(-w / 2 + 1.5, 23, -h / 2 + 1.5);
        group.add(dripBag);
        disposables.push(ivPoleGeo, dripBagGeo);
      } else {
        // --- Classic Home Wooden / Hospital Bed ---
        const bedHeight = 7;
        const headboardH = 22;
        const footboardH = 12;

        // Wooden Base Carcass
        const baseGeo = new THREE.BoxGeometry(w, bedHeight, h);
        const base = new THREE.Mesh(baseGeo, mats.woodWarm);
        base.position.y = bedHeight / 2;
        base.castShadow = true;
        group.add(base);
        disposables.push(baseGeo);

        // Headboard
        const headGeo = new THREE.BoxGeometry(w + 1, headboardH, 2.5);
        const headboard = new THREE.Mesh(headGeo, mats.woodDark);
        headboard.position.set(0, headboardH / 2, -h / 2 + 1.25);
        headboard.castShadow = true;
        group.add(headboard);
        disposables.push(headGeo);

        // Footboard
        const footGeo = new THREE.BoxGeometry(w + 1, footboardH, 2);
        const footboard = new THREE.Mesh(footGeo, mats.woodDark);
        footboard.position.set(0, footboardH / 2, h / 2 - 1);
        footboard.castShadow = true;
        group.add(footboard);
        disposables.push(footGeo);

        // Mattress with soft bevels
        const matGeo = new THREE.BoxGeometry(w - 2, 4, h - 5);
        const mattress = new THREE.Mesh(matGeo, mats.fabricCream);
        mattress.position.set(0, bedHeight + 2, 0);
        mattress.castShadow = true;
        group.add(mattress);
        disposables.push(matGeo);

        // Folded Duvet / Blanket (covers lower 65% of the bed)
        const blanketGeo = new THREE.BoxGeometry(w - 1.5, 4.4, h * 0.65);
        const blanket = new THREE.Mesh(blanketGeo, mats.fabricRust);
        blanket.position.set(0, bedHeight + 2.2, h * 0.15);
        blanket.castShadow = true;
        group.add(blanket);
        disposables.push(blanketGeo);

        // Pillows (1 or 2 depending on bed width)
        const numPillows = w > 36 ? 2 : 1;
        const pilW = w > 36 ? (w - 8) / 2 : w - 8;
        const pilGeo = new THREE.BoxGeometry(pilW, 2.2, 7);
        disposables.push(pilGeo);

        for (let i = 0; i < numPillows; i++) {
          const p = new THREE.Mesh(pilGeo, mats.fabricCream);
          const px = numPillows === 2 ? (i === 0 ? -pilW / 2 - 1 : pilW / 2 + 1) : 0;
          p.position.set(px, bedHeight + 4.5, -h / 2 + 7);
          p.rotation.x = 0.15;
          group.add(p);
        }
      }
      break;
    }

    case 'SOFA': {
      // --- Retro 1980s Upholstered Sofa ---
      const seatH = 7;
      const backH = 20;
      const armH = 13;
      const armW = Math.min(6, w * 0.18);
      const isWide = w >= h;

      // Wooden tapered legs (4 legs)
      const legGeo = new THREE.CylinderGeometry(0.7, 0.4, 3.5, 6);
      disposables.push(legGeo);
      const lx = w / 2 - 2.5;
      const lz = h / 2 - 2.5;
      [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]].forEach(([px, pz]) => {
        const leg = new THREE.Mesh(legGeo, mats.woodDark);
        leg.position.set(px, 1.75, pz);
        leg.castShadow = true;
        group.add(leg);
      });

      // Sofa Plinth Base
      const plinthGeo = new THREE.BoxGeometry(w, 2, h);
      const plinth = new THREE.Mesh(plinthGeo, mats.woodDark);
      plinth.position.y = 4;
      plinth.castShadow = true;
      group.add(plinth);
      disposables.push(plinthGeo);

      // Seat Cushions (subdivided into 2 or 3 distinct cushioned blocks)
      const innerW = w - armW * 2;
      const numCushions = innerW > 40 ? 3 : 2;
      const cushW = innerW / numCushions;
      const cushGeo = new THREE.BoxGeometry(cushW - 0.8, 5, h - 6);
      disposables.push(cushGeo);

      for (let i = 0; i < numCushions; i++) {
        const cush = new THREE.Mesh(cushGeo, mats.fabricGreen);
        const cx = -innerW / 2 + cushW / 2 + i * cushW;
        cush.position.set(cx, 7.5, 1);
        cush.castShadow = true;
        group.add(cush);
      }

      // Angled Backrest with tufting feel
      const backGeo = new THREE.BoxGeometry(w - armW * 2, backH - seatH, 6);
      const back = new THREE.Mesh(backGeo, mats.fabricGreen);
      back.position.set(0, seatH + (backH - seatH) / 2 + 1, -h / 2 + 3.5);
      back.rotation.x = -0.08;
      back.castShadow = true;
      group.add(back);
      disposables.push(backGeo);

      // Armrests (Left and Right)
      const armGeo = new THREE.BoxGeometry(armW, armH, h);
      disposables.push(armGeo);

      const leftArm = new THREE.Mesh(armGeo, mats.fabricGreen);
      leftArm.position.set(-w / 2 + armW / 2, armH / 2 + 2, 0);
      leftArm.castShadow = true;
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, mats.fabricGreen);
      rightArm.position.set(w / 2 - armW / 2, armH / 2 + 2, 0);
      rightArm.castShadow = true;
      group.add(rightArm);

      // Accent Throw Pillow
      const throwGeo = new THREE.BoxGeometry(6, 6, 2.5);
      const throwPil = new THREE.Mesh(throwGeo, mats.fabricRust);
      throwPil.position.set(-w / 2 + armW + 3.5, 9, -h / 2 + 6.5);
      throwPil.rotation.set(0.2, 0.4, 0.3);
      group.add(throwPil);
      disposables.push(throwGeo);
      break;
    }

    case 'WAITING_CHAIRS': {
      // --- Tandem Beam Waiting Chairs (Posto de Saúde / Recepção) ---
      const beamGeo = new THREE.BoxGeometry(w - 4, 1.6, 2);
      const beam = new THREE.Mesh(beamGeo, mats.metalDark);
      beam.position.y = 8;
      beam.castShadow = true;
      group.add(beam);
      disposables.push(beamGeo);

      // T-bar legs (2 legs)
      const legGeo = new THREE.CylinderGeometry(0.8, 0.8, 8, 6);
      const footGeo = new THREE.BoxGeometry(2, 1, 14);
      disposables.push(legGeo, footGeo);

      [-w / 3, w / 3].forEach((lx) => {
        const leg = new THREE.Mesh(legGeo, mats.metalChrome);
        leg.position.set(lx, 4, 0);
        group.add(leg);

        const foot = new THREE.Mesh(footGeo, mats.metalDark);
        foot.position.set(lx, 0.5, 0);
        group.add(foot);
      });

      // Molded ergonomic plastic bucket seats
      const numSeats = Math.max(2, Math.floor(w / 22));
      const seatWidth = (w - 8) / numSeats;
      const seatPlankGeo = new THREE.BoxGeometry(seatWidth - 2, 1.2, 12);
      const backPlankGeo = new THREE.BoxGeometry(seatWidth - 2, 10, 1.4);
      disposables.push(seatPlankGeo, backPlankGeo);

      for (let i = 0; i < numSeats; i++) {
        const sx = -w / 2 + 4 + seatWidth / 2 + i * seatWidth;

        const seatPan = new THREE.Mesh(seatPlankGeo, mats.plasticOrange);
        seatPan.position.set(sx, 9, 2);
        seatPan.castShadow = true;
        group.add(seatPan);

        const backPan = new THREE.Mesh(backPlankGeo, mats.plasticOrange);
        backPan.position.set(sx, 14, -4);
        backPan.rotation.x = -0.15;
        backPan.castShadow = true;
        group.add(backPan);
      }
      break;
    }

    case 'DINING_TABLE':
    case 'MEETING_TABLE': {
      // --- Polished Wooden Table with Slender Legs ---
      const tableHeight = 15;
      const topThick = 1.8;

      // Tabletop with chamfered look
      const topGeo = new THREE.BoxGeometry(w, topThick, h);
      const tableTop = new THREE.Mesh(topGeo, mats.woodPolished);
      tableTop.position.y = tableHeight - topThick / 2;
      tableTop.castShadow = true;
      tableTop.receiveShadow = true;
      group.add(tableTop);
      disposables.push(topGeo);

      // Apron frame underneath
      const apronGeo = new THREE.BoxGeometry(w - 6, 2.2, h - 6);
      const apron = new THREE.Mesh(apronGeo, mats.woodDark);
      apron.position.y = tableHeight - topThick - 1.1;
      group.add(apron);
      disposables.push(apronGeo);

      // 4 Tapered Wooden Legs
      const legGeo = new THREE.CylinderGeometry(1.0, 0.6, tableHeight - topThick, 6);
      disposables.push(legGeo);
      const lx = w / 2 - 3.5;
      const lz = h / 2 - 3.5;
      [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]].forEach(([px, pz]) => {
        const leg = new THREE.Mesh(legGeo, mats.woodWarm);
        leg.position.set(px, (tableHeight - topThick) / 2, pz);
        leg.castShadow = true;
        group.add(leg);
      });

      // Table centerpiece: small vase or meeting notepad
      if (item.type === 'MEETING_TABLE') {
        const notepadGeo = new THREE.BoxGeometry(8, 0.4, 11);
        const notepad = new THREE.Mesh(notepadGeo, mats.paperWhite);
        notepad.position.set(0, tableHeight + 0.2, 0);
        group.add(notepad);
        disposables.push(notepadGeo);
      } else {
        const vaseGeo = new THREE.CylinderGeometry(1.6, 1.2, 5, 6);
        const vase = new THREE.Mesh(vaseGeo, mats.terracotta);
        vase.position.set(0, tableHeight + 2.5, 0);
        group.add(vase);
        disposables.push(vaseGeo);
      }
      break;
    }

    case 'DESK':
    case 'NIGHTSTAND': {
      if (item.type === 'NIGHTSTAND') {
        // --- Vintage Bedside Nightstand ---
        const standH = 12;
        const bodyGeo = new THREE.BoxGeometry(w, standH - 3, h);
        const body = new THREE.Mesh(bodyGeo, mats.woodWarm);
        body.position.y = (standH - 3) / 2 + 3;
        body.castShadow = true;
        group.add(body);
        disposables.push(bodyGeo);

        // 4 small legs
        const legGeo = new THREE.CylinderGeometry(0.6, 0.4, 3, 6);
        disposables.push(legGeo);
        const lx = w / 2 - 2;
        const lz = h / 2 - 2;
        [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]].forEach(([px, pz]) => {
          const leg = new THREE.Mesh(legGeo, mats.woodDark);
          leg.position.set(px, 1.5, pz);
          group.add(leg);
        });

        // Drawer seam & brass knob
        const knobGeo = new THREE.SphereGeometry(0.7, 6, 6);
        const knob = new THREE.Mesh(knobGeo, mats.metalBrass);
        knob.position.set(0, standH - 2.5, h / 2 + 0.5);
        group.add(knob);
        disposables.push(knobGeo);

        // Small bedside vintage lamp
        const lampBaseGeo = new THREE.CylinderGeometry(1.8, 2.2, 1, 6);
        const lampStemGeo = new THREE.CylinderGeometry(0.3, 0.3, 5, 6);
        const shadeGeo = new THREE.ConeGeometry(3.5, 4, 7, 1, true);
        disposables.push(lampBaseGeo, lampStemGeo, shadeGeo);

        const lBase = new THREE.Mesh(lampBaseGeo, mats.metalBrass);
        lBase.position.set(0, standH + 0.5, 0);
        group.add(lBase);

        const lStem = new THREE.Mesh(lampStemGeo, mats.metalBrass);
        lStem.position.set(0, standH + 3.5, 0);
        group.add(lStem);

        const lShade = new THREE.Mesh(shadeGeo, mats.fabricCream);
        lShade.position.set(0, standH + 6.5, 0);
        group.add(lShade);
      } else {
        // --- Executive Desk / Office Desk (Gabinete / Delegacia) ---
        const deskH = 15;
        const topThick = 1.6;

        // Desktop
        const topGeo = new THREE.BoxGeometry(w, topThick, h);
        const top = new THREE.Mesh(topGeo, mats.woodPolished);
        top.position.y = deskH - topThick / 2;
        top.castShadow = true;
        top.receiveShadow = true;
        group.add(top);
        disposables.push(topGeo);

        // 3-Drawer Pedestal on the right side
        const pedW = Math.min(16, w * 0.42);
        const pedGeo = new THREE.BoxGeometry(pedW, deskH - topThick - 1, h - 3);
        const pedestal = new THREE.Mesh(pedGeo, mats.woodWarm);
        pedestal.position.set(w / 2 - pedW / 2 - 1.5, (deskH - topThick - 1) / 2 + 0.5, 0);
        pedestal.castShadow = true;
        group.add(pedestal);
        disposables.push(pedGeo);

        // Drawer handles (3 brass cup pulls)
        const handleGeo = new THREE.BoxGeometry(3, 0.5, 0.6);
        disposables.push(handleGeo);
        for (let i = 0; i < 3; i++) {
          const handle = new THREE.Mesh(handleGeo, mats.metalBrass);
          handle.position.set(w / 2 - pedW / 2 - 1.5, 3.5 + i * 3.8, h / 2 - 1.2);
          group.add(handle);
        }

        // Left side legs / panel
        const leftPanelGeo = new THREE.BoxGeometry(2, deskH - topThick, h - 4);
        const leftPanel = new THREE.Mesh(leftPanelGeo, mats.woodDark);
        leftPanel.position.set(-w / 2 + 2, (deskH - topThick) / 2, 0);
        leftPanel.castShadow = true;
        group.add(leftPanel);
        disposables.push(leftPanelGeo);

        // Modesty panel back skirt
        const skirtGeo = new THREE.BoxGeometry(w - pedW - 4, deskH - topThick - 3, 1.2);
        const skirt = new THREE.Mesh(skirtGeo, mats.woodDark);
        skirt.position.set(-pedW / 2, (deskH - topThick) / 2 + 1, -h / 2 + 2.5);
        group.add(skirt);
        disposables.push(skirtGeo);

        // Green leather desk blotter pad
        const blotterGeo = new THREE.BoxGeometry(w * 0.45, 0.3, h * 0.6);
        const blotter = new THREE.Mesh(blotterGeo, mats.fabricGreen);
        blotter.position.set(-2, deskH + 0.15, 0);
        group.add(blotter);
        disposables.push(blotterGeo);

        // Desk Accessories (Retro Rotary Telephone & In-tray)
        const phoneBaseGeo = new THREE.BoxGeometry(4.5, 2, 4.5);
        const phoneBase = new THREE.Mesh(phoneBaseGeo, mats.metalDark);
        phoneBase.position.set(w / 2 - pedW / 2 - 1, deskH + 1, 0);
        group.add(phoneBase);

        const handsetGeo = new THREE.BoxGeometry(5.5, 1.2, 1.8);
        const handset = new THREE.Mesh(handsetGeo, mats.metalDark);
        handset.position.set(w / 2 - pedW / 2 - 1, deskH + 2.5, 0);
        group.add(handset);
        disposables.push(phoneBaseGeo, handsetGeo);
      }
      break;
    }

    case 'SCHOOL_DESK': {
      // --- Retro 1980s Brazilian Carteira Escolar ---
      const deskH = 14;
      // Tubular metal frame
      const frameGeo = new THREE.BoxGeometry(w - 2, 1.2, h - 2);
      const frame = new THREE.Mesh(frameGeo, mats.metalOlive);
      frame.position.y = 8;
      group.add(frame);
      disposables.push(frameGeo);

      // Wooden contoured seat
      const seatGeo = new THREE.BoxGeometry(w - 4, 1.2, h * 0.4);
      const seat = new THREE.Mesh(seatGeo, mats.woodPolished);
      seat.position.set(0, 8.5, h * 0.2);
      seat.castShadow = true;
      group.add(seat);
      disposables.push(seatGeo);

      // Wooden backrest
      const backGeo = new THREE.BoxGeometry(w - 4, 6, 1.2);
      const back = new THREE.Mesh(backGeo, mats.woodPolished);
      back.position.set(0, 14, h * 0.45);
      back.rotation.x = -0.1;
      group.add(back);
      disposables.push(backGeo);

      // Attached Writing Desktop (slanted forward)
      const topGeo = new THREE.BoxGeometry(w - 2, 1.4, h * 0.45);
      const top = new THREE.Mesh(topGeo, mats.woodPolished);
      top.position.set(0, deskH, -h * 0.2);
      top.rotation.x = 0.08;
      top.castShadow = true;
      group.add(top);
      disposables.push(topGeo);
      break;
    }

    case 'CHAIR':
    case 'BENCHES': {
      // --- Wooden / Metal Dining or Office Chair ---
      const chairH = 8;
      const seatGeo = new THREE.BoxGeometry(w, 1.5, h);
      const seat = new THREE.Mesh(seatGeo, mats.woodPolished);
      seat.position.y = chairH;
      seat.castShadow = true;
      group.add(seat);
      disposables.push(seatGeo);

      // 4 chair legs
      const legGeo = new THREE.CylinderGeometry(0.7, 0.4, chairH, 6);
      disposables.push(legGeo);
      const cx = w / 2 - 1.5;
      const cz = h / 2 - 1.5;
      [[-cx, -cz], [cx, -cz], [-cx, cz], [cx, cz]].forEach(([px, pz]) => {
        const leg = new THREE.Mesh(legGeo, mats.woodDark);
        leg.position.set(px, chairH / 2, pz);
        leg.castShadow = true;
        group.add(leg);
      });

      // Spindle backrest
      const backPostGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 6);
      const topRailGeo = new THREE.BoxGeometry(w, 1.8, 1.5);
      disposables.push(backPostGeo, topRailGeo);

      [-cx, 0, cx].forEach((bx) => {
        const post = new THREE.Mesh(backPostGeo, mats.woodWarm);
        post.position.set(bx, chairH + 6, -cz);
        group.add(post);
      });
      const topRail = new THREE.Mesh(topRailGeo, mats.woodDark);
      topRail.position.set(0, chairH + 12, -cz);
      group.add(topRail);
      break;
    }

    case 'BOOKSHELF':
    case 'MED_SHELF':
    case 'STORE_SHELF': {
      const shelfH = 36;
      const wallT = 1.6;

      // Outer carcass (Left, Right, Top, Bottom, Back)
      const sideGeo = new THREE.BoxGeometry(wallT, shelfH, h);
      disposables.push(sideGeo);

      const leftSide = new THREE.Mesh(sideGeo, mats.woodDark);
      leftSide.position.set(-w / 2 + wallT / 2, shelfH / 2, 0);
      leftSide.castShadow = true;
      group.add(leftSide);

      const rightSide = new THREE.Mesh(sideGeo, mats.woodDark);
      rightSide.position.set(w / 2 - wallT / 2, shelfH / 2, 0);
      rightSide.castShadow = true;
      group.add(rightSide);

      const backGeo = new THREE.BoxGeometry(w, shelfH, 1.0);
      const backPanel = new THREE.Mesh(backGeo, mats.woodDark);
      backPanel.position.set(0, shelfH / 2, -h / 2 + 0.5);
      group.add(backPanel);
      disposables.push(backGeo);

      // Top Cornice molding
      const crownGeo = new THREE.BoxGeometry(w + 2, 2.5, h + 2);
      const crown = new THREE.Mesh(crownGeo, mats.woodWarm);
      crown.position.set(0, shelfH + 1.25, 0);
      crown.castShadow = true;
      group.add(crown);
      disposables.push(crownGeo);

      // 4 Shelf Planks
      const plankGeo = new THREE.BoxGeometry(w - wallT * 2, 1.2, h - 2);
      disposables.push(plankGeo);
      const numShelves = 4;
      const shelfSpacing = (shelfH - 4) / numShelves;

      for (let s = 0; s < numShelves; s++) {
        const py = 3 + s * shelfSpacing;
        const plank = new THREE.Mesh(plankGeo, mats.woodWarm);
        plank.position.set(0, py, 0);
        group.add(plank);

        if (item.type === 'BOOKSHELF') {
          // --- Low-Poly Books with Varied Heights & Colors ---
          const bookColors = [
            mats.fabricRust,
            mats.fabricGreen,
            mats.fabricBlue,
            mats.metalBrass,
            mats.paperWhite,
          ];
          const availableW = w - wallT * 2 - 4;
          let currentX = -availableW / 2;

          while (currentX < availableW / 2 - 3) {
            const bThick = 1.2 + Math.random() * 1.6;
            const bHeight = 4.5 + Math.random() * 2.8;
            const bDepth = h * 0.7;
            const bGeo = new THREE.BoxGeometry(bThick, bHeight, bDepth);
            const colMat = bookColors[Math.floor(Math.random() * bookColors.length)];
            const book = new THREE.Mesh(bGeo, colMat);
            book.position.set(currentX + bThick / 2, py + bHeight / 2 + 0.6, 0);
            group.add(book);
            disposables.push(bGeo);
            currentX += bThick + 0.3;
          }
        } else if (item.type === 'MED_SHELF') {
          // --- Medical Bottles & Tins ---
          const botGeo = new THREE.CylinderGeometry(0.9, 0.9, 3.5, 6);
          const tinGeo = new THREE.BoxGeometry(3, 2.2, 3);
          disposables.push(botGeo, tinGeo);

          for (let b = 0; b < 4; b++) {
            const bx = -w / 3 + b * (w / 4);
            if (b % 2 === 0) {
              const bottle = new THREE.Mesh(botGeo, mats.glassTranslucent);
              bottle.position.set(bx, py + 2.35, 0);
              group.add(bottle);
            } else {
              const tin = new THREE.Mesh(tinGeo, mats.metalEnamelWhite);
              tin.position.set(bx, py + 1.7, 0);
              group.add(tin);
            }
          }
        } else {
          // --- Store Goods (Cans & Groceries) ---
          const canGeo = new THREE.CylinderGeometry(1.2, 1.2, 3, 6);
          disposables.push(canGeo);
          for (let c = 0; c < 4; c++) {
            const can = new THREE.Mesh(canGeo, mats.metalBrass);
            can.position.set(-w / 3 + c * (w / 4), py + 2.1, 0);
            group.add(can);
          }
        }
      }
      break;
    }

    case 'WARDROBE':
    case 'MED_CABINET':
    case 'FILE_CABINET': {
      const cabH = item.type === 'WARDROBE' ? 38 : 32;
      const mat =
        item.type === 'WARDROBE'
          ? mats.woodDark
          : item.type === 'MED_CABINET'
          ? mats.metalEnamelWhite
          : mats.metalOlive;

      // Main Cabinet Carcass
      const bodyGeo = new THREE.BoxGeometry(w, cabH, h);
      const body = new THREE.Mesh(bodyGeo, mat);
      body.position.y = cabH / 2;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      disposables.push(bodyGeo);

      if (item.type === 'WARDROBE') {
        // Stepped Top Cornice
        const topTrimGeo = new THREE.BoxGeometry(w + 3, 3, h + 3);
        const topTrim = new THREE.Mesh(topTrimGeo, mats.woodWarm);
        topTrim.position.y = cabH + 1.5;
        topTrim.castShadow = true;
        group.add(topTrim);
        disposables.push(topTrimGeo);

        // Double Door Inset Moldings & Handles
        const doorPanelGeo = new THREE.BoxGeometry(w / 2 - 3, cabH - 8, 0.8);
        disposables.push(doorPanelGeo);

        [-w / 4, w / 4].forEach((dx) => {
          const panel = new THREE.Mesh(doorPanelGeo, mats.woodWarm);
          panel.position.set(dx, cabH / 2, h / 2 + 0.4);
          group.add(panel);
        });

        // Brass drop-handles
        const handleGeo = new THREE.CylinderGeometry(0.4, 0.4, 3, 6);
        disposables.push(handleGeo);
        [-2.5, 2.5].forEach((hx) => {
          const handle = new THREE.Mesh(handleGeo, mats.metalBrass);
          handle.position.set(hx, cabH / 2, h / 2 + 1.2);
          group.add(handle);
        });
      } else if (item.type === 'FILE_CABINET') {
        // 4 Metal Filing Drawers with Recessed Cup Pulls & Label Plates
        const drawerH = (cabH - 4) / 4;
        const faceGeo = new THREE.BoxGeometry(w - 3, drawerH - 1, 0.8);
        const pullGeo = new THREE.BoxGeometry(4, 0.8, 0.6);
        const labelGeo = new THREE.BoxGeometry(3, 1.4, 0.2);
        disposables.push(faceGeo, pullGeo, labelGeo);

        for (let d = 0; d < 4; d++) {
          const dy = 2.5 + d * drawerH + drawerH / 2;
          const face = new THREE.Mesh(faceGeo, mats.metalDark);
          face.position.set(0, dy, h / 2 + 0.4);
          group.add(face);

          const pull = new THREE.Mesh(pullGeo, mats.metalChrome);
          pull.position.set(0, dy - 0.5, h / 2 + 1.0);
          group.add(pull);

          const label = new THREE.Mesh(labelGeo, mats.paperWhite);
          label.position.set(0, dy + 1.5, h / 2 + 0.9);
          group.add(label);
        }
      } else {
        // Medical Cabinet with Red Cross Emblem
        const glassGeo = new THREE.BoxGeometry(w - 6, cabH * 0.55, 0.8);
        const glassDoor = new THREE.Mesh(glassGeo, mats.glassTranslucent);
        glassDoor.position.set(0, cabH * 0.58, h / 2 + 0.4);
        group.add(glassDoor);

        // Red Cross
        const crossHGeo = new THREE.BoxGeometry(6, 1.8, 0.4);
        const crossVGeo = new THREE.BoxGeometry(1.8, 6, 0.4);
        disposables.push(glassGeo, crossHGeo, crossVGeo);

        const crossH = new THREE.Mesh(crossHGeo, mats.fabricRust);
        crossH.position.set(0, cabH * 0.88, h / 2 + 0.6);
        group.add(crossH);

        const crossV = new THREE.Mesh(crossVGeo, mats.fabricRust);
        crossV.position.set(0, cabH * 0.88, h / 2 + 0.6);
        group.add(crossV);
      }
      break;
    }

    case 'OLD_TV': {
      // --- 1980s Retro CRT Television (Telefunken/Philco) ---
      const tvH = 16;
      // Walnut woodgrain cabinet
      const cabGeo = new THREE.BoxGeometry(w, tvH, h);
      const cab = new THREE.Mesh(cabGeo, mats.woodDark);
      cab.position.y = tvH / 2 + 6;
      cab.castShadow = true;
      group.add(cab);
      disposables.push(cabGeo);

      // 4 Angled Retro Peg Legs
      const legGeo = new THREE.CylinderGeometry(0.8, 0.5, 6, 6);
      disposables.push(legGeo);
      const lx = w / 2 - 2;
      const lz = h / 2 - 2;
      [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]].forEach(([px, pz]) => {
        const leg = new THREE.Mesh(legGeo, mats.woodWarm);
        leg.position.set(px, 3, pz);
        leg.rotation.z = px > 0 ? -0.15 : 0.15;
        leg.castShadow = true;
        group.add(leg);
      });

      // Curved CRT Screen with Phosphor Green Glow
      const screenW = w * 0.62;
      const screenH = tvH * 0.72;
      const screenGeo = new THREE.BoxGeometry(screenW, screenH, 1.2);
      const screen = new THREE.Mesh(screenGeo, mats.screenCrtGlow);
      screen.position.set(-w / 2 + screenW / 2 + 2, tvH / 2 + 6, h / 2 + 0.5);
      group.add(screen);
      disposables.push(screenGeo);

      // Right Side Control Panel (Dials & Speaker Mesh)
      const dialColW = w - screenW - 5;
      const dialKnobGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.2, 8);
      dialKnobGeo.rotateX(Math.PI / 2);
      disposables.push(dialKnobGeo);

      const knobVHF = new THREE.Mesh(dialKnobGeo, mats.metalChrome);
      knobVHF.position.set(w / 2 - dialColW / 2 - 1, tvH + 2, h / 2 + 0.8);
      group.add(knobVHF);

      const knobUHF = new THREE.Mesh(dialKnobGeo, mats.metalChrome);
      knobUHF.position.set(w / 2 - dialColW / 2 - 1, tvH - 2, h / 2 + 0.8);
      group.add(knobUHF);

      // Chrome Telescopic Rabbit-Ear V-Antenna
      const antGeo = new THREE.CylinderGeometry(0.3, 0.3, 14, 6);
      disposables.push(antGeo);

      const antLeft = new THREE.Mesh(antGeo, mats.metalChrome);
      antLeft.position.set(-2, tvH + 12, 0);
      antLeft.rotation.z = 0.35;
      group.add(antLeft);

      const antRight = new THREE.Mesh(antGeo, mats.metalChrome);
      antRight.position.set(2, tvH + 12, 0);
      antRight.rotation.z = -0.35;
      group.add(antRight);
      break;
    }

    case 'RADIO':
    case 'VINYL_TURNTABLE': {
      // --- Retro Vintage Audio Gear ---
      const baseH = 5;
      const bodyGeo = new THREE.BoxGeometry(w, baseH, h);
      const body = new THREE.Mesh(bodyGeo, mats.woodWarm);
      body.position.y = baseH / 2;
      group.add(body);
      disposables.push(bodyGeo);

      if (item.type === 'VINYL_TURNTABLE') {
        // Rotating black vinyl record platter
        const platterGeo = new THREE.CylinderGeometry(w * 0.38, w * 0.38, 0.6, 16);
        const platter = new THREE.Mesh(platterGeo, mats.metalDark);
        platter.position.set(-w * 0.1, baseH + 0.4, 0);
        group.add(platter);

        // Tonearm with needle
        const armGeo = new THREE.CylinderGeometry(0.3, 0.3, 8, 6);
        armGeo.rotateZ(Math.PI / 3);
        const tonearm = new THREE.Mesh(armGeo, mats.metalChrome);
        tonearm.position.set(w * 0.3, baseH + 1.2, 0);
        group.add(tonearm);

        // Propped acrylic dust cover
        const coverGeo = new THREE.BoxGeometry(w, 0.8, h);
        const cover = new THREE.Mesh(coverGeo, mats.glassTranslucent);
        cover.position.set(0, baseH + 4, -h * 0.3);
        cover.rotation.x = -0.6;
        group.add(cover);
        disposables.push(platterGeo, armGeo, coverGeo);
      } else {
        // Radio with backlit tuning dial
        const dialGeo = new THREE.BoxGeometry(w * 0.6, 2.5, 0.5);
        const dial = new THREE.Mesh(dialGeo, mats.metalBrass);
        dial.position.set(0, baseH * 0.6, h / 2 + 0.3);
        group.add(dial);
        disposables.push(dialGeo);
      }
      break;
    }

    case 'FRIDGE':
    case 'FREEZER_CHEST': {
      if (item.type === 'FREEZER_CHEST') {
        // --- Commercial Horizontal Chest Freezer ---
        const chestH = 14;
        const bodyGeo = new THREE.BoxGeometry(w, chestH, h);
        const body = new THREE.Mesh(bodyGeo, mats.metalEnamelWhite);
        body.position.y = chestH / 2;
        body.castShadow = true;
        group.add(body);
        disposables.push(bodyGeo);

        // Split top lids with black handles
        const lidGeo = new THREE.BoxGeometry(w / 2 - 1, 1.6, h - 2);
        disposables.push(lidGeo);
        [-w / 4, w / 4].forEach((lx) => {
          const lid = new THREE.Mesh(lidGeo, mats.metalChrome);
          lid.position.set(lx, chestH + 0.8, 0);
          group.add(lid);
        });
      } else {
        // --- Rounded-Corner 1980s Domestic Refrigerator ---
        const fridgeH = 32;
        const bodyGeo = new THREE.BoxGeometry(w, fridgeH, h);
        const body = new THREE.Mesh(bodyGeo, mats.metalEnamelWhite);
        body.position.y = fridgeH / 2;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        disposables.push(bodyGeo);

        // Horizontal split seam (top freezer vs bottom fridge)
        const seamGeo = new THREE.BoxGeometry(w + 0.5, 0.6, h + 0.5);
        const seam = new THREE.Mesh(seamGeo, mats.metalDark);
        seam.position.y = fridgeH * 0.68;
        group.add(seam);
        disposables.push(seamGeo);

        // Chrome door handles (heavy latch style)
        const handleGeo = new THREE.BoxGeometry(0.8, 4.5, 1.2);
        disposables.push(handleGeo);

        const hFreezer = new THREE.Mesh(handleGeo, mats.metalChrome);
        hFreezer.position.set(w / 2 - 2, fridgeH * 0.82, h / 2 + 0.6);
        group.add(hFreezer);

        const hFridge = new THREE.Mesh(handleGeo, mats.metalChrome);
        hFridge.position.set(w / 2 - 2, fridgeH * 0.48, h / 2 + 0.6);
        group.add(hFridge);

        // Lower ventilation grille
        const grillGeo = new THREE.BoxGeometry(w - 4, 2.5, 0.6);
        const grill = new THREE.Mesh(grillGeo, mats.metalDark);
        grill.position.set(0, 1.5, h / 2 + 0.3);
        group.add(grill);
        disposables.push(grillGeo);
      }
      break;
    }

    case 'STOVE': {
      // --- 4-Burner Retro Stove with Oven & Knobs ---
      const stoveH = 15;
      const bodyGeo = new THREE.BoxGeometry(w, stoveH, h);
      const body = new THREE.Mesh(bodyGeo, mats.metalEnamelWhite);
      body.position.y = stoveH / 2;
      body.castShadow = true;
      group.add(body);
      disposables.push(bodyGeo);

      // Back splashguard
      const splashGeo = new THREE.BoxGeometry(w, 4, 1.5);
      const splash = new THREE.Mesh(splashGeo, mats.metalEnamelWhite);
      splash.position.set(0, stoveH + 2, -h / 2 + 0.75);
      group.add(splash);
      disposables.push(splashGeo);

      // 4 Black Burner Rings on Cooktop
      const burnerGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.6, 8);
      disposables.push(burnerGeo);
      const bx = w / 4;
      const bz = h / 4;
      [[-bx, -bz], [bx, -bz], [-bx, bz], [bx, bz]].forEach(([px, pz]) => {
        const burner = new THREE.Mesh(burnerGeo, mats.metalDark);
        burner.position.set(px, stoveH + 0.3, pz);
        group.add(burner);
      });

      // Glass front oven door & handle
      const ovenGlassGeo = new THREE.BoxGeometry(w * 0.75, stoveH * 0.45, 0.6);
      const ovenGlass = new THREE.Mesh(ovenGlassGeo, mats.metalDark);
      ovenGlass.position.set(0, stoveH * 0.45, h / 2 + 0.3);
      group.add(ovenGlass);

      const ovenHandleGeo = new THREE.BoxGeometry(w * 0.6, 0.8, 1.2);
      const ovenHandle = new THREE.Mesh(ovenHandleGeo, mats.metalChrome);
      ovenHandle.position.set(0, stoveH * 0.72, h / 2 + 0.9);
      group.add(ovenHandle);
      disposables.push(ovenGlassGeo, ovenHandleGeo);

      // Front burner knobs (5 knobs)
      const knobGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.6, 6);
      knobGeo.rotateX(Math.PI / 2);
      disposables.push(knobGeo);
      for (let k = 0; k < 5; k++) {
        const knob = new THREE.Mesh(knobGeo, mats.metalDark);
        knob.position.set(-w / 2 + 4 + k * ((w - 8) / 4), stoveH - 1.5, h / 2 + 0.4);
        group.add(knob);
      }
      break;
    }

    case 'SINK': {
      // --- Kitchen / Lab Sink with Basin & Faucet ---
      const sinkH = 15;
      const cabGeo = new THREE.BoxGeometry(w, sinkH - 1, h);
      const cabinet = new THREE.Mesh(cabGeo, mats.woodWarm);
      cabinet.position.y = (sinkH - 1) / 2;
      cabinet.castShadow = true;
      group.add(cabinet);
      disposables.push(cabGeo);

      // Stainless steel countertop with recessed basin
      const topGeo = new THREE.BoxGeometry(w + 1, 1.2, h + 1);
      const top = new THREE.Mesh(topGeo, mats.metalChrome);
      top.position.y = sinkH - 0.6;
      group.add(top);
      disposables.push(topGeo);

      // Dark basin cavity
      const basinGeo = new THREE.BoxGeometry(w * 0.65, 0.4, h * 0.65);
      const basin = new THREE.Mesh(basinGeo, mats.metalDark);
      basin.position.set(0, sinkH + 0.1, 0);
      group.add(basin);
      disposables.push(basinGeo);

      // Curved Gooseneck Faucet with Dual Handles
      const spoutGeo = new THREE.CylinderGeometry(0.4, 0.4, 5, 6);
      const spout = new THREE.Mesh(spoutGeo, mats.metalChrome);
      spout.position.set(0, sinkH + 2.5, -h / 2 + 3);
      group.add(spout);

      const spoutHeadGeo = new THREE.BoxGeometry(0.8, 0.8, 3);
      const spoutHead = new THREE.Mesh(spoutHeadGeo, mats.metalChrome);
      spoutHead.position.set(0, sinkH + 5, -h / 2 + 4.5);
      group.add(spoutHead);
      disposables.push(spoutGeo, spoutHeadGeo);
      break;
    }

    case 'COUNTER': {
      // --- Commercial / Reception Counter with Polished Top & Front Paneling ---
      const countH = 16;
      // Front facade
      const frontGeo = new THREE.BoxGeometry(w, countH - 1.5, h);
      const front = new THREE.Mesh(frontGeo, mats.woodWarm);
      front.position.y = (countH - 1.5) / 2;
      front.castShadow = true;
      front.receiveShadow = true;
      group.add(front);
      disposables.push(frontGeo);

      // Polished overhang countertop
      const topGeo = new THREE.BoxGeometry(w + 2, 1.6, h + 2);
      const top = new THREE.Mesh(topGeo, mats.woodPolished);
      top.position.y = countH - 0.8;
      top.castShadow = true;
      group.add(top);
      disposables.push(topGeo);

      // Base kickplate
      const kickGeo = new THREE.BoxGeometry(w + 0.5, 1.8, h + 0.5);
      const kick = new THREE.Mesh(kickGeo, mats.metalDark);
      kick.position.y = 0.9;
      group.add(kick);
      disposables.push(kickGeo);
      break;
    }

    case 'LAB_BENCH': {
      // --- High-Tech 1983 Biology Lab Bench with Glassware & Burner ---
      const benchH = 15;
      const bodyGeo = new THREE.BoxGeometry(w, benchH - 1.5, h);
      const body = new THREE.Mesh(bodyGeo, mats.metalDark);
      body.position.y = (benchH - 1.5) / 2;
      body.castShadow = true;
      group.add(body);
      disposables.push(bodyGeo);

      // Black chemical-resistant resin top
      const topGeo = new THREE.BoxGeometry(w + 1, 1.5, h + 1);
      const top = new THREE.Mesh(topGeo, mats.metalDark);
      top.position.y = benchH - 0.75;
      group.add(top);
      disposables.push(topGeo);

      // Reagent shelf rack at back
      const rackGeo = new THREE.BoxGeometry(w - 4, 8, 3.5);
      const rack = new THREE.Mesh(rackGeo, mats.woodPolished);
      rack.position.set(0, benchH + 4, -h / 2 + 2.5);
      group.add(rack);
      disposables.push(rackGeo);

      // Erlenmeyer Flasks with Colored Solutions (Cyan, Emerald, Amber)
      const flaskGeo = new THREE.ConeGeometry(1.6, 3.5, 6);
      disposables.push(flaskGeo);

      const flask1 = new THREE.Mesh(flaskGeo, mats.screenCrtGlow);
      flask1.position.set(-w / 4, benchH + 1.75, 0);
      group.add(flask1);

      const flask2 = new THREE.Mesh(flaskGeo, mats.waterAqua);
      flask2.position.set(-w / 4 + 4, benchH + 1.75, 2);
      group.add(flask2);

      // Bunsen Burner
      const burnerBaseGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.6, 6);
      const burnerColGeo = new THREE.CylinderGeometry(0.4, 0.4, 4, 6);
      disposables.push(burnerBaseGeo, burnerColGeo);

      const bBase = new THREE.Mesh(burnerBaseGeo, mats.metalChrome);
      bBase.position.set(w / 4, benchH + 0.3, 0);
      group.add(bBase);

      const bCol = new THREE.Mesh(burnerColGeo, mats.metalChrome);
      bCol.position.set(w / 4, benchH + 2.3, 0);
      group.add(bCol);
      break;
    }

    case 'MICROSCOPE': {
      // --- Precision Laboratory Research Microscope ---
      const baseGeo = new THREE.BoxGeometry(w * 0.65, 1.5, h * 0.65);
      const base = new THREE.Mesh(baseGeo, mats.metalDark);
      base.position.y = 0.75;
      group.add(base);

      // Curved Support Arm
      const armGeo = new THREE.BoxGeometry(1.5, 9, 2);
      const arm = new THREE.Mesh(armGeo, mats.metalDark);
      arm.position.set(0, 5, -h * 0.2);
      group.add(arm);

      // Mechanical Stage with Slide
      const stageGeo = new THREE.BoxGeometry(w * 0.5, 0.8, h * 0.5);
      const stage = new THREE.Mesh(stageGeo, mats.metalDark);
      stage.position.set(0, 5.5, 0);
      group.add(stage);

      // Revolving Nosepiece with Objective Lenses
      const noseGeo = new THREE.CylinderGeometry(1.2, 1.2, 1, 6);
      const nose = new THREE.Mesh(noseGeo, mats.metalBrass);
      nose.position.set(0, 7.5, 0);
      group.add(nose);

      // Eyepiece Ocular Tube
      const eyeGeo = new THREE.CylinderGeometry(0.6, 0.6, 4, 6);
      eyeGeo.rotateX(0.35);
      const eyepiece = new THREE.Mesh(eyeGeo, mats.metalDark);
      eyepiece.position.set(0, 10, -1);
      group.add(eyepiece);
      disposables.push(baseGeo, armGeo, stageGeo, noseGeo, eyeGeo);
      break;
    }

    case 'TYPEWRITER': {
      // --- Retro Olivetti / Remington Typewriter ---
      const bodyH = 3.5;
      const bodyGeo = new THREE.BoxGeometry(w, bodyH, h);
      const body = new THREE.Mesh(bodyGeo, mats.metalOlive);
      body.position.y = bodyH / 2;
      group.add(body);

      // Slanted Keyboard Tray
      const keyGeo = new THREE.BoxGeometry(w - 2, 1.2, h * 0.45);
      const keyboard = new THREE.Mesh(keyGeo, mats.metalDark);
      keyboard.position.set(0, bodyH + 0.6, h * 0.2);
      keyboard.rotation.x = 0.15;
      group.add(keyboard);

      // Cylindrical Platen Roller with Paper Sheet
      const platenGeo = new THREE.CylinderGeometry(1.0, 1.0, w - 1, 8);
      platenGeo.rotateZ(Math.PI / 2);
      const platen = new THREE.Mesh(platenGeo, mats.metalDark);
      platen.position.set(0, bodyH + 2.5, -h * 0.2);
      group.add(platen);

      // Paper sheet sticking up
      const paperGeo = new THREE.BoxGeometry(w * 0.7, 4.5, 0.2);
      const paper = new THREE.Mesh(paperGeo, mats.paperWhite);
      paper.position.set(0, bodyH + 4.5, -h * 0.25);
      paper.rotation.x = -0.2;
      group.add(paper);
      disposables.push(bodyGeo, keyGeo, platenGeo, paperGeo);
      break;
    }

    case 'CASH_REGISTER': {
      // --- Mechanical National / Sweda Cash Register ---
      const baseGeo = new THREE.BoxGeometry(w, 4, h);
      const base = new THREE.Mesh(baseGeo, mats.woodWarm);
      base.position.y = 2;
      group.add(base);

      // Stepped metal chassis
      const bodyGeo = new THREE.BoxGeometry(w - 2, 8, h - 2);
      const body = new THREE.Mesh(bodyGeo, mats.metalBrass);
      body.position.set(0, 8, -1);
      group.add(body);

      // Pop-up price flag readout
      const flagGeo = new THREE.BoxGeometry(w * 0.6, 3, 1.2);
      const flag = new THREE.Mesh(flagGeo, mats.paperWhite);
      flag.position.set(0, 13.5, -h * 0.25);
      group.add(flag);
      disposables.push(baseGeo, bodyGeo, flagGeo);
      break;
    }

    case 'BLACKBOARD': {
      // --- School Slate Blackboard with Frame & Chalk Ledge ---
      const frameH = 24;
      const boardGeo = new THREE.BoxGeometry(w, frameH, 1.2);
      const board = new THREE.Mesh(boardGeo, mats.chalkboardGreen);
      board.position.y = 18;
      group.add(board);

      // Wooden surround frame
      const frameTrimGeo = new THREE.BoxGeometry(w + 3, frameH + 3, 1.6);
      const frameTrim = new THREE.Mesh(frameTrimGeo, mats.woodWarm);
      frameTrim.position.y = 18;
      group.add(frameTrim);

      // Chalk ledge with chalks and eraser
      const ledgeGeo = new THREE.BoxGeometry(w + 4, 1.2, 4);
      const ledge = new THREE.Mesh(ledgeGeo, mats.woodDark);
      ledge.position.set(0, 18 - frameH / 2 - 0.6, 1.5);
      group.add(ledge);

      const eraserGeo = new THREE.BoxGeometry(4, 1.2, 2);
      const eraser = new THREE.Mesh(eraserGeo, mats.fabricCream);
      eraser.position.set(3, 18 - frameH / 2 + 0.6, 1.5);
      group.add(eraser);
      disposables.push(boardGeo, frameTrimGeo, ledgeGeo, eraserGeo);
      break;
    }

    case 'BULLETIN_BOARD':
    case 'HEALTH_POSTER': {
      // --- Wall Corkboard or Health Poster ---
      const pH = 18;
      const corkGeo = new THREE.BoxGeometry(w, pH, 0.8);
      const cork = new THREE.Mesh(
        corkGeo,
        item.type === 'HEALTH_POSTER' ? mats.paperWhite : mats.corkboard
      );
      cork.position.y = 18;
      group.add(cork);

      const frameGeo = new THREE.BoxGeometry(w + 2, pH + 2, 1.2);
      const frame = new THREE.Mesh(frameGeo, mats.woodWarm);
      frame.position.y = 18;
      group.add(frame);
      disposables.push(corkGeo, frameGeo);
      break;
    }

    case 'XRAY_VIEWER': {
      // --- Illuminated Hospital X-Ray Lightbox ---
      const boxH = 16;
      const frameGeo = new THREE.BoxGeometry(w, boxH, 2.5);
      const frame = new THREE.Mesh(frameGeo, mats.metalDark);
      frame.position.y = 18;
      group.add(frame);

      // Translucent illuminated X-Ray film screen
      const screenGeo = new THREE.BoxGeometry(w - 2.5, boxH - 2.5, 0.4);
      const screen = new THREE.Mesh(screenGeo, mats.glassTranslucent);
      screen.position.set(0, 18, 1.4);
      group.add(screen);
      disposables.push(frameGeo, screenGeo);
      break;
    }

    case 'WATER_COOLER': {
      // --- Brazilian Bebedouro de Garrafão (20L Inverted Bottle) ---
      const dispenserH = 18;
      const dispGeo = new THREE.BoxGeometry(w, dispenserH, h);
      const dispenser = new THREE.Mesh(dispGeo, mats.metalEnamelWhite);
      dispenser.position.y = dispenserH / 2;
      dispenser.castShadow = true;
      group.add(dispenser);

      // 20L Inverted Aqua Water Bottle
      const bottleGeo = new THREE.CylinderGeometry(w * 0.38, w * 0.38, 9, 8);
      const bottle = new THREE.Mesh(bottleGeo, mats.waterAqua);
      bottle.position.set(0, dispenserH + 4.5, 0);
      group.add(bottle);

      // Red & Blue push faucets
      const tapGeo = new THREE.BoxGeometry(1.2, 1.5, 1.5);
      const tapRed = new THREE.Mesh(tapGeo, mats.fabricRust);
      tapRed.position.set(-2, dispenserH * 0.65, h / 2 + 0.8);
      group.add(tapRed);

      const tapBlue = new THREE.Mesh(tapGeo, mats.fabricBlue);
      tapBlue.position.set(2, dispenserH * 0.65, h / 2 + 0.8);
      group.add(tapBlue);
      disposables.push(dispGeo, bottleGeo, tapGeo);
      break;
    }

    case 'ROTARY_FAN': {
      // --- Oscillating Table Fan ---
      const baseGeo = new THREE.CylinderGeometry(2.5, 2.8, 0.8, 8);
      const base = new THREE.Mesh(baseGeo, mats.metalDark);
      base.position.y = 0.4;
      group.add(base);

      const neckGeo = new THREE.CylinderGeometry(0.4, 0.4, 5, 6);
      const neck = new THREE.Mesh(neckGeo, mats.metalChrome);
      neck.position.set(0, 3, 0);
      group.add(neck);

      // Wire Cage Housing & Blades
      const cageGeo = new THREE.CylinderGeometry(4.5, 4.5, 1.8, 10);
      cageGeo.rotateX(Math.PI / 2);
      const cage = new THREE.Mesh(cageGeo, mats.metalDark);
      cage.position.set(0, 7.5, 0);
      group.add(cage);

      const bladeGeo = new THREE.BoxGeometry(7, 1.2, 0.2);
      const blades = new THREE.Mesh(bladeGeo, mats.plasticOrange);
      blades.position.set(0, 7.5, 0);
      group.add(blades);
      disposables.push(baseGeo, neckGeo, cageGeo, bladeGeo);
      break;
    }

    case 'PLANT': {
      // --- Terracotta Pot with Sculpted Low-Poly Foliage ---
      const potH = 7;
      const potGeo = new THREE.CylinderGeometry(w * 0.45, w * 0.32, potH, 7);
      const pot = new THREE.Mesh(potGeo, mats.terracotta);
      pot.position.y = potH / 2;
      pot.castShadow = true;
      group.add(pot);

      // Tiered low-poly broad leaves
      const leafGeo = new THREE.ConeGeometry(w * 0.5, 12, 5);
      const foliage = new THREE.Mesh(leafGeo, mats.plantFoliage);
      foliage.position.y = potH + 5;
      foliage.castShadow = true;
      group.add(foliage);
      disposables.push(potGeo, leafGeo);
      break;
    }

    case 'BOXES': {
      // --- Stack of Cardboard Shipping Boxes ---
      const b1Geo = new THREE.BoxGeometry(w, 8, h);
      const b1 = new THREE.Mesh(b1Geo, mats.woodWarm);
      b1.position.y = 4;
      b1.castShadow = true;
      group.add(b1);

      const b2Geo = new THREE.BoxGeometry(w * 0.75, 6, h * 0.75);
      const b2 = new THREE.Mesh(b2Geo, mats.corkboard);
      b2.position.set(1.5, 11, -1);
      b2.rotation.y = 0.2;
      b2.castShadow = true;
      group.add(b2);
      disposables.push(b1Geo, b2Geo);
      break;
    }

    case 'CARPET': {
      // --- Low-pile Decorative Fabric Rug ---
      const rugGeo = new THREE.BoxGeometry(w, 0.3, h);
      const rug = new THREE.Mesh(rugGeo, mats.fabricRust);
      rug.position.y = 0.35;
      rug.receiveShadow = true;
      group.add(rug);

      // Border trim
      const trimGeo = new THREE.BoxGeometry(w - 4, 0.35, h - 4);
      const trim = new THREE.Mesh(trimGeo, mats.fabricCream);
      trim.position.y = 0.38;
      group.add(trim);
      disposables.push(rugGeo, trimGeo);
      break;
    }

    case 'TRASH':
    case 'DUMPSTER': {
      if (item.type === 'DUMPSTER') {
        // --- Corrugated City Dumpster with Split Plastic Lids ---
        const dH = 16;
        const bodyGeo = new THREE.BoxGeometry(w, dH, h);
        const body = new THREE.Mesh(bodyGeo, mats.metalOlive);
        body.position.y = dH / 2;
        body.castShadow = true;
        group.add(body);

        // Angled split lid
        const lidGeo = new THREE.BoxGeometry(w + 1, 1.5, h + 1);
        const lid = new THREE.Mesh(lidGeo, mats.metalDark);
        lid.position.y = dH + 0.75;
        group.add(lid);
        disposables.push(bodyGeo, lidGeo);
      } else {
        // --- Office / Street Trash Can ---
        const binH = 9;
        const binGeo = new THREE.CylinderGeometry(w * 0.45, w * 0.35, binH, 7);
        const bin = new THREE.Mesh(binGeo, mats.metalDark);
        bin.position.y = binH / 2;
        group.add(bin);
        disposables.push(binGeo);
      }
      break;
    }

    case 'TELEX_TELEPRINTER':
    case 'MIMEOGRAPH': {
      // --- Heavy Retro Computing / Printing Machinery ---
      const machH = 14;
      const baseGeo = new THREE.BoxGeometry(w, machH - 4, h);
      const base = new THREE.Mesh(baseGeo, mats.metalOlive);
      base.position.y = (machH - 4) / 2;
      base.castShadow = true;
      group.add(base);

      // Keyboard & Paper Feeder Top
      const topGeo = new THREE.BoxGeometry(w - 2, 4, h - 2);
      const topMach = new THREE.Mesh(topGeo, mats.metalDark);
      topMach.position.y = machH - 2;
      group.add(topMach);

      // Paper roll ribbon emerging from top
      const paperGeo = new THREE.BoxGeometry(w * 0.5, 3.5, 0.4);
      const paper = new THREE.Mesh(paperGeo, mats.paperWhite);
      paper.position.set(0, machH + 1.5, -h * 0.2);
      group.add(paper);
      disposables.push(baseGeo, topGeo, paperGeo);
      break;
    }

    default: {
      // Fallback: Rich chamfered wooden/metal cabinet with legs & top panel
      const fH = 14;
      const bodyGeo = new THREE.BoxGeometry(w, fH, h);
      const body = new THREE.Mesh(bodyGeo, mats.woodWarm);
      body.position.y = fH / 2;
      body.castShadow = true;
      group.add(body);

      const topGeo = new THREE.BoxGeometry(w + 1, 1.2, h + 1);
      const top = new THREE.Mesh(topGeo, mats.woodPolished);
      top.position.y = fH + 0.6;
      group.add(top);
      disposables.push(bodyGeo, topGeo);
      break;
    }
  }

  // Position the whole assembled group in world space (x, y)
  group.position.set(item.x + w / 2, 0.3, item.y + h / 2);

  // Apply optional rotation
  if (item.rotation) {
    group.rotation.y = (item.rotation * Math.PI) / 180;
  }

  return group;
}

/**
 * Creates a high quality low-poly Park Bench (cast iron frame + wooden slats)
 */
export function buildParkBench(
  w: number,
  h: number,
  mats: MaterialLibrary,
  disposables: { dispose: () => void }[]
): THREE.Group {
  const group = new THREE.Group();
  const benchH = 10;

  // Twin Cast Iron Green Legs with curved armrests
  const legFrameGeo = new THREE.BoxGeometry(1.6, benchH, h);
  disposables.push(legFrameGeo);

  [-w / 2 + 3, w / 2 - 3].forEach((lx) => {
    const leg = new THREE.Mesh(legFrameGeo, mats.metalOlive);
    leg.position.set(lx, benchH / 2, 0);
    leg.castShadow = true;
    group.add(leg);
  });

  // 3 Wooden Planks for the Seat
  const seatPlankGeo = new THREE.BoxGeometry(w, 0.9, (h * 0.55) / 3);
  disposables.push(seatPlankGeo);
  for (let s = 0; s < 3; s++) {
    const plank = new THREE.Mesh(seatPlankGeo, mats.woodPolished);
    plank.position.set(0, 5.5, -h * 0.15 + s * ((h * 0.55) / 3));
    plank.castShadow = true;
    group.add(plank);
  }

  // 2 Wooden Planks for the Backrest
  const backPlankGeo = new THREE.BoxGeometry(w, 1.8, 0.9);
  disposables.push(backPlankGeo);
  for (let b = 0; b < 2; b++) {
    const bPlank = new THREE.Mesh(backPlankGeo, mats.woodPolished);
    bPlank.position.set(0, 7.8 + b * 2.5, -h / 2 + 1.2);
    bPlank.castShadow = true;
    group.add(bPlank);
  }

  return group;
}

/**
 * Creates a wooden Pier dock with pilings and deck planks
 */
export function buildWoodenPier(
  w: number,
  h: number,
  mats: MaterialLibrary,
  disposables: { dispose: () => void }[]
): THREE.Group {
  const group = new THREE.Group();

  // Heavy wooden deck
  const deckGeo = new THREE.BoxGeometry(w, 1.8, h);
  const deck = new THREE.Mesh(deckGeo, mats.woodWarm);
  deck.position.y = 1.0;
  deck.castShadow = true;
  deck.receiveShadow = true;
  group.add(deck);
  disposables.push(deckGeo);

  // Pilings into the water
  const pileGeo = new THREE.CylinderGeometry(1.2, 1.5, 16, 6);
  disposables.push(pileGeo);

  const px = w / 2 - 2.5;
  const pz = h / 2 - 2.5;
  [[-px, -pz], [px, -pz], [-px, pz], [px, pz]].forEach(([x, z]) => {
    const pile = new THREE.Mesh(pileGeo, mats.woodDark);
    pile.position.set(x, -6, z);
    group.add(pile);
  });

  // Mooring Bollards on the edges
  const bollardGeo = new THREE.CylinderGeometry(0.8, 0.8, 3, 6);
  disposables.push(bollardGeo);
  const b1 = new THREE.Mesh(bollardGeo, mats.metalDark);
  b1.position.set(px, 2.8, -pz);
  group.add(b1);

  const b2 = new THREE.Mesh(bollardGeo, mats.metalDark);
  b2.position.set(px, 2.8, pz);
  group.add(b2);

  return group;
}

/**
 * Creates iconic Brazilian retro Orelhão / Phone Booth
 */
export function buildPhoneBooth(
  mats: MaterialLibrary,
  disposables: { dispose: () => void }[]
): THREE.Group {
  const group = new THREE.Group();

  // Central pole
  const poleGeo = new THREE.CylinderGeometry(1.2, 1.2, 28, 6);
  const pole = new THREE.Mesh(poleGeo, mats.metalDark);
  pole.position.y = 14;
  pole.castShadow = true;
  group.add(pole);

  // Orange acoustic dome hood
  const domeGeo = new THREE.SphereGeometry(7, 8, 8, 0, Math.PI);
  domeGeo.rotateZ(Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, mats.plasticOrange);
  dome.position.set(0, 20, 2);
  dome.castShadow = true;
  group.add(dome);

  // Metal payphone box
  const phoneGeo = new THREE.BoxGeometry(4, 7, 3);
  const phone = new THREE.Mesh(phoneGeo, mats.metalChrome);
  phone.position.set(0, 16, 1.5);
  group.add(phone);

  disposables.push(poleGeo, domeGeo, phoneGeo);
  return group;
}
