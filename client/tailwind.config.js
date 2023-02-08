module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { 'max': '767px' },
        md: {'min': '768px', 'max': '1023px'}
      },
      keyframes: {
        "slide-from-left": {
          "0%": { transform: "translateX(-10%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-from-right": {
          "0%": { transform: "translateX(10%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        rotate: {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "loading-1": "rotate 1000ms ease infinite",
        "loading-2": "rotate 1300ms ease-in-out infinite",
        "loading-3": "rotate 1500ms ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
