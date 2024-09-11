import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as  fs from 'fs';

import commonjs from '@rollup/plugin-commonjs';
// import crossOriginPolicy from 'vite-plugin-cross-origin-policy';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    vue(),
    vueJsx(),
    commonjs(),
    // crossOriginPolicy({
    //   policy: 'require-corp',
    // }),

  ],
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util']
  },
  server: {
    // https: {
    //   key: fs.readFileSync('./key.pem'),
    //   cert: fs.readFileSync('./cert.pem'),
      
    // },
    headers:{
      'Cross-Origin-Opener-Policy': 'same-origin',// 加这四行代码 
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    host:'0.0.0.0',
  },
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
