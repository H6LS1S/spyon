import tailwindcss from '@tailwindcss/vite';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { router } from 'sv-router/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';

import * as path from 'path';

const define = {
	__RELEASES_URL__: `https://github.com/H6LS1S/spyon/releases/tag/v${process.env.npm_package_version}`,
	__APP_DESC__: `A simple offline Spyfall-style party game for passing around a single device`,
	__APP_VERSION__: process.env.npm_package_version || '',
	__APP_NAME__: process.env.npm_package_name || '',
	__BASE_PATH__: process.env.BASE_PATH || '',
};

// https://vitejs.dev/config/
export default defineConfig({
	base: define.__BASE_PATH__,

	define: Object.fromEntries(
		Object.entries(define).map(([key, value]) => [key, JSON.stringify(value)]),
	),

	server: {
		host: '0.0.0.0',
		port: 3000,
	},

	plugins: [
		tailwindcss(),
		svelte(),
		router(),
		{
			name: 'html-transform',
			transformIndexHtml(html) {
				return html
					.replace(/__APP_NAME__/g, define.__APP_NAME__)
					.replace(/__APP_DESC__/g, define.__APP_DESC__);
			},
		},
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			pwaAssets: { disabled: false, config: true },
			manifest: {
				id: define.__BASE_PATH__,
				display: 'standalone',
				scope: define.__BASE_PATH__,
				start_url: define.__BASE_PATH__,
				name: define.__APP_NAME__,
				short_name: define.__APP_NAME__,
				description: define.__APP_DESC__,
				background_color: '#0a0a0a',
				theme_color: '#0a0a0a',
				screenshots: [
					{
						src: 'screenshots/desktop.png',
						sizes: '1280x800',
						type: 'image/png',
						form_factor: 'wide',
					},
					{
						src: 'screenshots/mobile.png',
						sizes: '780x1398',
						type: 'image/png',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
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
