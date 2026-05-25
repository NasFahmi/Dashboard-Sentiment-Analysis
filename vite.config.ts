import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_BASE_URL || "https://backend.sentinela.my.id";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      allowedHosts: [".ngrok-free.app"],
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        },
      },
    },
    preview: {
      allowedHosts: [".ngrok-free.app"],
    },
  };
});
