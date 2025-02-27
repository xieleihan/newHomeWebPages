import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,// 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 才压缩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 压缩后缀名
    })
  ],
  css: {
    modules: {
      generateScopedName: '[hash:base64:6]', // CSS模块化
    }
  }
})
