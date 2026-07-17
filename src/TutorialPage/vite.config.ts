import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: "./TutorialPage.tsx",
      formats: ["es"],
      fileName: () => "TutorialPage.js",
    },

    outDir: "dist",

    cssCodeSplit: false,

    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
      ],
    },
  },
});
