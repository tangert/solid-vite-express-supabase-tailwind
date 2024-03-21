import { defineConfig } from "vite";
import { vavite } from "vavite";
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
	buildSteps: [
		{
			name: "client",
			config: {
				build: {
					outDir: "dist/client",
					manifest: true,
					rollupOptions: { input: "client/index.tsx" },
				},
			},
		},
		{
			name: "server",
			config: {
				build: {
					outDir: "dist/server",
				},
			},
		},
	],

	plugins: [
    solidPlugin(),
		vavite({
			serverEntry: "/server/index.ts",
			serveClientAssetsInDev: true,
			// Don't reload when dynamically imported dependencies change
			reloadOn: "static-deps-change",
		}),
	],
});
