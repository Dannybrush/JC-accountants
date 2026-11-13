<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Check from 'lucide-svelte/icons/check';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { services } from '$lib/content/services';
	import { breadcrumbs, serviceSchema } from '$lib/schema';

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Services', href: '/services' }
	];
</script>

<Seo
	title="Accountancy Services"
	description="Accounts and tax returns, bookkeeping and VAT, Making Tax Digital, company formations and business advice for UK limited companies, sole traders, landlords and contractors."
	image="services"
	schema={[breadcrumbs(crumbs), ...services.map((s) => serviceSchema(s.title, s.summary, `/services/${s.slug}`))]}
/>

<PageHero
	{crumbs}
	eyebrow="Services"
	title="Accountancy that keeps you compliant and in control."
	lede="Four core services, delivered by one team that knows your business. Choose one, or let us take care of everything."
>
	<a href="/contact#enquiry" class="btn btn--primary btn--lg">Discuss what you need</a>
</PageHero>

<section class="section">
	<div class="container list">
		{#each services as s, i (s.slug)}
			<article class="row">
				<span class="num tnum">0{i + 1}</span>
				<div class="main">
					<h2><a href="/services/{s.slug}">{s.title}</a></h2>
					<p>{s.summary}</p>
					<p class="for">Ideal for {s.forWhom.join(' · ')}</p>
				</div>
				<ul class="includes">
					{#each s.includes.slice(0, 4) as item (item.title)}
						<li><Check size={16} aria-hidden="true" /> {item.title}</li>
					{/each}
				</ul>
				<a href="/services/{s.slug}" class="btn btn--ghost go" aria-label="Learn more about {s.title}">
					Learn more <ArrowRight size={16} aria-hidden="true" />
				</a>
			</article>
		{/each}
	</div>
</section>

<CtaBand title="Not sure what you need?" text="Tell us about your situation and we will recommend the right mix of services — and confirm the fee in writing before we start." />

<style>
	.list {
		display: grid;
	}
	.row {
		display: grid;
		grid-template-columns: 4rem 1.4fr 1fr auto;
		gap: 1.5rem 2.5rem;
		align-items: start;
		padding-block: clamp(2rem, 1.5rem + 2vw, 3rem);
		border-top: 1px solid var(--line-strong);
	}
	.row:last-child {
		border-bottom: 1px solid var(--line-strong);
	}
	.num {
		font-family: var(--font-serif);
		font-size: 1.5rem;
		color: var(--brand);
	}
	.main {
		display: grid;
		gap: 0.75rem;
	}
	h2 {
		font-size: var(--step-3);
	}
	h2 a {
		text-decoration: none;
	}
	h2 a:hover {
		color: var(--brand);
	}
	.main p {
		color: var(--ink-2);
		max-width: 34rem;
	}
	.for {
		font-size: 0.9rem;
		color: var(--muted) !important;
	}
	.includes {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding: 0.5rem 0 0;
		list-style: none;
		font-size: 0.95rem;
		color: var(--ink-2);
	}
	.includes li {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.includes :global(svg) {
		color: var(--brand);
		flex: none;
	}
	@media (max-width: 1023px) {
		.row {
			grid-template-columns: 3rem 1fr;
		}
		.includes,
		.go {
			grid-column: 2;
		}
		.go {
			justify-self: start;
		}
	}
	@media (max-width: 599px) {
		.row {
			grid-template-columns: 1fr;
		}
		.includes,
		.go {
			grid-column: 1;
		}
	}
</style>
