<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/state';
	import type { Faq } from '$lib/content/faqs';

	let { faqs }: { faqs: Faq[] } = $props();

	// Open the question targeted by the URL hash (e.g. from the command menu)
	$effect(() => {
		const hash = page.url.hash.slice(1);
		if (!hash.startsWith('faq-')) return;
		const el = document.getElementById(hash);
		if (el instanceof HTMLDetailsElement) {
			el.open = true;
			el.scrollIntoView({ block: 'center' });
		}
	});
</script>

<div class="faqs">
	{#each faqs as faq (faq.id)}
		<details id="faq-{faq.id}">
			<summary>
				<h3>{faq.question}</h3>
				<span class="icon" aria-hidden="true"><Plus size={20} /></span>
			</summary>
			<div class="answer"><p>{faq.answer}</p></div>
		</details>
	{/each}
</div>

<style>
	.faqs {
		border-top: 1px solid var(--line-strong);
	}
	details {
		border-bottom: 1px solid var(--line-strong);
		interpolate-size: allow-keywords;
	}
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		min-height: 72px;
		padding-block: 1.1rem;
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	h3 {
		font-size: var(--step-1);
	}
	summary:hover h3 {
		color: var(--brand);
	}
	.icon {
		flex: none;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		color: var(--brand);
		transition:
			transform 0.3s var(--ease-out),
			background-color 0.2s;
	}
	details[open] .icon {
		transform: rotate(45deg);
		background: var(--brand);
		border-color: var(--brand);
		color: var(--cream);
	}
	/* Animate open/close height where supported (::details-content); otherwise it just snaps */
	details::details-content {
		block-size: 0;
		overflow: hidden;
		transition:
			block-size 0.35s var(--ease-out),
			content-visibility 0.35s allow-discrete;
	}
	details[open]::details-content {
		block-size: auto;
	}
	.answer {
		padding-bottom: 1.5rem;
		max-width: 46rem;
		color: var(--ink-2);
	}
</style>
