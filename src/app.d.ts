/// <reference types="vite/client" />
// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		interface PageState {
			sheet?: 'menu' | 'search';
		}
	}
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
	const __BUILD_TIME__: number;
	interface ImportMetaEnv {
		readonly PUBLIC_GA_ID?: string;
	}
}

export {};
