import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // fungerar oavsett repo-namn på GitHub Pages
  plugins: [react()],
})
