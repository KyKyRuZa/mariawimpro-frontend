import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react({
    include: ['**/*.js', '**/*.jsx'], // Обрабатывать и .js и .jsx как JSX
  })],
  base: '/',
})