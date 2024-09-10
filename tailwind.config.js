/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Path to your content files
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular"],  // Custom font family
      },
      // Custom colors, spacing, etc., can be added here if needed.
    },
    screens: {
      sm: '640px',   // Small screens (mobile)
      md: '768px',   // Medium screens (tablets)
      lg: '1024px',  // Large screens (laptops)
      xl: '1280px',  // Extra large screens (desktops)
      '2xl': '1536px', // Very large screens
      '3xl': '1920px', // Custom large screens (ultra-wide desktops)
    },
  },
  plugins: [
    require("daisyui"),  // DaisyUI plugin integration
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
