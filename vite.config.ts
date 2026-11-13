import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Expose PUBLIC_* as import.meta.env so optional values (e.g. PUBLIC_GA_ID) can be absent at build time
	envPrefix: ['VITE_', 'PUBLIC_'],
	// Lets pre-rendered, time-dependent UI hydrate with the same values it was rendered with
	define: { __BUILD_TIME__: JSON.stringify(Date.now()) }
});
