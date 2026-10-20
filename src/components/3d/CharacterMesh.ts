import * as THREE from 'three';

export interface CharacterController {
  group: THREE.Group;
  update: (isMoving: boolean, dt: number, speedMultiplier?: number) => void;
  setDirection: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
  setTargetAngle: (angle: number) => void;
  dispose: () => void;
}

/**
 * Creates a stylized low-poly 1983 detective model of Lucas dos Santos Pereira.
 * Features 3-12 procedural parts:
 * - Torso with olive/trench jacket & belt
 * - Head with detective fedora & facial profile
 * - Articulated arms (swinging while walking)
 * - Articulated legs with dark trousers & dress shoes
 * - Grounded bottom-center pivot with smooth procedural walking kinematics
 */
export function createCharacterMesh(): CharacterController {
  const group = new THREE.Group();
  group.name = 'LucasCharacter';

  // Materials with distinct roughness/metalness (brightened for high visibility)
  const coatMaterial = new THREE.MeshStandardMaterial({
    color: 0x366340, // Retro olive detective trench coat
    roughness: 0.78,
    metalness: 0.1,
    flatShading: true,
  });

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0be98,
    roughness: 0.65,
    metalness: 0.05,
    flatShading: true,
  });

  const hatMaterial = new THREE.MeshStandardMaterial({
    color: 0x243e2b,
    roughness: 0.85,
    metalness: 0.1,
    flatShading: true,
  });

  const hatBandMaterial = new THREE.MeshStandardMaterial({
    color: 0x47ff76, // Vintage phosphor accent ribbon
    roughness: 0.4,
    metalness: 0.2,
    emissive: 0x1f7335,
    emissiveIntensity: 0.5,
  });

  const pantsMaterial = new THREE.MeshStandardMaterial({
    color: 0x223627,
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });

  const shoesMaterial = new THREE.MeshStandardMaterial({
    color: 0x141e16,
    roughness: 0.4,
    metalness: 0.3,
    flatShading: true,
  });

  // Hips & Pelvis anchor (Height: ~18 units)
  const pelvisGroup = new THREE.Group();
  pelvisGroup.position.y = 16;
  group.add(pelvisGroup);

  // Torso / Trench Coat
  const torsoGeo = new THREE.BoxGeometry(10, 14, 6);
  const torsoMesh = new THREE.Mesh(torsoGeo, coatMaterial);
  torsoMesh.position.y = 7;
  torsoMesh.castShadow = true;
  torsoMesh.receiveShadow = true;
  pelvisGroup.add(torsoMesh);

  // Belt & Buckle
  const beltGeo = new THREE.BoxGeometry(10.4, 2, 6.4);
  const beltMesh = new THREE.Mesh(beltGeo, hatMaterial);
  beltMesh.position.y = 1;
  pelvisGroup.add(beltMesh);

  // Lower coat skirt
  const skirtGeo = new THREE.BoxGeometry(10.2, 7, 6.2);
  const skirtMesh = new THREE.Mesh(skirtGeo, coatMaterial);
  skirtMesh.position.y = -3.5;
  skirtMesh.castShadow = true;
  pelvisGroup.add(skirtMesh);

  // Neck & Head
  const headGroup = new THREE.Group();
  headGroup.position.y = 16;
  pelvisGroup.add(headGroup);

  const headGeo = new THREE.BoxGeometry(6, 6.5, 6);
  const headMesh = new THREE.Mesh(headGeo, skinMaterial);
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  // Fedora Hat
  const hatBrimGeo = new THREE.CylinderGeometry(6.5, 6.5, 0.8, 10);
  const hatBrim = new THREE.Mesh(hatBrimGeo, hatMaterial);
  hatBrim.position.y = 3.6;
  hatBrim.castShadow = true;
  headGroup.add(hatBrim);

  const hatCrownGeo = new THREE.BoxGeometry(6, 4, 5.5);
  const hatCrown = new THREE.Mesh(hatCrownGeo, hatMaterial);
  hatCrown.position.y = 5.8;
  hatCrown.castShadow = true;
  headGroup.add(hatCrown);

  const hatBandGeo = new THREE.BoxGeometry(6.2, 1, 5.7);
  const hatBand = new THREE.Mesh(hatBandGeo, hatBandMaterial);
  hatBand.position.y = 4.4;
  headGroup.add(hatBand);

  // Limbs - Left & Right Arms
  const armGeo = new THREE.BoxGeometry(3, 12, 3);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-6.6, 12, 0);
  const leftArmMesh = new THREE.Mesh(armGeo, coatMaterial);
  leftArmMesh.position.y = -5;
  leftArmMesh.castShadow = true;
  leftArmGroup.add(leftArmMesh);
  pelvisGroup.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(6.6, 12, 0);
  const rightArmMesh = new THREE.Mesh(armGeo, coatMaterial);
  rightArmMesh.position.y = -5;
  rightArmMesh.castShadow = true;
  rightArmGroup.add(rightArmMesh);
  pelvisGroup.add(rightArmGroup);

  // Limbs - Left & Right Legs
  const legGeo = new THREE.BoxGeometry(3.6, 14, 3.6);
  const shoeGeo = new THREE.BoxGeometry(3.8, 2.5, 5.5);

  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(-2.8, 0, 0);
  const leftLegMesh = new THREE.Mesh(legGeo, pantsMaterial);
  leftLegMesh.position.y = -7;
  leftLegMesh.castShadow = true;
  leftLegGroup.add(leftLegMesh);

  const leftShoeMesh = new THREE.Mesh(shoeGeo, shoesMaterial);
  leftShoeMesh.position.set(0, -14, 0.8);
  leftShoeMesh.castShadow = true;
  leftLegGroup.add(leftShoeMesh);
  pelvisGroup.add(leftLegGroup);

  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(2.8, 0, 0);
  const rightLegMesh = new THREE.Mesh(legGeo, pantsMaterial);
  rightLegMesh.position.y = -7;
  rightLegMesh.castShadow = true;
  rightLegGroup.add(rightLegMesh);

  const rightShoeMesh = new THREE.Mesh(shoeGeo, shoesMaterial);
  rightShoeMesh.position.set(0, -14, 0.8);
  rightShoeMesh.castShadow = true;
  rightLegGroup.add(rightShoeMesh);
  pelvisGroup.add(rightLegGroup);

  // State variables for walking kinematics
  let walkCycle = 0;
  let targetRotationY = 0;

  // Direction mapping (Lucas faces South/Down by default in 2D coordinates)
  const dirAngles: Record<'UP' | 'DOWN' | 'LEFT' | 'RIGHT', number> = {
    DOWN: 0,
    UP: Math.PI,
    LEFT: -Math.PI / 2,
    RIGHT: Math.PI / 2,
  };

  const update = (isMoving: boolean, dt: number, speedMultiplier: number = 1.0) => {
    // Shortest-arc smooth angular rotation damping
    let angleDiff = (targetRotationY - group.rotation.y) % (Math.PI * 2);
    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    group.rotation.y += angleDiff * Math.min(1, 18 * dt);

    if (isMoving) {
      walkCycle += dt * 10 * speedMultiplier;
      const swing = Math.sin(walkCycle) * 0.65;

      leftLegGroup.rotation.x = swing;
      rightLegGroup.rotation.x = -swing;

      leftArmGroup.rotation.x = -swing * 0.85;
      rightArmGroup.rotation.x = swing * 0.85;

      // Subtle torso bobbing and sway
      pelvisGroup.position.y = 16 + Math.abs(Math.sin(walkCycle * 2)) * 1.2;
      headGroup.rotation.y = Math.sin(walkCycle) * 0.08;
    } else {
      // Smooth return to idle rest pose
      leftLegGroup.rotation.x = THREE.MathUtils.damp(leftLegGroup.rotation.x, 0, 10, dt);
      rightLegGroup.rotation.x = THREE.MathUtils.damp(rightLegGroup.rotation.x, 0, 10, dt);
      leftArmGroup.rotation.x = THREE.MathUtils.damp(leftArmGroup.rotation.x, 0, 10, dt);
      rightArmGroup.rotation.x = THREE.MathUtils.damp(rightArmGroup.rotation.x, 0, 10, dt);
      pelvisGroup.position.y = THREE.MathUtils.damp(pelvisGroup.position.y, 16, 10, dt);
      headGroup.rotation.y = THREE.MathUtils.damp(headGroup.rotation.y, 0, 10, dt);
    }
  };

  const setDirection = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    targetRotationY = dirAngles[direction] ?? 0;
  };

  const setTargetAngle = (angle: number) => {
    targetRotationY = angle;
  };

  const dispose = () => {
    coatMaterial.dispose();
    skinMaterial.dispose();
    hatMaterial.dispose();
    hatBandMaterial.dispose();
    pantsMaterial.dispose();
    shoesMaterial.dispose();
    torsoGeo.dispose();
    beltGeo.dispose();
    skirtGeo.dispose();
    headGeo.dispose();
    hatBrimGeo.dispose();
    hatCrownGeo.dispose();
    hatBandGeo.dispose();
    armGeo.dispose();
    legGeo.dispose();
    shoeGeo.dispose();
  };

  return {
    group,
    update,
    setDirection,
    setTargetAngle,
    dispose,
  };
}
