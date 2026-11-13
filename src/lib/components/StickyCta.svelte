<script lang="ts">
	import { page } from '$app/state';
	import Phone from 'lucide-svelte/icons/phone';
	import { site } from '$lib/site';
	import { trackEvent } from '$lib/state/consent.svelte';

	// Hidden where it would duplicate the page's own primary action
	const hidden = $derived(page.url.pathname.startsWith('/contact') || page.status >= 400);

	// Let fixed UI (toasts, consent banner) sit above the bar only while it is shown
	$effect(() => {
		document.documentElement.classList.toggle('has-sticky-cta', !hidden);
	});
</script>

{#if !hidden}
	<div class="spacer" aria-hidden="true"></div>
	<div class="sticky-cta" role="region" aria-label="Quick contact">
		<a href={site.phone.href} class="btn btn--ghost" onclick={() => trackEvent('click_call', { location: 'sticky' })}>
			<Phone size={18} aria-hidden="true" /> Call
		</a>
		<a href="/contact#enquiry" class="btn btn--primary">Send an enquiry</a>
	</div>
{/if}

<style>
	.sticky-cta,
	.spacer {
		display: none;
	}
	@media (max-width: 1023px) {
		:global(html.has-sticky-cta) {
			--sticky-cta-h: calc(72px + var(--safe-bottom));
		}
		.spacer {
			display: block;
			height: calc(72px + var(--safe-bottom));
		}
		.sticky-cta {
			position: fixed;
			z-index: 40;
			inset: auto 0 0;
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 0.5rem;
			padding: 0.75rem max(1rem, var(--safe-right)) calc(0.75rem + var(--safe-bottom)) max(1rem, var(--safe-left));
			background: rgb(251 248 243 / 0.92);
			backdrop-filter: blur(14px);
			-webkit-backdrop-filter: blur(14px);
			border-top: 1px solid var(--line);
		}
		.btn--ghost {
			background: var(--surface);
			padding-inline: 1.1rem;
		}
	}
</style>
