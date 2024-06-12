import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import {resolve}from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({ imports: ["vue", "vue-router"] }), // 配置vue、vue-router的API自动加载
  ],
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname,'src')
      }
    ]
  },
  // 加入下面一行
  assetsInclude: ["**/*.hdr", "**/*.glb"],
})
