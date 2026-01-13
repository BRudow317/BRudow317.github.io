import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "quickbitlabs.com",
      "www.quickbitlabs.com",
      "cloudvoyages.com",
      "www.cloudvoyages.com",
      "millerlandman.com",
      "www.millerlandman.com",
      "miller-land-management.com",
      "www.miller-land-management.com",
    ],
    // port: 6050,
    watch: {
      ignored: ['**/bin/**','**/lib/**','**/logs/**','**/node_modules/**','**/.git/**','**/build/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})