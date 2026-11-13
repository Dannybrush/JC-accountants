<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';

	type Props = {
		/** Page-specific title; the brand is appended automatically unless `exact` is set. */
		title: string;
		description: string;
		/** Key of a generated image in static/og (see scripts/images.mjs). */
		image?: string;
		exact?: boolean;
		noindex?: boolean;
		type?: 'website' | 'article';
		schema?: object[];
	};

	let { title, description, image = 'home', exact = false, noindex = false, type = 'website', schema = [] }: Props = $props();

	const fullTitle = $derived(exact ? title : `${title} | ${site.name}`);
	const canonical = $derived(new URL(page.url.pathname, site.url).href);
	const imageUrl = $derived(new URL(`/og/${image}.png`, site.url).href);
	// Escape `<` so content can never close the script element early
	const jsonld = $derived(
		schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</` + 'script>').join('')
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}<meta name="robots" content="noindex, follow" />{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{@html jsonld}
</svelte:head>
