import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";


process.env.VITE_CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_d29ya2FibGUtbWFuYXRlZS05OS5jbGVyay5hY2NvdW50cy5kZXYk';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["axios"], // Explicitly optimize axios
  },
});
