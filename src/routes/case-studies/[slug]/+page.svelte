<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Info from 'lucide-svelte/icons/info';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { articleSchema, breadcrumbs } from '$lib/schema';

	let { data } = $props();
	const c = $derived(data.study);
	const crumbs = $derived([
		{ label: 'Home', href: '/' },
		{ label: 'Case studies', href: '/case-studies' },
		{ label: c.title, href: `/case-studies/${c.slug}` }
	]);
	const sections = $derived([
		{ id: 'challenge', title: 'The challenge', body: c.challenge },
		{ id: 'approach', title: 'Our approach', body: c.approach },
		{ id: 'outcome', title: 'The outcome', body: c.outcome }
	]);
</script>

<Seo
	title="{c.title} — Case Study"
	description={c.metaDescription}
	image="case-{c.slug}"
	type="article"
	schema={[breadcrumbs(crumbs), articleSchema(c.title, c.metaDescription, `/case-studies/${c.slug}`)]}
/>

<PageHero {crumbs} eyebrow="Case study · {c.sector}" title={c.title} lede={c.summary} vt="case-{c.slug}" />

<section class="results-band">
	<div class="container">
		<dl class="results">
			{#each c.results as r (r.label)}
				<div>
					<dd class="tnum">{r.value}</dd>
					<dt>{r.label}</dt>
				</div>
			{/each}
		</dl>
	</div>
</section>

<section class="section">
	<div class="container layout">
		<aside class="facts smooth">
			<dl>
				<div><dt>Client</dt><dd>{c.client}</dd></div>
				<div><dt>Location</dt><dd>{c.location}</dd></div>
				<div><dt>Service</dt><dd><a href="/services/{data.service.slug}">{data.service.title}</a></dd></div>
			</dl>
			<p class="disclaimer"><Info size={15} aria-hidden="true" /> An anonymised, illustrative example. Details have been changed to protect client confidentiality.</p>
		</aside>
		<article class="prose">
			{#each sections as s (s.id)}
				<h2 id={s.id}>{s.title}</h2>
				{#each s.body as para, i (i)}<p>{para}</p>{/each}
			{/each}
			<p class="related">
				<a href="/services/{data.service.slug}" class="link-arrow">More about {data.service.phrase} <ArrowRight size={16} aria-hidden="true" /></a>
			</p>
		</article>
	</div>
</section>

<section class="section section--cream section--tight" aria-labelledby="more-title">
	<div class="container">
		<h2 id="more-title" class="more-title">More case studies</h2>
		<ul class="more">
			{#each data.others as o (o.slug)}
				<li>
					<a href="/case-studies/{o.slug}" class="smooth">
						<span>{o.sector} · {o.location}</span>
						<strong style:view-transition-name="case-{o.slug}">{o.title}</strong>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<CtaBand />

<style>
	.results-band {
		background: var(--brand);
		color: var(--cream);
	}
	.results {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin: 0;
	}
	.results div {
		display: grid;
		gap: 0.35rem;
		padding: 2rem 1.5rem;
		border-left: 1px solid rgb(243 235 221 / 0.18);
	}
	.results div:first-child {
		border-left: 0;
		padding-left: 0;
	}
	.results dd {
		margin: 0;
		font-family: var(--font-serif);
		font-size: var(--step-3);
		line-height: 1;
	}
	.results dt {
		font-size: 0.9rem;
		color: rgb(243 235 221 / 0.75);
	}
	.layout {
		display: grid;
		grid-template-columns: 18rem 1fr;
		gap: clamp(2rem, 1rem + 4vw, 5rem);
		align-items: start;
	}
	.facts {
		--radius: var(--r-lg);
		position: sticky;
		top: calc(var(--header-h) + 1.5rem);
		display: grid;
		gap: 1.25rem;
		padding: 1.5rem;
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.facts dl {
		display: grid;
		gap: 1rem;
		margin: 0;
	}
	.facts dt {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.facts dd {
		margin: 0.2rem 0 0;
		font-weight: 500;
	}
	.facts a {
		color: var(--brand);
	}
	.disclaimer {
		display: flex;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
		font-size: 0.82rem;
		color: var(--muted);
	}
	.disclaimer :global(svg) {
		flex: none;
		margin-top: 0.2rem;
	}
	.prose {
		font-size: 1.08rem;
	}
	.prose :global(h2:first-child) {
		margin-top: 0;
	}
	.related {
		margin-top: 2rem !important;
	}
	.more-title {
		font-size: var(--step-2);
		margin-bottom: 1.5rem;
	}
	.more {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.more a {
		--radius: var(--r);
		display: grid;
		gap: 0.5rem;
		padding: 1.5rem;
		background: var(--surface);
		border: 1px solid var(--line);
		text-decoration: none;
	}
	.more a:hover {
		border-color: var(--brand);
	}
	.more span {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--brand);
	}
	.more strong {
		font-family: var(--font-serif);
		font-size: 1.25rem;
		font-weight: 500;
	}
	@media (max-width: 899px) {
		.layout,
		.more {
			grid-template-columns: 1fr;
		}
		.facts {
			position: static;
		}
		.results {
			grid-template-columns: 1fr;
		}
		.results div {
			border-left: 0;
			border-top: 1px solid rgb(243 235 221 / 0.18);
			padding-inline: 0;
		}
		.results div:first-child {
			border-top: 0;
		}
	}
</style>
