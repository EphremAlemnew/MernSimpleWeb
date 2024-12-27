import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase the size limit to 1MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Create a separate chunk for vendor libraries
          }
        },
      },
    },
  },
});
