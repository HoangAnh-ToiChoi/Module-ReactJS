import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { fileURLToPath, URL } from "node:url";
import { copyFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Module-ReactJS/" : "/",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    {
      name: "copy-404",
      closeBundle() {
        try {
          copyFileSync("dist/index.html", "dist/404.html");
        } catch (e) {
          console.error("Failed to copy 404.html:", e);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
