<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { caseStudies } from '$lib/content/case-studies';
	import { breadcrumbs } from '$lib/schema';

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Case studies', href: '/case-studies' }
	];
</script>

<Seo
	title="Case Studies"
	description="Anonymised examples of how J&C Accountants helps landlords, retailers and contractors with Making Tax Digital, bookkeeping, VAT and year-end accounts."
	image="case-studies"
	schema={[breadcrumbs(crumbs)]}
/>

<PageHero
	{crumbs}
	eyebrow="Case studies"
	title="The difference good accounting makes."
	lede="Anonymised examples of the problems clients bring to us and how we solve them. Details are illustrative and shared without identifying anyone."
/>

<section class="section">
	<div class="container">
		<ul class="list">
			{#each caseStudies as c (c.slug)}
				<li>
					<a href="/case-studies/{c.slug}" class="item">
						<div class="meta">
							<span>{c.sector}</span>
							<span>{c.location}</span>
						</div>
						<div class="copy">
							<h2 style:view-transition-name="case-{c.slug}">{c.title}</h2>
							<p>{c.summary}</p>
						</div>
						<dl>
							{#each c.results.slice(0, 2) as r (r.label)}
								<div><dd class="tnum">{r.value}</dd><dt>{r.label}</dt></div>
							{/each}
						</dl>
						<ArrowRight size={22} aria-hidden="true" class="arrow" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<CtaBand title="Could we do the same for you?" />

<style>
	.list {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid var(--line-strong);
	}
	.item {
		display: grid;
		grid-template-columns: 10rem 1fr 15rem 2rem;
		gap: 2rem;
		align-items: start;
		padding-block: 2.5rem;
		border-bottom: 1px solid var(--line-strong);
		text-decoration: none;
	}
	.meta {
		display: grid;
		gap: 0.25rem;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--brand);
	}
	.meta span + span {
		color: var(--muted);
	}
	.copy {
		display: grid;
		gap: 0.75rem;
	}
	h2 {
		font-size: var(--step-3);
		transition: color 0.2s;
	}
	.item:hover h2 {
		color: var(--brand);
	}
	.copy p {
		color: var(--ink-2);
		max-width: 40rem;
	}
	dl {
		display: grid;
		gap: 1rem;
		margin: 0;
	}
	dd {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.75rem;
		line-height: 1;
		color: var(--brand);
	}
	dt {
		font-size: 0.85rem;
		color: var(--muted);
	}
	.item :global(.arrow) {
		color: var(--brand);
		transition: transform 0.25s var(--ease-out);
	}
	.item:hover :global(.arrow) {
		transform: translateX(4px);
	}
	@media (max-width: 1023px) {
		.item {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		.meta {
			display: flex;
			gap: 1rem;
		}
		dl {
			grid-template-columns: 1fr 1fr;
		}
		.item :global(.arrow) {
			display: none;
		}
	}
</style>
