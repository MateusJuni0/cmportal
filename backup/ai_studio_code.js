/** @type {import('tailwindcss').Config} */
export default {
  content:,
  theme: {
    extend: {
      colors: {
        cm: {
          dark: '#0a0a0c', // Fundo principal super escuro
          panel: '#151518', // Fundo de painéis
          accent: '#00f0ff', // Ciano futurista para brilhos (Alfa)
          gold: '#d4af37', // Dourado premium para status "Prime" (Nero)
        }
      },
      boxShadow: {
        // Neumorphism para Dark Mode
        'neu-dark': '5px 5px 10px #040405, -5px -5px 10px #101013',
        'neu-dark-inset': 'inset 5px 5px 10px #040405, inset -5px -5px 10px #101013',
        // Glassmorphism glow
        'glass-glow': '0 0 20px rgba(0, 240, 255, 0.1)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      }
    },
  },
  plugins:[],
}