import { generateSW } from 'workbox-build';

generateSW({
  globDirectory: 'dist/',
  globPatterns: ['**/*.{css,woff2,png,svg,jpg,js}'],
  swDest: 'dist/sw.js'
});
