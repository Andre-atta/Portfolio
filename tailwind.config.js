/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        text: "var(--text)",
      },
      keyframes: {
        // Cascade animations
        cascade: {
          '0%': { transform: 'translateY(0)', opacity: '0.4' },
          '100%': { transform: 'translateY(120px)', opacity: '0' },
        },
        cascadeSlow: {
          '0%': { transform: 'translateY(0)', opacity: '0.6' },
          '100%': { transform: 'translateY(80px)', opacity: '0.05' },
        },
        // Float animation (per modal)
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        // Scan line effect (per modal)
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        cascade: 'cascade 6s linear infinite',
        'cascade-slow': 'cascadeSlow 10s linear infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
      },
    },
  },
  plugins: [],
};
