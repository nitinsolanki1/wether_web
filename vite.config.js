import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/wether_web/', // Replace 'your-repo-name' with your GitHub repo name
});
