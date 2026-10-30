import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitest.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		include: ["src/**/*.test.{ts,tsx}"],
		setupFiles: ["./vitest.setup.ts"],
		environment: "happy-dom",
		globals: true,
	},
});
