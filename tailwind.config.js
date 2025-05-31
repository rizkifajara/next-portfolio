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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'blob-infinite': 'blob 7s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin 15s linear infinite reverse',
        'float': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ping-slow': 'ping 4s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'rotate-arc': 'rotateArc 8s linear infinite',
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite',
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
        rotateArc: {
          '0%': { 
            transform: 'rotate(0deg)',
            opacity: '0.3'
          },
          '50%': { 
            opacity: '0.8'
          },
          '100%': { 
            transform: 'rotate(360deg)',
            opacity: '0.3'
          },
        },
        fadeInOut: {
          '0%, 100%': { 
            opacity: '0.2'
          },
          '50%': { 
            opacity: '0.8'
          },
        },
      },
    },
  },
  plugins: [],
}
