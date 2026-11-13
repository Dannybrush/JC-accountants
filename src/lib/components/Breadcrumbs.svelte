<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import type { Crumb } from '$lib/schema';

	let { crumbs, tone = 'default' }: { crumbs: Crumb[]; tone?: 'default' | 'light' } = $props();
</script>

<nav aria-label="Breadcrumb" class="crumbs {tone}">
	<ol>
		{#each crumbs as crumb, i (crumb.href)}
			<li>
				{#if i < crumbs.length - 1}
					<a href={crumb.href}>{crumb.label}</a>
					<ChevronRight size={14} aria-hidden="true" />
				{:else}
					<span aria-current="page">{crumb.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	ol {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.15rem 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--step--1);
		color: var(--muted);
	}
	li {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}
	a {
		display: inline-flex;
		align-items: center;
		min-height: 32px;
		color: inherit;
		text-decoration: none;
	}
	a:hover {
		color: var(--brand);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	[aria-current] {
		color: var(--ink);
		font-weight: 500;
	}
	.light ol {
		color: rgb(243 235 221 / 0.7);
	}
	.light a:hover,
	.light [aria-current] {
		color: var(--cream);
	}
</style>
