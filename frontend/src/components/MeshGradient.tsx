import React, { useEffect, useRef, useState } from 'react'

/**
 * MeshGradient
 * GPU-accelerated full-bleed animated mesh gradient.
 * - Single full-screen triangle (-1,-1, 3,-1, -1,3)
 * - 2-stage domain-warped FBM with 5 octaves
 * - Seamless loop sampled on a closed circular trajectory
 * - 4x4 Bayer matrix ordered dither to prevent 8-bit banding
 * - Eased pointer parallax
 * - Swappable palettes: Noir, Mint, Plum, Neon
 */

type PaletteKey = 'noir' | 'mint' | 'plum' | 'neon'

interface PaletteConfig {
  name: string
  dot: string
  hex: [string, string, string, string]
  stops: [number, number, number][]
}

function hexToRgb(hex: string): [number, number, number] {
  const num = parseInt(hex.replace('#', ''), 16)
  return [
    ((num >> 16) & 255) / 255.0,
    ((num >> 8) & 255) / 255.0,
    (num & 255) / 255.0
  ]
}

const PALETTES: Record<PaletteKey, PaletteConfig> = {
  noir: {
    name: 'Noir',
    dot: '#8b9099',
    hex: ['#08090b', '#2f3237', '#8b9099', '#f3f4f6'],
    stops: ['#08090b', '#2f3237', '#8b9099', '#f3f4f6'].map(hexToRgb) as [number, number, number][]
  },
  mint: {
    name: 'Mint',
    dot: '#9ccfb2',
    hex: ['#f7f4e8', '#dcecd9', '#9ccfb2', '#5c9c85'],
    stops: ['#f7f4e8', '#dcecd9', '#9ccfb2', '#5c9c85'].map(hexToRgb) as [number, number, number][]
  },
  plum: {
    name: 'Plum',
    dot: '#e07a9c',
    hex: ['#180814', '#48103e', '#95275f', '#e07a9c'],
    stops: ['#180814', '#48103e', '#95275f', '#e07a9c'].map(hexToRgb) as [number, number, number][]
  },
  neon: {
    name: 'Neon',
    dot: '#ff2f92',
    hex: ['#04060a', '#7dff4d', '#ff2f92', '#29e6ff'],
    stops: ['#04060a', '#7dff4d', '#ff2f92', '#29e6ff'].map(hexToRgb) as [number, number, number][]
  }
}

const vsSource = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const fsSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_t;
  uniform vec2 u_pointer;
  uniform vec3 u_c0;
  uniform vec3 u_c1;
  uniform vec3 u_c2;
  uniform vec3 u_c3;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(13.17, 19.31);
      a *= 0.5;
    }
    return v;
  }

  float bayer4(vec2 coord) {
    vec2 p = floor(mod(coord, 4.0));
    float d = 0.0;
    if (p.y < 0.5) {
      d = (p.x < 0.5) ? 0.0 : (p.x < 1.5) ? 8.0 : (p.x < 2.5) ? 2.0 : 10.0;
    } else if (p.y < 1.5) {
      d = (p.x < 0.5) ? 12.0 : (p.x < 1.5) ? 4.0 : (p.x < 2.5) ? 14.0 : 6.0;
    } else if (p.y < 2.5) {
      d = (p.x < 0.5) ? 3.0 : (p.x < 1.5) ? 11.0 : (p.x < 2.5) ? 1.0 : 9.0;
    } else {
      d = (p.x < 0.5) ? 15.0 : (p.x < 1.5) ? 7.0 : (p.x < 2.5) ? 13.0 : 5.0;
    }
    return (d / 16.0) - 0.5;
  }

  void main() {
    vec2 p = v_uv * vec2(u_resolution.x / u_resolution.y, 1.0) * 1.7;
    p += u_pointer * 0.22;
    vec2 orb = vec2(cos(u_t), sin(u_t)) * 0.55;

    vec2 q = vec2(
      fbm(p + orb),
      fbm(p + orb.yx + vec2(3.1, 3.1))
    );

    vec2 r = vec2(
      fbm(p + 2.0 * q + orb * 1.3 + vec2(1.7, 1.7)),
      fbm(p + 2.0 * q - orb + vec2(9.2, 9.2))
    );

    float f = fbm(p + 1.8 * r);
    float g = clamp((f - 0.14) / 0.72, 0.0, 1.0);
    float s = length(q);

    vec3 col = mix(u_c0, u_c1, smoothstep(0.0, 0.45, g));
    col = mix(col, u_c2, smoothstep(0.35, 0.78, g));
    col = mix(col, u_c3, smoothstep(0.62, 1.0, g) * (0.55 + 0.45 * s));

    col += bayer4(gl_FragCoord.xy) * 0.016;
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`

export default function MeshGradient(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activePalette, setActivePalette] = useState<PaletteKey>('noir')
  const [isWebGlSupported, setIsWebGlSupported] = useState<boolean>(true)
  const [phaseReadout, setPhaseReadout] = useState<string>('0.00 rad')

  const targetStopsRef = useRef<[number, number, number][]>(
    PALETTES.noir.stops.map(s => [...s]) as [number, number, number][]
  )
  const currentStopsRef = useRef<[number, number, number][]>(
    PALETTES.noir.stops.map(s => [...s]) as [number, number, number][]
  )

  useEffect(() => {
    targetStopsRef.current = PALETTES[activePalette].stops.map(s => [...s]) as [number, number, number][]
  }, [activePalette])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' }) ||
      canvas.getContext('experimental-webgl')

    if (!gl) {
      setIsWebGlSupported(false)
      return
    }

    function createShader(glCtx: WebGLRenderingContext, type: number, src: string) {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, src)
      glCtx.compileShader(shader)
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader))
        glCtx.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Full-screen triangle: (-1,-1, 3,-1, -1,3)
    const positions = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_t')
    const uPointer = gl.getUniformLocation(program, 'u_pointer')
    const uC0 = gl.getUniformLocation(program, 'u_c0')
    const uC1 = gl.getUniformLocation(program, 'u_c1')
    const uC2 = gl.getUniformLocation(program, 'u_c2')
    const uC3 = gl.getUniformLocation(program, 'u_c3')

    const targetPointer = { x: 0, y: 0 }
    const easedPointer = { x: 0, y: 0 }
    let u_t = 0
    const TWO_PI = Math.PI * 2
    let animationId: number

    function resize() {
      if (!canvas || !gl) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
    }

    const onPointerMove = (e: PointerEvent) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2.0
      targetPointer.y = -(e.clientY / window.innerHeight - 0.5) * 2.0
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    resize()

    let lastTime = performance.now()

    function render(now: number) {
      const delta = Math.min((now - lastTime) * 0.001, 0.1)
      lastTime = now

      u_t += delta * 0.38
      if (u_t >= TWO_PI) u_t -= TWO_PI

      easedPointer.x += (targetPointer.x - easedPointer.x) * 0.06
      easedPointer.y += (targetPointer.y - easedPointer.y) * 0.06

      for (let i = 0; i < 4; i++) {
        for (let c = 0; c < 3; c++) {
          currentStopsRef.current[i][c] +=
            (targetStopsRef.current[i][c] - currentStopsRef.current[i][c]) * 0.08
        }
      }

      gl.uniform1f(uTime, u_t)
      gl.uniform2f(uPointer, easedPointer.x, easedPointer.y)
      gl.uniform3fv(uC0, currentStopsRef.current[0])
      gl.uniform3fv(uC1, currentStopsRef.current[1])
      gl.uniform3fv(uC2, currentStopsRef.current[2])
      gl.uniform3fv(uC3, currentStopsRef.current[3])

      gl.drawArrays(gl.TRIANGLES, 0, 3)
      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  const hexStops = PALETTES[activePalette].hex

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[#08090b]">
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${!isWebGlSupported ? 'hidden' : 'block'}`}
      />

      {/* CSS Fallback if WebGL not supported */}
      {!isWebGlSupported && (
        <div
          className="absolute inset-0 w-full h-full transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, ${hexStops[0]} 0%, ${hexStops[1]} 35%, ${hexStops[2]} 70%, ${hexStops[3]} 100%)`
          }}
        />
      )}

      {/* Floating HUD & Palette Switcher */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mix-blend-difference">
              GPU Mesh Gradient
            </h1>
            <p className="font-mono text-xs text-white/70 tracking-widest uppercase mt-0.5 mix-blend-difference">
              Double-Warped FBM &middot; 4&times;4 Bayer Dither
            </p>
          </div>

          {/* Swappable Palettes Bar */}
          <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/10 shadow-2xl">
            {(Object.keys(PALETTES) as PaletteKey[]).map((key) => {
              const pal = PALETTES[key]
              const isActive = activePalette === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePalette(key)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/20 text-white font-semibold shadow-xs'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: pal.dot }}
                  />
                  <span>{pal.name}</span>
                </button>
              )
            })}
          </div>
        </header>

        <footer className="flex justify-between items-end font-mono text-xs tracking-widest uppercase text-white/70 mix-blend-difference">
          <span>Seamless Closed Trajectory Loop</span>
          <span>GPU WebGL Shaders &middot; Zero Banding</span>
        </footer>
      </div>
    </div>
  )
}
