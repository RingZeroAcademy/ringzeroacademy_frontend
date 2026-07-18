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

    // 'temp' directory in the repository root.
    outDir: "../../temp",

    cssCodeSplit: false,

    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
      ],
    },
  },
});
