/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        army: {
          DEFAULT: '#3b4a2f',
          dark: '#1f2a17',
          olive: '#2d3a1f',
          light: '#5c6b48',
        },
        neon: {
          DEFAULT: '#7dff3c',
          soft: '#b8ff8a',
        },
        mill: {
          yellow: '#e6d24a',
          metal: '#8a8f84',
        },
      },
      fontFamily: {
        hud: ['"Rajdhani"', '"Orbitron"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(125,255,60,0.35), inset 0 0 8px rgba(125,255,60,0.15)',
        'glow-strong': '0 0 32px rgba(125,255,60,0.65)',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        slideIn: 'slideIn 0.4s ease-out both',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
