/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./components/**/*.html",
    "./src/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-fixed": "#ffddb9",
        "background": "#fbf9f8",
        "secondary-fixed-dim": "#f3bc7d",
        "secondary": "#7f5621",
        "inverse-primary": "#bbc7db",
        "surface": "#fbf9f8",
        "on-secondary-container": "#7a511c",
        "on-primary": "#ffffff",
        "tertiary-fixed-dim": "#ccc6bc",
        "on-background": "#1b1c1c",
        "primary-fixed": "#d7e3f8",
        "tertiary-fixed": "#e8e2d8",
        "primary-fixed-dim": "#bbc7db",
        "on-error": "#ffffff",
        "outline-variant": "#c5c6cc",
        "tertiary-container": "#2c2923",
        "primary": "#091524",
        "on-tertiary-container": "#959087",
        "on-primary-fixed-variant": "#3c4858",
        "surface-container-low": "#f5f3f3",
        "surface-container-highest": "#e4e2e2",
        "on-primary-container": "#8591a4",
        "surface-container-high": "#eae8e7",
        "on-tertiary-fixed-variant": "#4a463f",
        "inverse-on-surface": "#f2f0f0",
        "surface-container": "#efeded",
        "surface-bright": "#fbf9f8",
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "on-secondary-fixed": "#2b1700",
        "on-error-container": "#93000a",
        "on-secondary": "#ffffff",
        "on-surface-variant": "#44474c",
        "outline": "#75777d",
        "inverse-surface": "#303030",
        "surface-tint": "#535f70",
        "secondary-container": "#ffc788",
        "surface-variant": "#e4e2e2",
        "on-tertiary-fixed": "#1e1b15",
        "tertiary": "#17150f",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#101c2b",
        "primary-container": "#1e2a39",
        "surface-dim": "#dbd9d9",
        "error-container": "#ffdad6",
        "on-surface": "#1b1c1c",
        "on-secondary-fixed-variant": "#643f0a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-desktop": "80px",
        "container-max": "1280px",
        "unit": "8px",
        "margin-mobile": "20px",
        "gutter": "24px"
      },
      fontFamily: {
        "display-lg": ["Gloock", "serif"],
        "label-md": ["Manrope", "sans-serif"],
        "headline-lg-mobile": ["Gloock", "serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["Gloock", "serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }]
      }
    }
  },
  plugins: []
};
