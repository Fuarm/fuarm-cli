import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
