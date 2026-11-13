<script lang="ts">
	import { fly } from 'svelte/transition';
	import { analyticsEnabled, consent, setConsent } from '$lib/state/consent.svelte';
	import { toast } from '$lib/state/toasts.svelte';

	let ready = $state(false);
	$effect(() => {
		ready = true;
	});

	const visible = $derived(ready && analyticsEnabled() && (consent.analytics === null || consent.settingsOpen));

	function choose(choice: 'granted' | 'denied') {
		const previous = consent.analytics;
		setConsent(choice);
		toast(choice === 'granted' ? 'Analytics cookies allowed' : 'Analytics cookies declined', {
			undo: () => (previous ? setConsent(previous) : ((consent.analytics = null), (consent.settingsOpen = true)))
		});
	}
</script>

{#if visible}
	<div class="banner smooth" role="region" aria-label="Cookie preferences" transition:fly={{ y: 24, duration: 300 }}>
		<p>
			We use optional analytics cookies to understand how the site is used. They are only set if you allow them.
			<a href="/privacy#cookies">Read our cookie policy</a>.
		</p>
		<div class="buttons">
			<button class="btn btn--ghost" onclick={() => choose('denied')}>Decline</button>
			<button class="btn btn--primary" onclick={() => choose('granted')}>Allow analytics</button>
		</div>
	</div>
{/if}

<style>
	.banner {
		--radius: var(--r-lg);
		position: fixed;
		z-index: 90;
		left: max(1rem, var(--safe-left));
		bottom: calc(1rem + var(--safe-bottom) + var(--sticky-cta-h, 0px));
		width: min(420px, calc(100vw - 2rem));
		display: grid;
		gap: 1rem;
		padding: 1.25rem;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-lg);
		font-size: 0.92rem;
		color: var(--ink-2);
	}
	a {
		color: var(--brand);
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}
</style>
