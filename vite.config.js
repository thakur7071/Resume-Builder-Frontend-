import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use the path module directly with `import` (ensure compatibility in the Vite environment)
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),  // Use resolve() instead of path.resolve()
    },
  },
});
