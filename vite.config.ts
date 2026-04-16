import tailwindcss from '@tailwindcss/vite';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { router } from 'sv-router/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.BASE_PATH,

	server: {
		port: 3000,
	},

	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__APP_NAME__: JSON.stringify(process.env.npm_package_name),
		__BASE_PATH__: JSON.stringify(process.env.BASE_PATH),
	},

	plugins: [
		tailwindcss(),
		svelte(),
		router(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			pwaAssets: { disabled: false, config: true },
			manifest: {
				display: 'standalone',
				scope: process.env.BASE_PATH,
				start_url: process.env.BASE_PATH,
				name: process.env.npm_package_name,
				short_name: process.env.npm_package_name,
				description: process.env.npm_package_description,
				theme_color: '#0a0a0a',
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},
			devOptions: {
				enabled: false,
				navigateFallback: path.join(process.env.BASE_PATH || '', 'index.html'),
				suppressWarnings: true,
				type: 'module',
			},
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'sv-router/generated': path.resolve(__dirname, './.router/router'),
		},
	},
});
