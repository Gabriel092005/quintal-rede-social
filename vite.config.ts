import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    
  },
  build:{
    chunkSizeWarningLimit: 2000,
    outDir: '../api/public' // <-- vai gerar direto no backend

  }
})
