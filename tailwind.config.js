/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores do Checkpoint V3 (Minha versão)
        cm: {
          dark: '#0a0a0c',
          panel: '#151518',
          accent: '#00f0ff',
          gold: '#d4af37',
        },
        // Cores do Zip (Nova versão IA Agentes)
        background: '#0A0A0A',
        surface: '#1A1A1A',
        border: '#2A2A2A',
        neon: {
          green: '#00FF00',
          red: '#FF0000',
          blue: '#00F3FF',
          purple: '#B537F2'
        }
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'neu-dark': '5px 5px 10px #040405, -5px -5px 10px #101013',
        'neu-dark-inset': 'inset 5px 5px 10px #040405, inset -5px -5px 10px #101013',
        'glass-glow': '0 0 20px rgba(0, 240, 255, 0.1)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      }
    },
  },
  plugins: [],
}
