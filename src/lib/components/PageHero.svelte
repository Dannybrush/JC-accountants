<script lang="ts">
	import type { Snippet } from 'svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import type { Crumb } from '$lib/schema';

	type Props = {
		crumbs: Crumb[];
		eyebrow: string;
		title: string;
		lede?: string;
		/** Shared view-transition name so a card title can morph into this heading */
		vt?: string;
		children?: Snippet;
		aside?: Snippet;
	};

	let { crumbs, eyebrow, title, lede, vt, children, aside }: Props = $props();
</script>

<section class="hero" class:has-aside={aside}>
	<div class="container">
		<Breadcrumbs {crumbs} />
		<div class="grid">
			<div class="copy">
				<span class="eyebrow">{eyebrow}</span>
				<h1 style:view-transition-name={vt}>{title}</h1>
				{#if lede}<p class="lede">{lede}</p>{/if}
				{#if children}<div class="actions">{@render children()}</div>{/if}
			</div>
			{#if aside}<div class="aside">{@render aside()}</div>{/if}
		</div>
	</div>
</section>

<style>
	.hero {
		padding-block: clamp(1.5rem, 1rem + 2vw, 2.5rem) clamp(3rem, 2rem + 4vw, 5.5rem);
		border-bottom: 1px solid var(--line);
		background:
			radial-gradient(ellipse 60% 80% at 100% 0%, rgb(91 20 24 / 0.06), transparent 70%),
			var(--paper);
	}
	.grid {
		display: grid;
		gap: 2.5rem;
		margin-top: clamp(2rem, 1.5rem + 2vw, 3.5rem);
	}
	.has-aside .grid {
		grid-template-columns: 1.4fr 1fr;
		align-items: end;
	}
	.copy {
		display: grid;
		gap: 1.25rem;
		max-width: 50rem;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
	@media (max-width: 899px) {
		.has-aside .grid {
			grid-template-columns: 1fr;
		}
	}
</style>
