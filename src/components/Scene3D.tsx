import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface FlavorConfig {
  id: string;
  name: string;
  color: string;
  foilColor: string;
  roughness: number;
  clearcoat: number;
}

export const FLAVORS: Record<string, FlavorConfig> = {
  dark: {
    id: 'dark',
    name: '70% Dark Chocolate',
    color: '#201009',
    foilColor: '#D49B44',
    roughness: 0.32,
    clearcoat: 0.55,
  },
  milk: {
    id: 'milk',
    name: 'Velvet Milk Chocolate',
    color: '#4E2918',
    foilColor: '#E8B4B8',
    roughness: 0.38,
    clearcoat: 0.4,
  },
  almond: {
    id: 'almond',
    name: 'Roasted Almond Crunch',
    color: '#361A10',
    foilColor: '#D4AF37',
    roughness: 0.42,
    clearcoat: 0.45,
  },
  ruby: {
    id: 'ruby',
    name: 'Artisan Ruby Berry',
    color: '#6F2636',
    foilColor: '#ECC0C5',
    roughness: 0.3,
    clearcoat: 0.65,
  },
};

interface Scene3DProps {
  currentFlavor?: string;
  onBoxOpenChange?: (isOpen: boolean) => void;
}

export const Scene3D: React.FC<Scene3DProps> = ({ currentFlavor = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chocoMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const foilMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#080605', 0.025);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // --- Studio Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3de, 2.8);
    keyLight.position.set(6, 7, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const warmFillLight = new THREE.DirectionalLight(0xf5b26b, 1.5);
    warmFillLight.position.set(-6, -2, 4);
    scene.add(warmFillLight);

    const rimLight = new THREE.DirectionalLight(0xffe8cf, 2.4);
    rimLight.position.set(1, 5, -5);
    scene.add(rimLight);

    // --- Chocolate & Foil Materials ---
    const activeFlavor = FLAVORS[currentFlavor] || FLAVORS.dark;
    const chocoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeFlavor.color),
      roughness: activeFlavor.roughness,
      metalness: 0.04,
      clearcoat: activeFlavor.clearcoat,
      clearcoatRoughness: 0.18,
      reflectivity: 0.85,
    });
    chocoMaterialRef.current = chocoMaterial;

    const foilMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeFlavor.foilColor),
      roughness: 0.25,
      metalness: 0.9,
    });
    foilMaterialRef.current = foilMaterial;

    // --- 1. Main Chocolate Bar Assembly ---
    const mainBarGroup = new THREE.Group();
    scene.add(mainBarGroup);

    // Base plate for chocolate bar
    const barBaseGeo = new THREE.BoxGeometry(2.3, 3.6, 0.14);
    const barBase = new THREE.Mesh(barBaseGeo, chocoMaterial);
    barBase.position.z = -0.05;
    mainBarGroup.add(barBase);

    // Grid of separable squares (3 cols x 5 rows = 15 squares)
    const squares: THREE.Mesh[] = [];
    const squareOffsets: { x: number; y: number; origX: number; origY: number }[] = [];
    const cols = 3;
    const rows = 5;
    const sqW = 0.65;
    const sqH = 0.62;
    const sqD = 0.16;
    const gap = 0.08;

    const startX = -((cols - 1) * (sqW + gap)) / 2;
    const startY = ((rows - 1) * (sqH + gap)) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const sqGeo = new THREE.BoxGeometry(sqW, sqH, sqD);
        const sqMesh = new THREE.Mesh(sqGeo, chocoMaterial);
        const posX = startX + c * (sqW + gap);
        const posY = startY - r * (sqH + gap);
        sqMesh.position.set(posX, posY, 0.08);

        // Inner bevel imprint
        const innerGeo = new THREE.BoxGeometry(sqW * 0.72, sqH * 0.72, 0.04);
        const innerMesh = new THREE.Mesh(innerGeo, chocoMaterial);
        innerMesh.position.z = 0.08;
        sqMesh.add(innerMesh);

        mainBarGroup.add(sqMesh);
        squares.push(sqMesh);
        squareOffsets.push({
          x: posX * 0.65,
          y: posY * 0.65,
          origX: posX,
          origY: posY,
        });
      }
    }

    // Golden foil wrapper around bottom half
    const foilGeo = new THREE.BoxGeometry(2.38, 1.8, 0.38);
    const foilMesh = new THREE.Mesh(foilGeo, foilMaterial);
    foilMesh.position.set(0, -0.95, 0.04);
    mainBarGroup.add(foilMesh);

    // Initial position for hero section (strictly on right side)
    mainBarGroup.position.set(2.0, 0.1, 0);
    mainBarGroup.rotation.set(0.2, -0.42, 0.12);

    // --- 2. Floating Chocolate Chunks (strictly kept on right side x > 0.8 in Hero) ---
    const floatingChunksGroup = new THREE.Group();
    scene.add(floatingChunksGroup);

    const chunkMeshes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number }; baseY: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const size = 0.09 + Math.random() * 0.1;
      const chunkGeo = new THREE.DodecahedronGeometry(size, 0);
      const chunkMat = Math.random() > 0.4 ? chocoMaterial : foilMaterial;
      const mesh = new THREE.Mesh(chunkGeo, chunkMat);

      // Distribute on right side around chocolate bar
      const angle = (i / 8) * Math.PI - 0.2;
      const radius = 1.3 + Math.random() * 1.2;
      mesh.position.set(
        2.0 + Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3.0,
        (Math.random() - 0.5) * 2.0
      );

      floatingChunksGroup.add(mesh);
      chunkMeshes.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.025,
          z: (Math.random() - 0.5) * 0.02,
        },
        baseY: mesh.position.y,
      });
    }

    // --- 3. Cocoa Beans & Dust (Section B) ---
    const cocoaSectionGroup = new THREE.Group();
    cocoaSectionGroup.position.set(0, -20, 0);
    scene.add(cocoaSectionGroup);

    const beanGeo = new THREE.SphereGeometry(0.3, 16, 12);
    beanGeo.scale(1.7, 0.9, 0.8);
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x482416,
      roughness: 0.75,
      metalness: 0.05,
    });

    const beans: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const bean = new THREE.Mesh(beanGeo, beanMat);
      bean.position.set(
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 2.5
      );
      bean.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      cocoaSectionGroup.add(bean);
      beans.push(bean);
    }

    // Golden dust particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 7;
      particlePos[i + 1] = (Math.random() - 0.5) * 7;
      particlePos[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd49b44,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    cocoaSectionGroup.add(dustParticles);

    // Swirling chocolate ribbon
    const ribbonGeo = new THREE.TorusKnotGeometry(1.4, 0.09, 100, 16, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x281209,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.scale.set(0.8, 0.8, 0.8);
    cocoaSectionGroup.add(ribbonMesh);

    // --- 4. Luxury Gift Box with Hinged Opening Lid (Section C) ---
    const giftBoxGroup = new THREE.Group();
    giftBoxGroup.position.set(0, -30, 0);
    scene.add(giftBoxGroup);

    // Box base (Blush Pink)
    const boxBaseMat = new THREE.MeshStandardMaterial({
      color: 0xdeb4b8,
      roughness: 0.55,
      metalness: 0.05,
    });
    const boxBaseGeo = new THREE.BoxGeometry(3.2, 0.85, 2.3);
    const boxBaseMesh = new THREE.Mesh(boxBaseGeo, boxBaseMat);
    boxBaseMesh.castShadow = true;
    giftBoxGroup.add(boxBaseMesh);

    // Satin Ribbon around box base
    const ribbonMat2 = new THREE.MeshStandardMaterial({
      color: 0x3d1a10, // Dark espresso satin ribbon
      roughness: 0.35,
      metalness: 0.1,
    });
    const ribbonBand = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.87, 2.32), ribbonMat2);
    boxBaseMesh.add(ribbonBand);

    // Box Lid (with pivot at back edge)
    const boxLidPivot = new THREE.Group();
    boxLidPivot.position.set(0, 0.42, -1.15);
    giftBoxGroup.add(boxLidPivot);

    const boxLidGeo = new THREE.BoxGeometry(3.3, 0.22, 2.4);
    const boxLidMesh = new THREE.Mesh(boxLidGeo, boxBaseMat);
    boxLidMesh.position.set(0, 0.11, 1.2);
    boxLidPivot.add(boxLidMesh);

    // Ribbon on top of lid
    const lidRibbon = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 2.42), ribbonMat2);
    boxLidMesh.add(lidRibbon);

    // Golden embossed crest on lid
    const crestGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.04, 32);
    const crestMat = new THREE.MeshStandardMaterial({
      color: 0xd49b44,
      metalness: 0.9,
      roughness: 0.28,
    });
    const crest = new THREE.Mesh(crestGeo, crestMat);
    crest.position.set(0, 0.13, 0);
    crest.rotation.x = Math.PI / 2;
    boxLidMesh.add(crest);

    // Truffles inside the box
    const trufflesGroup = new THREE.Group();
    trufflesGroup.position.set(0, 0.3, 0);
    giftBoxGroup.add(trufflesGroup);

    const truffleColors = [0x221008, 0x4e2918, 0x822e3f, 0xf0c677, 0x1f0e07, 0x442314];
    const truffleGeo = new THREE.SphereGeometry(0.2, 20, 20);

    for (let i = 0; i < 6; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const tMat = new THREE.MeshPhysicalMaterial({
        color: truffleColors[i],
        roughness: i % 2 === 0 ? 0.32 : 0.55,
        clearcoat: 0.5,
      });
      const truffle = new THREE.Mesh(truffleGeo, tMat);
      truffle.position.set(-0.75 + col * 0.75, 0, -0.38 + row * 0.75);

      const cupGeo = new THREE.CylinderGeometry(0.22, 0.15, 0.09, 16, 1, true);
      const cup = new THREE.Mesh(cupGeo, crestMat);
      cup.position.y = -0.09;
      truffle.add(cup);

      trufflesGroup.add(truffle);
    }

    // --- GSAP Scroll-Triggered Timeline ---
    ScrollTrigger.create({
      trigger: '#page-root',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;

        // Stage 1: Hero to Discover (p: 0.0 -> 0.22)
        if (p <= 0.22) {
          const t = p / 0.22;
          mainBarGroup.position.x = THREE.MathUtils.lerp(2.0, 0.4, t);
          mainBarGroup.position.y = THREE.MathUtils.lerp(0.1, -0.1, t);
          mainBarGroup.position.z = THREE.MathUtils.lerp(0, 0.9, t);
          mainBarGroup.rotation.y = THREE.MathUtils.lerp(-0.42, 0.12, t);
          mainBarGroup.rotation.x = THREE.MathUtils.lerp(0.2, 0.08, t);

          squares.forEach((sq, idx) => {
            const offset = squareOffsets[idx];
            const separation = Math.sin(t * Math.PI) * 0.2;
            sq.position.x = offset.origX + offset.x * separation;
            sq.position.y = offset.origY + offset.y * separation;
            sq.position.z = 0.08 + separation * 0.25;
          });

          cocoaSectionGroup.position.y = -20;
          giftBoxGroup.position.y = -30;
          floatingChunksGroup.position.y = 0;
        }

        // Stage 2: Discover to Craft (p: 0.22 -> 0.42)
        else if (p > 0.22 && p <= 0.42) {
          const t = (p - 0.22) / 0.2;
          mainBarGroup.position.x = THREE.MathUtils.lerp(0.4, -5.5, t);
          mainBarGroup.position.z = THREE.MathUtils.lerp(0.9, -2.0, t);
          mainBarGroup.rotation.y = THREE.MathUtils.lerp(0.12, -0.7, t);

          cocoaSectionGroup.position.y = THREE.MathUtils.lerp(-12, 0, t);
          cocoaSectionGroup.position.z = THREE.MathUtils.lerp(-4, 0.2, t);
          cocoaSectionGroup.rotation.y = t * Math.PI * 0.7;

          giftBoxGroup.position.y = -30;
          floatingChunksGroup.position.y = -10;
        }

        // Stage 3: Craft to Handmade / Gift Box (p: 0.42 -> 0.62)
        else if (p > 0.42 && p <= 0.62) {
          const t = (p - 0.42) / 0.2;
          cocoaSectionGroup.position.y = THREE.MathUtils.lerp(0, 15, t);
          mainBarGroup.position.x = -8;

          giftBoxGroup.position.y = THREE.MathUtils.lerp(-14, -0.4, t);
          giftBoxGroup.position.x = THREE.MathUtils.lerp(2.5, 0.2, t);
          giftBoxGroup.position.z = THREE.MathUtils.lerp(-2, 1.0, t);
          giftBoxGroup.rotation.x = THREE.MathUtils.lerp(0.6, 0.4, t);
          giftBoxGroup.rotation.y = THREE.MathUtils.lerp(-0.6, 0.18, t);

          const lidAngle = THREE.MathUtils.lerp(0, -Math.PI * 0.6, t);
          boxLidPivot.rotation.x = lidAngle;
          floatingChunksGroup.position.y = -15;
        }

        // Stage 4: Handmade to Story / Categories (p: 0.62 -> 0.82)
        else if (p > 0.62 && p <= 0.82) {
          const t = (p - 0.62) / 0.2;
          // Smoothly clear gift box out of view so Section E is completely clean
          giftBoxGroup.position.y = THREE.MathUtils.lerp(-0.4, 25, t);
          giftBoxGroup.position.z = THREE.MathUtils.lerp(1.0, -15, t);

          // Chocolate bar remains parked quietly out of way
          mainBarGroup.position.x = THREE.MathUtils.lerp(-8, -4.5, t);
          mainBarGroup.position.y = THREE.MathUtils.lerp(-3, -0.5, t);
          mainBarGroup.position.z = THREE.MathUtils.lerp(-2, 0.2, t);
          mainBarGroup.rotation.set(0.2, 0.3, -0.05);

          cocoaSectionGroup.position.y = 25;
        }

        // Stage 5: Story to Final Reveal (p: 0.82 -> 1.0)
        else {
          const t = (p - 0.82) / 0.18;
          // Grand final reveal: center stage 360 spin
          mainBarGroup.position.x = THREE.MathUtils.lerp(-4.5, 0, t);
          mainBarGroup.position.y = THREE.MathUtils.lerp(-0.5, 0.1, t);
          mainBarGroup.position.z = THREE.MathUtils.lerp(0.2, 1.4, t);
          mainBarGroup.rotation.y = THREE.MathUtils.lerp(0.3, Math.PI * 2 + 0.15, t);
          mainBarGroup.rotation.x = THREE.MathUtils.lerp(0.2, 0.1, t);

          squares.forEach((sq, idx) => {
            const offset = squareOffsets[idx];
            sq.position.x = offset.origX;
            sq.position.y = offset.origY;
            sq.position.z = 0.08;
          });

          giftBoxGroup.position.y = 30;
          cocoaSectionGroup.position.y = 30;
        }
      },
    });

    // --- Mouse Parallax on Desktop ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.22;
      camera.position.y = targetY * 0.18;
      camera.lookAt(0, 0, 0);

      // Chunks gentle rotation & drift
      chunkMeshes.forEach((item, idx) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * 1.1 + idx) * 0.1;
      });

      // Swirling ribbon rotation
      ribbonMesh.rotation.x = elapsedTime * 0.25;
      ribbonMesh.rotation.y = elapsedTime * 0.35;

      // Dust particles subtle wave
      dustParticles.rotation.y = elapsedTime * 0.04;

      // Beans tumbling
      beans.forEach((b, idx) => {
        b.rotation.x += 0.008 * (idx % 2 === 0 ? 1 : -1);
        b.rotation.y += 0.006 * (idx % 3 === 0 ? 1 : -1);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update chocolate flavor material on change
  useEffect(() => {
    const activeFlavor = FLAVORS[currentFlavor] || FLAVORS.dark;
    if (chocoMaterialRef.current) {
      gsap.to(chocoMaterialRef.current.color, {
        r: new THREE.Color(activeFlavor.color).r,
        g: new THREE.Color(activeFlavor.color).g,
        b: new THREE.Color(activeFlavor.color).b,
        duration: 0.8,
      });
      chocoMaterialRef.current.roughness = activeFlavor.roughness;
      chocoMaterialRef.current.clearcoat = activeFlavor.clearcoat;
    }
    if (foilMaterialRef.current) {
      gsap.to(foilMaterialRef.current.color, {
        r: new THREE.Color(activeFlavor.foilColor).r,
        g: new THREE.Color(activeFlavor.foilColor).g,
        b: new THREE.Color(activeFlavor.foilColor).b,
        duration: 0.8,
      });
    }
  }, [currentFlavor]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ touchAction: 'pan-y' }}
    />
  );
};
