<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Laptop from 'lucide-svelte/icons/laptop';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import PhoneCall from 'lucide-svelte/icons/phone-call';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import MapCard from '$lib/components/MapCard.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { areas } from '$lib/content/areas';
	import { breadcrumbs } from '$lib/schema';

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Where we work', href: '/areas' }
	];

	const ways = [
		{ icon: MapPin, title: 'In person', text: 'Meet us at our Swallowfield office, between Reading and Basingstoke, by appointment.' },
		{ icon: PhoneCall, title: 'Phone & video', text: 'Regular calls with the person who prepares your accounts — wherever you are.' },
		{ icon: Laptop, title: 'Secure cloud', text: 'Shared access to your accounting software and secure document exchange.' }
	];
</script>

<Seo
	title="Where We Work — Berkshire, Sheffield, Weymouth & UK-wide"
	description="J&C Accountants is based in Swallowfield, Berkshire and acts for businesses, landlords and contractors across the UK, including Sheffield and Weymouth."
	image="areas"
	schema={[breadcrumbs(crumbs)]}
/>

<PageHero
	{crumbs}
	eyebrow="Where we work"
	title="Based in Berkshire. Trusted across the UK."
	lede="Our office is in Swallowfield, near Reading. Through phone, video and secure cloud software, we act for clients right across the country — with particular strength in Berkshire, Sheffield and Weymouth."
/>

<section class="section">
	<div class="container">
		<ul class="areas">
			{#each areas as a (a.slug)}
				<li>
					<a href="/areas/{a.slug}" class="area smooth">
						<h2>{a.name}</h2>
						<p>{a.places.join(' · ')}</p>
						<span class="link-arrow">{a.title} <ArrowRight size={16} aria-hidden="true" /></span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section section--cream" aria-labelledby="ways-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">How we work with you</span>
			<h2 id="ways-title">The same service, wherever you are.</h2>
		</div>
		<ul class="ways">
			{#each ways as w (w.title)}
				<li>
					<w.icon size={26} aria-hidden="true" />
					<h3>{w.title}</h3>
					<p>{w.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section">
	<div class="container"><MapCard /></div>
</section>

<CtaBand />

<style>
	.areas {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.area {
		--radius: var(--r-lg);
		display: grid;
		gap: 0.75rem;
		height: 100%;
		padding: 2.25rem 2rem;
		background: var(--surface);
		border: 1px solid var(--line);
		text-decoration: none;
		transition:
			box-shadow 0.3s var(--ease-out),
			transform 0.3s var(--ease-out);
	}
	.area:hover {
		box-shadow: var(--shadow);
		transform: translateY(-3px);
	}
	.area p {
		color: var(--muted);
		font-size: 0.95rem;
	}
	.ways {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.ways li {
		display: grid;
		gap: 0.75rem;
		color: var(--brand);
	}
	.ways p {
		color: var(--ink-2);
	}
	@media (max-width: 899px) {
		.areas,
		.ways {
			grid-template-columns: 1fr;
		}
	}
</style>
