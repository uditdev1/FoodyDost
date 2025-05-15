import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from "vite-plugin-glsl";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , glsl(),  nodePolyfills()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the limit to a more suitable size
  }
})