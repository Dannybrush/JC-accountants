<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource-variable/source-serif-4';
	import '../app.css';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import CommandMenu from '$lib/components/CommandMenu.svelte';
	import StickyCta from '$lib/components/StickyCta.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import ConsentBanner from '$lib/components/ConsentBanner.svelte';
	import { loadConsent, trackPageView } from '$lib/state/consent.svelte';

	let { children } = $props();

	$effect(() => loadConsent());

	// Cross-fade between pages with the View Transitions API where supported
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		// Shallow sheet state changes and same-page hash jumps don't need a page transition
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate(({ to }) => {
		if (to) trackPageView(to.url.pathname, document.title);
	});
</script>

<a href="#main" class="skip">Skip to content</a>
<Header />
<main id="main" tabindex="-1">
	{@render children()}
</main>
<Footer />
<StickyCta />
<MobileMenu />
<CommandMenu />
<ConsentBanner />
<Toaster />

<style>
	.skip {
		position: fixed;
		z-index: 300;
		top: calc(0.75rem + var(--safe-top));
		left: 0.75rem;
		padding: 0.75rem 1.25rem;
		border-radius: 10px;
		background: var(--ink);
		color: var(--cream);
		font-weight: 600;
		transform: translateY(-200%);
		transition: transform 0.2s;
	}
	.skip:focus {
		transform: none;
	}
	main {
		view-transition-name: main;
		outline: none;
	}
</style>
