<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Check from 'lucide-svelte/icons/check';
	import X from 'lucide-svelte/icons/x';
	import { dismiss, hold, release, toasts } from '$lib/state/toasts.svelte';
</script>

<!-- Polite live region so screen readers announce toasts without interrupting -->
<section class="toaster" aria-live="polite" aria-label="Notifications">
	{#each toasts as t (t.id)}
		<div
			class="toast smooth"
			role="status"
			animate:flip={{ duration: 250 }}
			in:fly={{ y: 16, duration: 300 }}
			out:fly={{ y: 8, duration: 180 }}
			onpointerenter={() => hold(t.id)}
			onpointerleave={() => release(t.id)}
			onfocusin={() => hold(t.id)}
			onfocusout={() => release(t.id)}
		>
			{#if t.tone === 'success'}<Check size={18} class="ok" aria-hidden="true" />{/if}
			<p>{t.message}</p>
			{#if t.undo}
				<button
					class="undo"
					onclick={() => {
						t.undo?.();
						dismiss(t.id);
					}}>Undo</button
				>
			{/if}
			<button class="close" aria-label="Dismiss notification" onclick={() => dismiss(t.id)}><X size={16} /></button>
		</div>
	{/each}
</section>

<style>
	.toaster {
		position: fixed;
		z-index: 200;
		left: 50%;
		bottom: calc(1rem + var(--safe-bottom) + var(--sticky-cta-h, 0px));
		translate: -50% 0;
		display: grid;
		gap: 0.5rem;
		width: min(440px, calc(100vw - 2rem));
		pointer-events: none;
	}
	.toast {
		--radius: 14px;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.4rem 0.4rem 1rem;
		background: var(--ink);
		color: var(--cream);
		box-shadow: var(--shadow-lg);
		pointer-events: auto;
	}
	p {
		flex: 1;
		padding-block: 0.6rem;
		font-size: 0.93rem;
		line-height: 1.4;
	}
	.toast :global(.ok) {
		flex: none;
		color: #8fd0a5;
	}
	button {
		flex: none;
		display: grid;
		place-items: center;
		min-width: 44px;
		min-height: 44px;
		border: 0;
		border-radius: 10px;
		background: none;
		color: inherit;
		cursor: pointer;
	}
	.undo {
		padding: 0 0.9rem;
		font-weight: 600;
		color: #f0c9a8;
	}
	button:hover {
		background: rgb(255 255 255 / 0.08);
	}
	.close {
		opacity: 0.6;
	}
</style>
