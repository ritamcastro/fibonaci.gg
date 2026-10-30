import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: ".",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	use: {
		baseURL: "http://127.0.0.1:4173",
		trace: "retain-on-failure",
	},
	projects: [
		{ name: "desktop-chrome", use: { ...devices["Desktop Chrome"] } },
		{ name: "desktop-safari", use: { ...devices["Desktop Safari"] } },
		{ name: "iphone", use: { ...devices["iPhone 13"] } },
		{ name: "pixel", use: { ...devices["Pixel 7"] } },
	],
	webServer: {
		command: "npm --prefix ../frontend run local -- --host 127.0.0.1 --port 4173 --strictPort",
		url: "http://127.0.0.1:4173",
		reuseExistingServer: !process.env.CI,
	},
});
