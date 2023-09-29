import react from '@vitejs/plugin-react';

export default {
  server: {
    host: true,
    port: 8080,
    strictPort: true
  },
  build: {
    emptyOutDir: true
  },
  plugins: [
    react()
  ]
}

