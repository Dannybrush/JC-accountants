import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// The Vercel adapter needs symlinks, which Windows blocks without Developer Mode; locally we
		// only need `vite build` + `vite preview`, so it runs on Vercel's (Linux) build machines only.
		adapter: process.env.VERCEL ? adapter({ runtime: 'nodejs22.x', regions: ['lhr1'] }) : { name: 'local-preview', adapt() {} },
		prerender: {
			handleHttpError: 'fail',
			handleMissingId: 'fail'
		},
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://www.googletagmanager.com'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:', 'https://www.googletagmanager.com', 'https://*.google-analytics.com'],
				'connect-src': ['self', 'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://www.googletagmanager.com'],
				'frame-src': ['https://www.google.com'],
				'font-src': ['self'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'object-src': ['none']
			}
		}
	}
};

export default config;
