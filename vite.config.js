import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  root: 'src/',

  publicDir: resolve(__dirname, 'src/public'),

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        head: resolve(__dirname, 'src/components/head.html'),
        hearder: resolve(__dirname, 'src/components/header.html'),
        mav: resolve(__dirname, 'src/components/nav.html'),
        // main_content: resolve(__dirname, 'src/components/contact.html'),
        footer: resolve(__dirname, 'src/components/footer.html'),
        contact: resolve(__dirname, 'src/contact/contact.html'),


      },
    },
  },
});
