"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
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
  uniform float uTheme; // 0 dark, 1 light
  uniform vec2 uResolution;
  uniform float uScroll;

  // 2D simplex noise — Ashima Arts
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

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.06;
    float scroll = uScroll;

    // Dark theme palette
    vec3 dBg     = vec3(0.031, 0.063, 0.165);   // deep navy #08102a
    vec3 dMint   = vec3(0.498, 0.925, 0.757);   // #7fecc1
    vec3 dTeal   = vec3(0.227, 0.722, 0.659);   // teal
    vec3 dViolet = vec3(0.427, 0.290, 0.839);   // violet
    vec3 dPurple = vec3(0.753, 0.518, 0.988);   // light purple
    vec3 dRoyal  = vec3(0.110, 0.204, 0.408);   // royal blue

    // Light theme palette (dawn aurora)
    vec3 lBg     = vec3(0.941, 0.957, 1.000);
    vec3 lMint   = vec3(0.380, 0.875, 0.722);
    vec3 lTeal   = vec3(0.620, 0.890, 0.973);
    vec3 lViolet = vec3(0.650, 0.510, 0.890);
    vec3 lPurple = vec3(0.961, 0.722, 0.838);
    vec3 lRoyal  = vec3(0.776, 0.847, 1.000);

    vec3 cBg     = mix(dBg,     lBg,     uTheme);
    vec3 cMint   = mix(dMint,   lMint,   uTheme);
    vec3 cTeal   = mix(dTeal,   lTeal,   uTheme);
    vec3 cViolet = mix(dViolet, lViolet, uTheme);
    vec3 cPurple = mix(dPurple, lPurple, uTheme);
    vec3 cRoyal  = mix(dRoyal,  lRoyal,  uTheme);

    // Vertical gradient base
    vec3 base = mix(cBg, cRoyal, smoothstep(0.0, 1.0, 1.0 - uv.y));
    base = mix(base, cBg, 0.4);

    // Aurora bands — flowing curtains
    vec2 p = uv;
    p.y -= 0.1 - scroll * 0.15;
    float n1 = fbm(vec2(p.x * 2.5 + t, p.y * 1.2 - t * 0.8));
    float n2 = fbm(vec2(p.x * 4.0 - t * 1.3, p.y * 2.0 + t * 0.6));
    float n3 = fbm(vec2(p.x * 1.6 + t * 0.5, p.y * 3.0 - t * 0.4));

    float band1 = smoothstep(0.05, 0.55, uv.y) * smoothstep(1.0, 0.5, uv.y);
    band1 *= 0.5 + 0.5 * sin(uv.x * 3.0 + n1 * 2.5 + t * 1.5);
    band1 *= (0.6 + 0.4 * n2);

    float band2 = smoothstep(0.2, 0.7, uv.y) * smoothstep(1.0, 0.6, uv.y);
    band2 *= 0.5 + 0.5 * sin(uv.x * 2.0 - n2 * 3.0 + t * 0.9);
    band2 *= (0.5 + 0.5 * n3);

    float band3 = smoothstep(0.0, 0.4, uv.y) * smoothstep(0.8, 0.3, uv.y);
    band3 *= 0.5 + 0.5 * sin(uv.x * 5.0 + n3 * 2.0 - t * 2.0);

    vec3 color = base;
    color = mix(color, cMint, clamp(band1 * 0.85, 0.0, 1.0));
    color = mix(color, cTeal, clamp(band1 * band2 * 1.2, 0.0, 1.0));
    color = mix(color, cViolet, clamp(band2 * 0.6, 0.0, 1.0));
    color = mix(color, cPurple, clamp(band3 * band2 * 1.4, 0.0, 1.0));

    // Subtle vignette
    float vig = smoothstep(1.4, 0.4, length(uv - 0.5));
    color *= mix(0.85, 1.0, vig);

    // Stars (dark mode only)
    float starField = step(0.997, fract(sin(dot(floor(uv * 800.0), vec2(12.9898, 78.233))) * 43758.5453));
    color += starField * (1.0 - uTheme) * 0.9;

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

  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      () => {
        const max = document.body.scrollHeight - window.innerHeight;
        scrollRef.current = max > 0 ? window.scrollY / max : 0;
      },
      { passive: true }
    );
  }

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
      <div className="absolute inset-0 starfield opacity-40 mix-blend-screen" />
    </div>
  );
}
