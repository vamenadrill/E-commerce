import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // مهم جداً علشان GitHub Pages يلاقي الملفات
  // غيّر "e-commerce" لاسم الـ repo بتاعك لو مختلف
  base: "/e-commerce/",
});
