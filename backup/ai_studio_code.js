/** @type {import('tailwindcss').Config} */
export default {
  content:,
  theme: {
    extend: {
      colors: {
        cm: {
          deep: '#0a0a0c',     // Deep Space
          cyan: '#00f0ff',     // Electric Cyan
          gold: '#d4af37',     // Sovereign Gold
          red: '#ff4b2b',      // Error Red
          panel: 'rgba(255, 255, 255, 0.03)', // Base Glass
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.15)',
        'glow-cyan-strong': '0 0 30px rgba(0, 240, 255, 0.4)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.15)',
        'glow-red': '0 0 20px rgba(255, 75, 43, 0.2)',
      },
      backdropBlur: {
        'apple': '24px',
      }
    },
  },
  plugins:[],
}