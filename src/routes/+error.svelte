<script lang="ts">
	import { page } from '$app/state';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Search from 'lucide-svelte/icons/search';
	import Seo from '$lib/components/Seo.svelte';
	import { services } from '$lib/content/services';
	import { site } from '$lib/site';
	import { openSheet } from '$lib/state/sheets';

	const notFound = $derived(page.status === 404);
</script>

<Seo
	title={notFound ? 'Page Not Found' : 'Something Went Wrong'}
	description="The page you were looking for could not be found. Find our services, contact details and case studies from here."
	noindex
/>

<section class="section error">
	<div class="container inner">
		<p class="code tnum" aria-hidden="true">{page.status}</p>
		<div class="copy">
			<span class="eyebrow">{notFound ? 'Page not found' : 'Error'}</span>
			<h1>{notFound ? 'This page doesn’t add up.' : 'Something went wrong on our side.'}</h1>
			<p class="lede">
				{#if notFound}
					The page may have moved, or the link may be mistyped. Everything else is exactly where you would expect.
				{:else}
					Please try again in a moment. If the problem continues, call us on <a href={site.phone.href}>{site.phone.display}</a>.
				{/if}
			</p>
			<div class="actions">
				<a href="/" class="btn btn--primary btn--lg">Back to the home page</a>
				<button class="btn btn--ghost btn--lg" onclick={() => openSheet('search')}><Search size={18} aria-hidden="true" /> Search the site</button>
			</div>
			<nav aria-label="Popular pages" class="popular">
				<h2>Popular pages</h2>
				<ul>
					{#each services as s (s.slug)}<li><a href="/services/{s.slug}" class="link-arrow">{s.title} <ArrowRight size={16} aria-hidden="true" /></a></li>{/each}
					<li><a href="/contact" class="link-arrow">Contact us <ArrowRight size={16} aria-hidden="true" /></a></li>
				</ul>
			</nav>
		</div>
	</div>
</section>

<style>
	.error {
		min-height: 70vh;
	}
	.inner {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: clamp(2rem, 1rem + 5vw, 6rem);
		align-items: start;
	}
	.code {
		font-family: var(--font-serif);
		font-size: clamp(6rem, 4rem + 10vw, 14rem);
		line-height: 0.85;
		color: var(--brand);
		opacity: 0.12;
		margin: 0;
	}
	.copy {
		display: grid;
		gap: 1.25rem;
		max-width: 42rem;
	}
	.lede a {
		color: var(--brand);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.popular {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line);
	}
	.popular h2 {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.popular ul {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 0.5rem 0 0;
		padding: 0;
		list-style: none;
	}
	@media (max-width: 767px) {
		.inner {
			grid-template-columns: 1fr;
		}
		.code {
			display: none;
		}
		.popular ul {
			grid-template-columns: 1fr;
		}
	}
</style>
