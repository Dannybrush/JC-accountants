<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Check from 'lucide-svelte/icons/check';
	import Phone from 'lucide-svelte/icons/phone';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import MapCard from '$lib/components/MapCard.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { services } from '$lib/content/services';
	import { site } from '$lib/site';
	import { breadcrumbs, localBusiness } from '$lib/schema';

	let { data } = $props();
	const a = $derived(data.area);
	const crumbs = $derived([
		{ label: 'Home', href: '/' },
		{ label: 'Where we work', href: '/areas' },
		{ label: a.name, href: `/areas/${a.slug}` }
	]);
</script>

<Seo title={a.title} description={a.metaDescription} image="area-{a.slug}" schema={[breadcrumbs(crumbs), localBusiness()]} />

<PageHero {crumbs} eyebrow={a.name} title={a.headline} lede={a.intro[0]}>
	<a href="/contact#enquiry" class="btn btn--primary btn--lg">Send an enquiry</a>
	<a href={site.phone.href} class="btn btn--ghost btn--lg tnum"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
</PageHero>

<section class="section">
	<div class="container split">
		<div class="prose">
			{#each a.intro.slice(1) as para, i (i)}<p>{para}</p>{/each}
			<p><strong>How we work with you:</strong> {a.howWeWork}</p>
		</div>
		<div class="places smooth">
			<h2>Clients in and around</h2>
			<ul>
				{#each a.places as p (p)}<li><Check size={16} aria-hidden="true" /> {p}</li>{/each}
			</ul>
		</div>
	</div>
</section>

<section class="section section--cream" aria-labelledby="svc-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Services in {a.name}</span>
			<h2 id="svc-title">What we do for {a.name} clients.</h2>
		</div>
		<ul class="svc">
			{#each services as s (s.slug)}
				<li>
					<a href="/services/{s.slug}" class="smooth">
						<h3>{s.title}</h3>
						<p>{s.summary}</p>
						<span class="link-arrow">Learn more <ArrowRight size={16} aria-hidden="true" /></span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

{#if data.caseStudy}
	{@const c = data.caseStudy}
	<section class="section section--tight">
		<div class="container">
			<a href="/case-studies/{c.slug}" class="case smooth">
				<span class="eyebrow">Case study · {c.location}</span>
				<h2 style:view-transition-name="case-{c.slug}">{c.title}</h2>
				<p>{c.summary}</p>
				<span class="link-arrow">Read the case study <ArrowRight size={18} aria-hidden="true" /></span>
			</a>
		</div>
	</section>
{/if}

{#if a.slug === 'berkshire'}
	<section class="section section--tight">
		<div class="container"><MapCard /></div>
	</section>
{/if}

<section class="section section--tight">
	<div class="container others">
		<h2>Also serving</h2>
		{#each data.others as o (o.slug)}<a href="/areas/{o.slug}" class="link-arrow">{o.name} <ArrowRight size={16} aria-hidden="true" /></a>{/each}
		<a href="/areas" class="link-arrow">Clients across the UK <ArrowRight size={16} aria-hidden="true" /></a>
	</div>
</section>

<CtaBand title="Accountants for {a.name}, ready when you are." />

<style>
	.split {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 3rem;
		align-items: start;
	}
	.prose {
		font-size: var(--step-1);
	}
	.places {
		--radius: var(--r-lg);
		padding: 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.places h2 {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
		margin-bottom: 1rem;
	}
	.places ul {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.places li {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}
	.places :global(svg) {
		color: var(--brand);
	}
	.svc {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.svc a {
		--radius: var(--r);
		display: grid;
		gap: 0.6rem;
		height: 100%;
		padding: 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
		text-decoration: none;
	}
	.svc a:hover {
		border-color: var(--brand);
	}
	.svc p {
		color: var(--ink-2);
		font-size: 0.95rem;
	}
	.case {
		--radius: var(--r-lg);
		display: grid;
		gap: 1rem;
		justify-items: start;
		padding: clamp(1.75rem, 1rem + 3vw, 3rem);
		border: 1px solid var(--line);
		background: var(--surface);
		text-decoration: none;
	}
	.case p {
		max-width: 44rem;
		color: var(--ink-2);
	}
	.others {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 2rem;
	}
	.others h2 {
		font-size: var(--step-1);
	}
	@media (max-width: 899px) {
		.split {
			grid-template-columns: 1fr;
		}
	}
</style>
