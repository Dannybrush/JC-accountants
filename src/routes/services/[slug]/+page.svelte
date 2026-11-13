<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Check from 'lucide-svelte/icons/check';
	import Clock from 'lucide-svelte/icons/clock';
	import Phone from 'lucide-svelte/icons/phone';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import FaqList from '$lib/components/FaqList.svelte';
	import { faqs } from '$lib/content/faqs';
	import { site } from '$lib/site';
	import { breadcrumbs, faqPage, serviceSchema } from '$lib/schema';

	let { data } = $props();
	const s = $derived(data.service);
	const crumbs = $derived([
		{ label: 'Home', href: '/' },
		{ label: 'Services', href: '/services' },
		{ label: s.title, href: `/services/${s.slug}` }
	]);
	// Each service page shows the FAQs most relevant to it
	const pageFaqs = $derived(s.slug === 'making-tax-digital' ? faqs.filter((f) => ['mtd', 'switching', 'fees'].includes(f.id)) : faqs.filter((f) => ['switching', 'fees', 'location'].includes(f.id)));
</script>

<Seo
	title={s.title}
	description={s.metaDescription}
	image="service-{s.slug}"
	schema={[breadcrumbs(crumbs), serviceSchema(s.title, s.metaDescription, `/services/${s.slug}`), faqPage(pageFaqs)]}
/>

<PageHero {crumbs} eyebrow={s.title} title={s.headline} lede={s.summary}>
	<a href="/contact?service={s.slug}#enquiry" class="btn btn--primary btn--lg">Enquire about {s.phrase}</a>
	<a href={site.phone.href} class="btn btn--ghost btn--lg tnum"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
	{#snippet aside()}
		<div class="aside-card smooth">
			<h2>Ideal for</h2>
			<ul>
				{#each s.forWhom as who (who)}<li><Check size={16} aria-hidden="true" /> {who}</li>{/each}
			</ul>
			<p class="outcome">{s.outcome}</p>
			<p class="promise"><Clock size={15} aria-hidden="true" /> {site.responsePromise.short}</p>
		</div>
	{/snippet}
</PageHero>

<section class="section">
	<div class="container body">
		<div class="prose">
			{#each s.intro as para, i (i)}<p class:first={i === 0}>{para}</p>{/each}
		</div>
	</div>
</section>

<section class="section section--cream" aria-labelledby="includes-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">What’s included</span>
			<h2 id="includes-title">How we help with {s.phrase}.</h2>
		</div>
		<ul class="includes">
			{#each s.includes as item (item.title)}
				<li class="smooth">
					<h3>{item.title}</h3>
					<p>{item.detail}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

{#if data.caseStudy}
	{@const c = data.caseStudy}
	<section class="section" aria-labelledby="case-title">
		<div class="container">
			<a href="/case-studies/{c.slug}" class="feature smooth">
				<div>
					<span class="eyebrow">Case study · {c.location}</span>
					<h2 id="case-title" style:view-transition-name="case-{c.slug}">{c.title}</h2>
					<p>{c.summary}</p>
					<span class="link-arrow">Read the case study <ArrowRight size={18} aria-hidden="true" /></span>
				</div>
				<dl>
					{#each c.results as r (r.label)}
						<div><dt>{r.label}</dt><dd class="tnum">{r.value}</dd></div>
					{/each}
				</dl>
			</a>
		</div>
	</section>
{/if}

<section class="section section--cream" aria-labelledby="faq-title">
	<div class="container faq">
		<div class="section-head">
			<span class="eyebrow">Questions</span>
			<h2 id="faq-title">Common questions.</h2>
		</div>
		<FaqList faqs={pageFaqs} />
	</div>
</section>

<section class="section section--tight" aria-labelledby="other-title">
	<div class="container">
		<h2 id="other-title" class="other-title">Other services</h2>
		<ul class="others">
			{#each data.others as o (o.slug)}
				<li>
					<a href="/services/{o.slug}">
						<strong>{o.title}</strong>
						<span>{o.summary}</span>
						<ArrowRight size={18} aria-hidden="true" />
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<CtaBand title="Talk to us about {s.phrase}." />

<style>
	.aside-card {
		--radius: var(--r-lg);
		display: grid;
		gap: 1rem;
		padding: 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
	}
	.aside-card h2 {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.aside-card ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.aside-card li {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.8rem;
		border-radius: 99px;
		background: var(--cream);
		font-size: 0.88rem;
		font-weight: 500;
	}
	.aside-card li :global(svg) {
		color: var(--brand);
	}
	.outcome {
		font-family: var(--font-serif);
		font-size: 1.15rem;
		line-height: 1.5;
	}
	.promise {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
		font-size: 0.88rem;
		color: var(--muted);
	}
	.body .prose {
		font-size: var(--step-1);
		max-width: 48rem;
	}
	.first {
		font-family: var(--font-serif);
		font-size: var(--step-2);
		line-height: 1.4;
		color: var(--ink);
	}
	.includes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.includes li {
		--radius: var(--r);
		display: grid;
		align-content: start;
		gap: 0.5rem;
		padding: 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.includes p {
		color: var(--ink-2);
		font-size: 0.96rem;
	}
	.feature {
		--radius: var(--r-lg);
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 3rem;
		align-items: center;
		padding: clamp(1.75rem, 1rem + 3vw, 3.5rem);
		background: var(--brand);
		color: var(--cream);
		text-decoration: none;
		transition: box-shadow 0.3s;
	}
	.feature:hover {
		box-shadow: var(--shadow-lg);
	}
	.feature > div {
		display: grid;
		gap: 1rem;
		justify-items: start;
	}
	.feature h2 {
		color: var(--cream);
	}
	.feature p {
		color: rgb(243 235 221 / 0.8);
	}
	.feature .eyebrow,
	.feature .link-arrow {
		color: var(--cream-deep);
	}
	.feature dl {
		display: grid;
		gap: 0;
		margin: 0;
	}
	.feature dl div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding-block: 1rem;
		border-bottom: 1px solid rgb(243 235 221 / 0.18);
	}
	.feature dt {
		font-size: 0.9rem;
		color: rgb(243 235 221 / 0.75);
	}
	.feature dd {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.75rem;
	}
	.faq {
		display: grid;
		grid-template-columns: 1fr 1.6fr;
		gap: 3rem;
		align-items: start;
	}
	.other-title {
		font-size: var(--step-2);
		margin-bottom: 1.5rem;
	}
	.others {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.others a {
		position: relative;
		display: grid;
		gap: 0.4rem;
		height: 100%;
		padding: 1.5rem 3rem 1.5rem 1.5rem;
		border: 1px solid var(--line);
		border-radius: var(--r);
		background: var(--surface);
		text-decoration: none;
		transition: border-color 0.2s;
	}
	.others a:hover {
		border-color: var(--brand);
	}
	.others strong {
		font-family: var(--font-serif);
		font-weight: 500;
		font-size: 1.15rem;
	}
	.others span {
		font-size: 0.9rem;
		color: var(--muted);
	}
	.others :global(svg) {
		position: absolute;
		top: 1.6rem;
		right: 1.25rem;
		color: var(--brand);
	}
	@media (max-width: 1023px) {
		.feature,
		.faq {
			grid-template-columns: 1fr;
		}
		.others {
			grid-template-columns: 1fr;
		}
	}
</style>
