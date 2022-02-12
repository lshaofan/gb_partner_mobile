import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
const config = loadEnv("development", "./");
export default defineConfig({
  plugins: [uni()],
});
