/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'rgb(36,36,36)',
          text: '#ffffff',
        },
        light: {
          bg: '#f8f9fa',
          text: '#212529',
          secondary: '#6c757d',
          accent: '#0d6efd',
          muted: '#e9ecef',
          border: '#dee2e6',
          hover: '#e2e6ea'
        }
      }
    },
    animation: {
      'blob-infinite': 'blob 7s infinite',
      float: 'float 10s ease-in-out infinite',
      pulse: 'pulse 2s ease-in-out infinite',
    },
    keyframes: {
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
        "100%": {
          transform: "translate(0px, 0px) scale(1)",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
      float: {
        '0%, 100%': { 
          transform: 'translateY(0) rotate(0deg)',
          opacity: '0.4'
        },
        '50%': { 
          transform: 'translateY(-20px) rotate(180deg)',
          opacity: '0.6'
        },
      },
      pulse: {
        '0%, 100%': { 
          transform: 'scale(1)',
          opacity: '0.4'
        },
        '50%': { 
          transform: 'scale(1.05)',
          opacity: '0.6'
        },
      },
    },
  },
  plugins: [],
}
