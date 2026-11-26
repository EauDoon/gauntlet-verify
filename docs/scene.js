// The gauntlet-verify scene: one beam of work runs a gauntlet of rounds, hits a
// glass prism, and leaves split three ways: verified, reported, unverified.
// Isolated seats (critic, judges, verifiers) orbit the prism; a wireframe
// reference stands behind it in reference mode.
// Shared by docs/index.html (live, driven by scroll) and the offline renderer
// that makes the README banner (looped, driven by t).

const TAU = Math.PI * 2;
export const COLORS = { BG: 0x0b0d10, GREEN: 0x3ecf8e, AMBER: 0xe3b341, RED: 0xf47067, ICE: 0x9fe8c8, CYAN: 0x6cd4ff, WHITE: 0xffffff };
const { BG, GREEN, AMBER, RED, ICE, CYAN, WHITE } = COLORS;
export const LABELS = ['verified', 'reported', 'unverified'];

function radial(THREE, size = 256) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d'); const h = size / 2;
  const gr = g.createRadialGradient(h, h, 0, h, h, h);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

export const VIEWS = {
  hero: { fov: 24, pos: [0.4, 2.0, 10.2], look: [0.1, 0.25, 0] },
  banner: { fov: 30, pos: [0.6, 1.9, 9.6], look: [0.0, 0.3, 0] },
  wide: { fov: 26, pos: [0.0, 1.4, 11.8], look: [0, 0.2, -0.4] },
  close: { fov: 22, pos: [2.2, 0.9, 6.2], look: [0.4, 0.2, 0] },
  side: { fov: 24, pos: [-5.2, 1.6, 6.8], look: [-1.6, 0.2, 0] },
  top: { fov: 30, pos: [0.2, 7.4, 4.6], look: [0, 0, 0] },
};

export function gauntlet(THREE, ctx) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);
  if (ctx.env) { scene.environment = ctx.env; scene.environmentIntensity = 0.4; }
  const view = VIEWS[ctx.view || 'hero'];
  const camera = new THREE.PerspectiveCamera(view.fov, ctx.w / ctx.h, 0.1, 80);
  camera.position.set(...view.pos); camera.lookAt(...view.look);
  if (ctx.shiftX) camera.setViewOffset(ctx.w, ctx.h, -ctx.shiftX * ctx.w, 0, ctx.w, ctx.h);

  const key = new THREE.DirectionalLight(0xffffff, 2.1); key.position.set(3, 6, 4);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.radius = 6; key.shadow.bias = -0.0005;
  Object.assign(key.shadow.camera, { left: -5, right: 5, top: 4, bottom: -4, near: 0.5, far: 24 });
  scene.add(key);
  const rim = new THREE.DirectionalLight(ICE, 1.4); rim.position.set(-4, 2, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0x6c8cff, 0.35); fill.position.set(-5, -1, 3); scene.add(fill);
  scene.add(new THREE.AmbientLight(0x9fb4c8, 0.1));

  const FLOOR_Y = -0.95, Y = 0.3;
  const glowTex = radial(THREE);
  const shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.5 }));
  shadowFloor.rotation.x = -Math.PI / 2; shadowFloor.position.y = FLOOR_Y; shadowFloor.receiveShadow = true; scene.add(shadowFloor);
  const floorGlow = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ map: glowTex, color: GREEN, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false }));
  floorGlow.rotation.x = -Math.PI / 2; floorGlow.position.y = FLOOR_Y + 0.003; scene.add(floorGlow);

  const metal = (color = 0x8f98a3, rough = 0.26) => new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: rough, clearcoat: 1, clearcoatRoughness: 0.12 });
  const glow = (color, k = 3) => new THREE.MeshStandardMaterial({ color: 0x000000, emissive: color, emissiveIntensity: k });
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const up = V(0, 1, 0);
  const beam = (a, b, color, k, r = 0.022) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 12), glow(color, k));
    const set = (p, q) => { m.position.copy(p).add(q).multiplyScalar(0.5); m.scale.set(1, p.distanceTo(q), 1); m.quaternion.setFromUnitVectors(up, q.clone().sub(p).normalize()); };
    set(a, b); m.userData.set = set; scene.add(m); return m;
  };

  // ---------------------------------------------------------------- the prism: where the work is judged
  const prism = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.55, 3, 1),
    new THREE.MeshPhysicalMaterial({ color: 0xdff6ee, metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05, transparent: true, opacity: 0.26, emissive: ICE, emissiveIntensity: 0.06, side: THREE.DoubleSide, depthWrite: false }));
  prism.position.set(-0.35, Y, 0); prism.castShadow = true; scene.add(prism);
  const prismEdges = new THREE.LineSegments(new THREE.EdgesGeometry(prism.geometry), new THREE.LineBasicMaterial({ color: ICE, transparent: true, opacity: 0.0 }));
  prism.add(prismEdges);
  // light behind the glass so the transmission has something to bend
  const backGlow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), new THREE.MeshBasicMaterial({ map: glowTex, color: ICE, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }));
  backGlow.position.set(-0.35, Y, -1.1); scene.add(backGlow);

  // the reference: a wireframe twin of the prism, the shipped bar the build must match
  const ref = new THREE.LineSegments(new THREE.EdgesGeometry(prism.geometry), new THREE.LineBasicMaterial({ color: WHITE, transparent: true, opacity: 0 }));
  ref.position.set(-0.35, Y + 0.05, -2.6); scene.add(ref);
  const refGlow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: glowTex, color: WHITE, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  refGlow.position.copy(ref.position); refGlow.position.z -= 0.2; scene.add(refGlow);
  const tether = beam(V(-0.35, Y + 0.95, 0), V(-0.35, Y + 0.95, -2.6), WHITE, 0.8, 0.006);

  // ---------------------------------------------------------------- the input beam and its gauntlet of rounds
  const src = V(-4.8, Y, 0.4), hit = V(-0.55, Y, 0.1);
  const input = beam(src, hit, WHITE, 2.2, 0.026);
  const dir = hit.clone().sub(src);
  const rings = [0.2, 0.38, 0.56, 0.74].map(u => {
    const p = src.clone().addScaledVector(dir, u);
    const g = new THREE.Group(); g.position.copy(p);
    g.lookAt(hit.clone().add(V(0, 0, 0)));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 20, 96), metal(0xaeb8c4, 0.22));
    const lit = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 8, 120), glow(GREEN, 0.15));
    lit.position.z = 0.04;
    g.add(ring, lit); ring.castShadow = true; scene.add(g);
    return { g, lit, u };
  });

  // ---------------------------------------------------------------- three outputs: the labels a claim can carry
  const exitP = V(-0.12, Y, 0.05);
  const OUTS = [[GREEN, V(3.2, Y + 0.85, -0.6)], [AMBER, V(3.3, Y, 0.1)], [RED, V(3.1, Y - 0.78, 0.8)]];
  const outs = OUTS.map(([c, end]) => {
    const b = beam(exitP, end, c, 2.0);
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.5), metal(0x8b949e, 0.3));
    plate.position.copy(end).add(V(0.05, 0, 0)); plate.castShadow = true; scene.add(plate);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 24, 12), glow(c, 3)); dot.position.copy(end); scene.add(dot);
    const beads = [0, 0.5].map(ph => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 8), glow(c, 4)); scene.add(m); return { m, ph }; });
    return { b, plate, dot, beads, end, c, k: 2.0 };
  });
  const inBeads = [0, 0.34, 0.67].map(ph => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 8), glow(WHITE, 4)); scene.add(m); return { m, ph }; });

  // ---------------------------------------------------------------- isolated seats: critic, judges, verifiers
  const seatMat = () => metal(0xc9d1d9, 0.2);
  const seats = [0, 1, 2, 3, 4].map(i => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 1), seatMat()); body.castShadow = true;
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.008, 8, 64), glow(CYAN, 1.6));
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), glow(CYAN, 3)); eye.position.z = 0.15;
    g.add(body, halo, eye); scene.add(g);
    const line = beam(V(0, 0, 0), V(0, 1, 0), CYAN, 1.2, 0.006);
    return { g, halo, eye, line, vis: 0, phase: i / 5 };
  });

  const tmp = V(0, 0, 0), target = V(0, 0, 0);
  const camTarget = V(...view.look);
  const cur = { rounds: 4, split: 1, seats: 2, ref: 0, focus: -1, edges: 0 };

  // state: { rounds 0..4, split 0..1, seats 0..5, ref 0..1, focus -1|0|1|2, view }
  // Without a state the scene runs its own loop for the offline renders.
  function update(t, state) {
    const loop = !state;
    const st = state || { rounds: 4, split: 1, seats: ctx.seatCount ?? 2, ref: 0, focus: -1 };
    const k = loop ? 1 : 0.08;
    for (const key of ['rounds', 'split', 'seats', 'ref']) cur[key] += ((st[key] ?? cur[key]) - cur[key]) * k;
    const focus = st.focus ?? -1;

    // a three-fold prism: a third of a turn loops
    prism.rotation.y = (TAU / 3) * t + 0.3;
    ref.rotation.y = 0.3 + Math.sin(t * TAU) * 0.05;

    // rounds light up along the gauntlet, and the lit ring pulses as a bead passes it
    rings.forEach((r, i) => {
      const on = Math.min(1, Math.max(0, cur.rounds - i));
      let pass = 0;
      for (const b of inBeads) { const u = (t * (loop ? 2 : 1) + b.ph) % 1; pass = Math.max(pass, Math.max(0, 1 - Math.abs(u - r.u) * 14)); }
      r.lit.material.emissiveIntensity = 0.12 + on * (1.4 + pass * 2.2);
      r.g.scale.setScalar(0.85 + on * 0.15);
    });
    for (const b of inBeads) {
      const u = (t * (loop ? 2 : 1) + b.ph) % 1;
      b.m.position.lerpVectors(src, hit, u);
      b.m.scale.setScalar(Math.max(0.001, Math.sin(Math.PI * u)));
    }

    // outputs: the split, and one label in focus when asked
    outs.forEach((o, i) => {
      const f = focus < 0 ? 1 : focus === i ? 1.35 : 0.18;
      const s = cur.split * f;
      o.b.material.emissiveIntensity = o.k * s;
      o.b.visible = s > 0.02;
      o.dot.material.emissiveIntensity = 3 * Math.max(0.15, s);
      o.dot.scale.setScalar(focus === i ? 1.5 : 1);
      for (const b of o.beads) {
        const u = (t * (loop ? 2 : 1) + b.ph) % 1;
        b.m.position.lerpVectors(exitP, o.end, u);
        b.m.scale.setScalar(Math.max(0.001, Math.sin(Math.PI * u) * Math.min(1, s)));
      }
    });

    // seats orbit the prism; each looks at it through a thin line, never at the builder
    seats.forEach((S, i) => {
      const present = Math.min(1, Math.max(0, cur.seats - i));
      S.vis = present;
      const n = Math.max(1, Math.ceil(cur.seats - 0.01));
      const ang = (i / n) * TAU + t * TAU * (loop ? 1 : 0.25) + 0.6;
      S.g.position.set(-0.35 + Math.cos(ang) * 1.65, Y + 1.15 + Math.sin(ang * 2 + i) * 0.12, Math.sin(ang) * 1.2);
      S.g.scale.setScalar(Math.max(0.0001, present));
      S.g.visible = present > 0.01;
      target.set(-0.35, Y, 0);
      S.g.lookAt(target);
      S.halo.rotation.x = t * TAU;
      S.eye.getWorldPosition(tmp);
      S.line.userData.set(tmp.clone(), target.clone().add(V(0, 0.4, 0)));
      S.line.visible = present > 0.05;
      S.line.material.emissiveIntensity = 1.2 * present;
    });

    // reference mode: the wireframe twin and the judge tether
    ref.material.opacity = 0.85 * cur.ref;
    refGlow.material.opacity = 0.12 * cur.ref;
    tether.material.emissiveIntensity = 0.9 * cur.ref; tether.visible = cur.ref > 0.05;
    prismEdges.material.opacity = 0.75 + 0.25 * cur.ref;

    floorGlow.material.color.set(GREEN);
    if (focus === 1) floorGlow.material.color.set(AMBER);
    if (focus === 2) floorGlow.material.color.set(RED);

    if (!loop && st.view) {
      const v = VIEWS[st.view];
      camera.position.lerp(V(...v.pos), 0.04);
      camTarget.lerp(V(...v.look), 0.04);
      camera.fov += (v.fov - camera.fov) * 0.04; camera.updateProjectionMatrix();
      camera.lookAt(camTarget);
    }
  }

  return { scene, camera, update, seats, outs, bloom: { strength: 0.5, radius: 0.45, threshold: 0.86 } };
}
