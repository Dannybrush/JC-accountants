<script lang="ts">
	import Clock from 'lucide-svelte/icons/clock';
	import Mail from 'lucide-svelte/icons/mail';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Phone from 'lucide-svelte/icons/phone';
	import Logo from './Logo.svelte';
	import { services } from '$lib/content/services';
	import { areas } from '$lib/content/areas';
	import { addressOneLine, maps, site } from '$lib/site';
	import { analyticsEnabled, consent } from '$lib/state/consent.svelte';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container">
		<div class="top">
			<div class="intro">
				<a href="/" aria-label="J&C Accountants — home" class="logo-link"><Logo tone="light" /></a>
				<p>Independent accountants for businesses, landlords and contractors across the UK. Run by its directors since {site.founded}.</p>
				<p class="promise"><Clock size={16} aria-hidden="true" /> {site.responsePromise.long}</p>
			</div>

			<nav aria-label="Services">
				<h2>Services</h2>
				<ul>
					{#each services as s (s.slug)}<li><a href="/services/{s.slug}">{s.nav}</a></li>{/each}
				</ul>
			</nav>

			<nav aria-label="Where we work">
				<h2>Where we work</h2>
				<ul>
					{#each areas as a (a.slug)}<li><a href="/areas/{a.slug}">{a.name}</a></li>{/each}
					<li><a href="/areas">Across the UK</a></li>
				</ul>
			</nav>

			<nav aria-label="Firm">
				<h2>The firm</h2>
				<ul>
					<li><a href="/about">About us</a></li>
					<li><a href="/case-studies">Case studies</a></li>
					<li><a href="/contact">Contact</a></li>
					<li><a href="/privacy">Privacy & cookies</a></li>
				</ul>
			</nav>

			<address>
				<h2>Get in touch</h2>
				<a href={site.phone.href} class="tnum"><Phone size={16} aria-hidden="true" /> {site.phone.display}</a>
				<a href="mailto:{site.email}"><Mail size={16} aria-hidden="true" /> {site.email}</a>
				<a href={maps.google} target="_blank" rel="noopener"><MapPin size={16} aria-hidden="true" /> {addressOneLine}</a>
				<span><Clock size={16} aria-hidden="true" /> {site.hours.label}</span>
			</address>
		</div>

		<div class="legal">
			<p>
				© {year} {site.legalName}. Registered in England and Wales, company number <span class="tnum">{site.companyNumber}</span>.
				Registered office: {addressOneLine}.
			</p>
			<div class="legal-links">
				<a href="/privacy">Privacy policy</a>
				{#if analyticsEnabled()}
					<button onclick={() => (consent.settingsOpen = true)}>Cookie settings</button>
				{/if}
				<a href="/sitemap.xml">Sitemap</a>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		background: var(--brand-ink);
		color: rgb(243 235 221 / 0.75);
		padding-block: clamp(3.5rem, 3rem + 3vw, 5.5rem) 2rem;
		padding-bottom: calc(2rem + var(--safe-bottom));
		font-size: 0.93rem;
	}
	.top {
		display: grid;
		grid-template-columns: 1.6fr repeat(3, 1fr) 1.5fr;
		gap: 2.5rem;
	}
	.logo-link {
		display: inline-block;
		margin-bottom: 1.25rem;
	}
	.intro p {
		max-width: 22rem;
	}
	.promise {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
		color: var(--cream);
	}
	.promise :global(svg) {
		flex: none;
		margin-top: 0.3rem;
	}
	h2 {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cream);
		margin-bottom: 0.75rem;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	a,
	button {
		color: inherit;
		text-decoration: none;
	}
	ul a {
		display: inline-flex;
		align-items: center;
		min-height: 40px;
	}
	a:hover,
	button:hover {
		color: var(--cream);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	address {
		display: grid;
		align-content: start;
		gap: 0.25rem;
		font-style: normal;
	}
	address > :is(a, span) {
		display: flex;
		gap: 0.6rem;
		padding-block: 0.5rem;
		line-height: 1.45;
	}
	address :global(svg) {
		flex: none;
		margin-top: 0.15rem;
		opacity: 0.7;
	}
	.legal {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem 2rem;
		margin-top: 3.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgb(243 235 221 / 0.14);
		font-size: 0.82rem;
		color: rgb(243 235 221 / 0.55);
	}
	.legal p {
		max-width: 46rem;
	}
	.legal-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1.25rem;
	}
	.legal-links > * {
		display: inline-flex;
		align-items: center;
		min-height: 40px;
	}
	button {
		border: 0;
		background: none;
		padding: 0;
		font-size: inherit;
		cursor: pointer;
	}
	@media (max-width: 1023px) {
		.top {
			grid-template-columns: repeat(3, 1fr);
		}
		.intro,
		address {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 599px) {
		.top {
			grid-template-columns: 1fr 1fr;
		}
		nav[aria-label='Firm'] {
			grid-column: 1 / -1;
		}
	}
</style>
