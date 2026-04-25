"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uTheme;   // 0 dark, 1 light
  uniform float uScroll;  // 0..1
  uniform vec2  uResolution;

  // ---- Hash + noise utils ----
  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  // ---- Aurora ribbon ----
  float ribbon(vec2 uv, float yOffset, float freq, float speed, float thickness, float t) {
    float curve = sin(uv.x * freq + t * speed) * 0.06
                + sin(uv.x * freq * 1.7 - t * speed * 0.6) * 0.04
                + fbm(vec2(uv.x * 2.0 + t * 0.1, t * 0.05)) * 0.06;
    float band = 1.0 - smoothstep(0.0, thickness, abs(uv.y - yOffset - curve));
    return band;
  }

  // ---- Mountain heights — multiple layers ----
  float mountains(float x, float seed, float scale) {
    float h = fbm(vec2(x * scale + seed, seed * 1.7)) * 0.5 + 0.5;
    h += fbm(vec2(x * scale * 3.5 + seed, seed * 2.1)) * 0.15;
    return h;
  }

  // ---- Stars ----
  float stars(vec2 uv, float t) {
    vec2 grid = floor(uv * 320.0);
    float h = hash21(grid);
    float pulse = 0.5 + 0.5 * sin(t * 1.5 + h * 30.0);
    return step(0.997, h) * pulse * 1.2;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.05;
    float scroll = uScroll;

    // ===== Palette =====
    // Dark theme — Polaris-style night
    vec3 dSkyTop    = vec3(0.020, 0.039, 0.082);  // near-black navy
    vec3 dSkyMid    = vec3(0.027, 0.090, 0.133);  // teal-tinted
    vec3 dSkyHorizon= vec3(0.039, 0.180, 0.165);  // moss-teal horizon glow
    vec3 dAuroraGreen = vec3(0.318, 1.000, 0.616); // neon mint #51ff9d
    vec3 dAuroraTeal  = vec3(0.114, 0.749, 0.612); // teal
    vec3 dAuroraPurple= vec3(0.612, 0.451, 0.953); // violet
    vec3 dMountain   = vec3(0.020, 0.047, 0.078);  // very dark blue
    vec3 dMountain2  = vec3(0.043, 0.094, 0.122);  // slightly lighter

    // Light theme — dawn aurora
    vec3 lSkyTop    = vec3(0.937, 0.859, 0.961);
    vec3 lSkyMid    = vec3(0.871, 0.918, 0.973);
    vec3 lSkyHorizon= vec3(0.788, 0.929, 0.890);
    vec3 lAuroraGreen = vec3(0.380, 0.886, 0.722);
    vec3 lAuroraTeal  = vec3(0.494, 0.769, 0.918);
    vec3 lAuroraPurple= vec3(0.737, 0.580, 0.910);
    vec3 lMountain   = vec3(0.502, 0.553, 0.671);
    vec3 lMountain2  = vec3(0.380, 0.439, 0.557);

    vec3 SkyTop      = mix(dSkyTop,       lSkyTop,       uTheme);
    vec3 SkyMid      = mix(dSkyMid,       lSkyMid,       uTheme);
    vec3 SkyHorizon  = mix(dSkyHorizon,   lSkyHorizon,   uTheme);
    vec3 AuroraGreen = mix(dAuroraGreen,  lAuroraGreen,  uTheme);
    vec3 AuroraTeal  = mix(dAuroraTeal,   lAuroraTeal,   uTheme);
    vec3 AuroraPurple= mix(dAuroraPurple, lAuroraPurple, uTheme);
    vec3 Mountain    = mix(dMountain,     lMountain,     uTheme);
    vec3 Mountain2   = mix(dMountain2,    lMountain2,    uTheme);

    // ===== Sky gradient =====
    float skyMix = smoothstep(0.0, 1.0, uv.y);
    vec3 sky = mix(SkyHorizon, SkyMid, smoothstep(0.0, 0.5, skyMix));
    sky = mix(sky, SkyTop, smoothstep(0.4, 1.0, skyMix));

    // ===== Stars (dark mode) =====
    float st = stars(uv * vec2(2.4, 1.4) + vec2(scroll * 0.3, scroll * 0.6), uTime);
    sky += st * (1.0 - uTheme) * vec3(0.85, 0.95, 1.0);

    // ===== Aurora ribbons — concentrated upper-half =====
    // ribbons drift left-right with scroll for parallax feel
    float scrollPan = scroll * 0.4;
    vec2 auv = uv;
    auv.x += scrollPan;

    float r1 = ribbon(auv, 0.78, 4.0,  1.4, 0.18, t);
    float r2 = ribbon(auv, 0.62, 6.0,  0.9, 0.14, t * 1.2 + 1.0);
    float r3 = ribbon(auv, 0.88, 3.0,  0.7, 0.22, t * 0.8 + 2.5);
    float r4 = ribbon(auv, 0.55, 8.0, -1.1, 0.10, t * 1.5);
    float r5 = ribbon(auv + vec2(scroll * 0.2, 0.0), 0.72, 5.0, 1.9, 0.08, t * 2.0);

    // Vertical falloff so ribbons are stronger high-up
    float upperMask = smoothstep(0.35, 0.95, uv.y) * smoothstep(1.05, 0.55, uv.y) * 1.4;

    // FBM-based brightness modulation
    float mod1 = fbm(vec2(uv.x * 3.0 + t * 0.4, uv.y * 2.0 - t * 0.2));
    float mod2 = fbm(vec2(uv.x * 6.0 - t * 0.3, uv.y * 3.0 + t * 0.15));

    float greenAurora = (r1 * 1.0 + r3 * 0.7 + r5 * 0.6) * upperMask * (0.6 + 0.7 * mod1);
    float tealAurora  = (r2 * 0.9 + r4 * 0.6) * upperMask * (0.5 + 0.6 * mod2);
    float purpleHaze  = smoothstep(0.5, 1.0, uv.y) * smoothstep(1.1, 0.8, uv.y) * (0.3 + 0.4 * mod1);

    // Scroll intensifies aurora
    float scrollIntensity = 1.0 + scroll * 0.5;
    greenAurora *= scrollIntensity;
    tealAurora  *= scrollIntensity;

    // Bloom-like glow
    vec3 color = sky;
    color = mix(color, AuroraTeal,   clamp(tealAurora, 0.0, 1.0));
    color = mix(color, AuroraGreen,  clamp(greenAurora, 0.0, 1.0));
    color = mix(color, AuroraPurple, clamp(purpleHaze * 0.4, 0.0, 1.0));

    // Aurora reflection on horizon (very subtle green tint near horizon)
    float horizonGlow = smoothstep(0.3, 0.0, uv.y) * 0.25;
    color += AuroraGreen * horizonGlow * (1.0 - uTheme);

    // ===== Mountains — three parallax layers =====
    // Each layer has its own scroll-driven Y offset
    // Far layer
    float farX = uv.x * 1.0 + scroll * 0.05;
    float farH = mountains(farX, 11.7, 1.2) * 0.18 + 0.16 - scroll * 0.04;
    float farMask = step(uv.y, farH);
    color = mix(color, Mountain2 * 1.4, farMask * 0.55);

    // Mid layer
    float midX = uv.x * 1.4 + scroll * 0.10 - 1.5;
    float midH = mountains(midX, 7.3, 1.6) * 0.22 + 0.10 - scroll * 0.07;
    float midMask = step(uv.y, midH);
    color = mix(color, Mountain * 1.2, midMask * 0.85);

    // Near layer (sharpest, darkest)
    float nearX = uv.x * 1.9 + scroll * 0.18 + 0.7;
    float nearH = mountains(nearX, 3.1, 2.2) * 0.20 + 0.04 - scroll * 0.10;
    float nearMask = step(uv.y, nearH);
    color = mix(color, Mountain, nearMask);

    // ===== Subtle vignette =====
    float vig = smoothstep(1.5, 0.4, length(uv - vec2(0.5, 0.55)));
    color *= mix(0.8, 1.0, vig);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function AuroraPlane({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { resolvedTheme } = useTheme();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTheme: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    matRef.current.uniforms.uTheme.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uTheme.value,
      resolvedTheme === "light" ? 1 : 0,
      0.05
    );
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
    matRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uScroll.value,
      scrollRef.current,
      0.08
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function AuroraCanvas() {
  const scrollRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <AuroraPlane scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
