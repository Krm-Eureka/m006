/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"  // Path to your content files
  ],
  theme: {
    extend: {},
    fontFamily: {
      mono: ["ui-monospace", "SFMono-Regular"],  // Custom font family
    },
  },
  plugins: [
    require("daisyui")  // DaisyUI plugin integration
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "fantasy"],  // Available themes
    darkTheme: "dark",  // Default dark theme
    base: true,  // Base styles
    styled: true,  // Styled components
    utils: true,  // Utility classes
    prefix: "",  // Optional prefix for DaisyUI classes
    logs: true,  // Enable logging for DaisyUI
    themeRoot: ":root",  // Theme root element
  },
};
