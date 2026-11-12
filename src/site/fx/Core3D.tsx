import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/*
  "The Core" — the hero's one cinematic WebGL object (web-design-skills · active-theory recipe:
  "a full-screen WebGL hero", "a single moment of maximum impact"; field-io: "particle / mesh systems
  that respond to cursor and scroll position").

  A faceted chrome crystal (the system) inside a slowly counter-turning wireframe shell; three orbit
  rings carry the connected apps as glowing nodes in their brand colours; every ~1.4 s one node fires
  a beam of light into the core (a message arriving); a halo of light particles drifts around it.
  It tilts toward the pointer, and spins up and opens as the visitor scrolls past the hero.

  One WebGL context, pixel ratio capped, paused off screen and in background tabs, one still frame
  under reduced motion, a CSS orb if WebGL is unavailable.
*/

const NODE_COLORS = [0x25d366, 0xff3d8b, 0x4fb3ff, 0x8b7bff, 0xff4a36, 0x2dd4bf];
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function glowTexture(inner: string, outer: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, inner);
  grd.addColorStop(0.35, outer);
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Core3D() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.innerWidth < 640;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !phone, alpha: true, powerPreference: 'high-performance' });
    } catch {
      el.classList.add('core--fallback');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;

    const world = new THREE.Group();
    scene.add(world);

    // halo behind the crystal
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture('rgba(255,90,120,0.9)', 'rgba(124,108,255,0.35)'), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }),
    );
    halo.scale.set(6.2, 6.2, 1);
    halo.position.z = -1.2;
    world.add(halo);

    // the crystal
    const crystalGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const crystal = new THREE.Mesh(
      crystalGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x15121f,
        metalness: 1,
        roughness: 0.2,
        flatShading: true,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        iridescence: 0.55,
        iridescenceIOR: 1.5,
        iridescenceThicknessRange: [240, 640],
        envMapIntensity: 0.75,
      }),
    );
    world.add(crystal);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(crystalGeo),
      new THREE.LineBasicMaterial({ color: 0x7fe3ff, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending }),
    );
    crystal.add(edges);

    // the wireframe shell
    const shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.95, 1)),
      new THREE.LineBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending }),
    );
    world.add(shell);

    // rim lights
    const coral = new THREE.PointLight(0xff4a36, 60, 12);
    coral.position.set(3, 2, 3);
    const cyan = new THREE.PointLight(0x19d3ff, 48, 12);
    cyan.position.set(-3, -1.5, 2.5);
    scene.add(coral, cyan, new THREE.AmbientLight(0x6b5cff, 0.35));

    // orbit rings with app nodes
    const dotTex = glowTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0.25)');
    type Node = { ring: THREE.Group; r: number; a: number; speed: number; mesh: THREE.Sprite; beam: THREE.Line; flash: number; color: THREE.Color };
    const nodes: Node[] = [];
    const rings: THREE.Group[] = [];
    const ringDefs = [
      { r: 2.45, tilt: [1.15, 0.2, 0], speed: 0.32 },
      { r: 2.9, tilt: [1.45, -0.55, 0.3], speed: -0.24 },
      { r: 3.35, tilt: [1.3, 0.75, -0.2], speed: 0.18 },
    ];
    ringDefs.forEach((d, ri) => {
      const ring = new THREE.Group();
      ring.rotation.set(d.tilt[0], d.tilt[1], d.tilt[2]);
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const a = (i / 160) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * d.r, Math.sin(a) * d.r, 0));
      }
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 }),
      );
      ring.add(line);
      for (let k = 0; k < 2; k++) {
        const ci = ri * 2 + k;
        const color = new THREE.Color(NODE_COLORS[ci]);
        const mesh = new THREE.Sprite(new THREE.SpriteMaterial({ map: dotTex, color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
        mesh.scale.set(0.42, 0.42, 1);
        ring.add(mesh);
        const beamGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
        const beam = new THREE.Line(beamGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
        world.add(beam);
        nodes.push({ ring, r: d.r, a: k * Math.PI + ri, speed: d.speed, mesh, beam, flash: 0, color });
      }
      world.add(ring);
      rings.push(ring);
    });

    // particle halo
    const N = phone ? 700 : 1600;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const palette = [new THREE.Color(0xff4a36), new THREE.Color(0xff3d8b), new THREE.Color(0x8b7bff), new THREE.Color(0x19d3ff)];
    for (let i = 0; i < N; i++) {
      const r = 2.3 + Math.pow(Math.random(), 0.7) * 2.6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.8;
      pos[i * 3 + 2] = r * Math.cos(ph);
      const c = palette[(Math.random() * palette.length) | 0];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ size: 0.035, map: dotTex, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }),
    );
    world.add(points);

    // size
    const fit = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole orbit system in frame on narrow boxes
      camera.position.z = w / h < 0.9 ? 11.5 : 9.5;
      camera.updateProjectionMatrix();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);

    // pointer and scroll
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    const hero = el.closest('section') || el;
    const outOf = () => {
      const r = hero.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    const onVis = () => !document.hidden && start();
    document.addEventListener('visibilitychange', onVis);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let nextFire = 1.2;
    let fireIdx = 0;
    const tmp = new THREE.Vector3();

    const frame = () => {
      raf = 0;
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const enter = easeOutExpo(Math.min(1, t / 1.8));
      const out = outOf();

      world.scale.setScalar((0.72 + 0.28 * enter) * (1 + out * 0.35));
      world.rotation.y += (target.x * 0.35 - world.rotation.y) * 0.04;
      world.rotation.x += (target.y * 0.22 - world.rotation.x) * 0.04;
      crystal.rotation.y += dt * (0.32 + out * 2.4);
      crystal.rotation.x += dt * 0.11;
      shell.rotation.y -= dt * 0.12;
      shell.rotation.z += dt * 0.05;
      points.rotation.y += dt * 0.03;
      (points.material as THREE.PointsMaterial).opacity = 0.75 * enter;
      halo.material.opacity = (0.75 + Math.sin(t * 1.4) * 0.15) * enter;
      rings.forEach((r, i) => {
        r.rotation.z += dt * 0.05 * (i % 2 ? -1 : 1);
        r.scale.setScalar(1 + out * 0.5 * (i + 1) * 0.4);
      });

      // a message arrives: one node fires a beam into the core
      if (t > nextFire) {
        nodes[fireIdx % nodes.length].flash = 1;
        fireIdx += 1 + ((Math.random() * 2) | 0);
        nextFire = t + 1.1 + Math.random() * 0.6;
      }
      nodes.forEach((n) => {
        n.a += dt * n.speed;
        n.mesh.position.set(Math.cos(n.a) * n.r, Math.sin(n.a) * n.r, 0);
        n.mesh.getWorldPosition(tmp);
        world.worldToLocal(tmp);
        const arr = n.beam.geometry.attributes.position as THREE.BufferAttribute;
        arr.setXYZ(0, tmp.x, tmp.y, tmp.z);
        arr.setXYZ(1, tmp.x * 0.42, tmp.y * 0.42, tmp.z * 0.42);
        arr.needsUpdate = true;
        n.flash = Math.max(0, n.flash - dt * 1.4);
        (n.beam.material as THREE.LineBasicMaterial).opacity = n.flash * 0.9 * enter;
        const s = 0.42 + n.flash * 0.5;
        n.mesh.scale.set(s, s, 1);
      });
      edges.material.opacity = 0.22 + nodes.reduce((m, n) => Math.max(m, n.flash), 0) * 0.35;

      renderer.render(scene, camera);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    function start() {
      if (!raf && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }
    if (reduced) {
      t = 3;
      frame();
    } else start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="core" aria-hidden="true" />;
}
