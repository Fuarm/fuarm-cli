import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import importCDN from "vite-plugin-cdn-import";
import { viteStaticCopy } from "vite-plugin-static-copy";

// 获取当前文件目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/vue/dist/vue.runtime.global.prod.js",
          dest: "libs"
        },
        {
          src: "node_modules/vue-router/dist/vue-router.global.prod.js",
          dest: "libs"
        }
      ]
    }),
    importCDN({
      prodUrl: "/libs/{path}",
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "vue.runtime.global.prod.js"
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "vue-router.global.prod.js"
        }
      ],
      generateScriptTag: () => ({ attrs: { ignore: true } })
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      external: ["vue", "vue-router"]
    }
  }
});
