/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        text: "var(--text)",
      },
      keyframes: {
        cascade: {
          '0%': { transform: 'translateY(0)', opacity: '0.4' },
          '100%': { transform: 'translateY(120px)', opacity: '0' },
        },
        cascadeSlow: {
          '0%': { transform: 'translateY(0)', opacity: '0.6' },
          '100%': { transform: 'translateY(80px)', opacity: '0.05' },
        },
      },
      animation: {
        cascade: 'cascade 6s linear infinite',
        'cascade-slow': 'cascadeSlow 10s linear infinite',
      },
    },
  },
  plugins: [],
};
