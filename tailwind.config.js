/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2A3132",
          "secondary": "#1E2761",
          "accent": "#763626",
          "neutral": "#90AFC5",
          "base-100": "#ffffff",
        },
      },
      // "dark",
      // "cupcake",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

