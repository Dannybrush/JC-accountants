<script lang="ts">
	import { page } from '$app/state';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Clock from 'lucide-svelte/icons/clock';
	import Phone from 'lucide-svelte/icons/phone';
	import Sheet from './Sheet.svelte';
	import { services } from '$lib/content/services';
	import { areas } from '$lib/content/areas';
	import { site } from '$lib/site';
	import { closeSheet, navigateFromSheet } from '$lib/state/sheets';

	const open = $derived(page.state.sheet === 'menu');

	const groups = [
		{ title: 'Services', links: services.map((s) => ({ label: s.nav, href: `/services/${s.slug}` })) },
		{ title: 'Where we work', links: areas.map((a) => ({ label: a.name, href: `/areas/${a.slug}` })) },
		{
			title: 'The firm',
			links: [
				{ label: 'Case studies', href: '/case-studies' },
				{ label: 'About us', href: '/about' },
				{ label: 'Contact', href: '/contact' }
			]
		}
	];

	function go(e: MouseEvent, href: string) {
		e.preventDefault();
		navigateFromSheet(href);
	}
</script>

<Sheet {open} onclose={closeSheet} label="Menu">
	<nav aria-label="Mobile">
		{#each groups as group (group.title)}
			<section>
				<h2>{group.title}</h2>
				<ul>
					{#each group.links as link (link.href)}
						<li>
							<a href={link.href} onclick={(e) => go(e, link.href)} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
								{link.label}
								<ArrowRight size={18} aria-hidden="true" />
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</nav>

	<div class="contact">
		<a href="/contact#enquiry" class="btn btn--primary btn--lg" onclick={(e) => go(e, '/contact#enquiry')}>Send an enquiry</a>
		<a href={site.phone.href} class="btn btn--ghost btn--lg tnum"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
		<p><Clock size={15} aria-hidden="true" /> {site.hours.label} · {site.responsePromise.short.toLowerCase()}</p>
	</div>
</Sheet>

<style>
	section + section {
		margin-top: 1.25rem;
	}
	h2 {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
		margin-bottom: 0.25rem;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	a:not(.btn) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 52px;
		border-bottom: 1px solid var(--line);
		font-family: var(--font-serif);
		font-size: 1.2rem;
		color: var(--ink);
		text-decoration: none;
	}
	a:not(.btn) :global(svg) {
		color: var(--line-strong);
	}
	a[aria-current='page'] {
		color: var(--brand);
	}
	.contact {
		display: grid;
		gap: 0.6rem;
		margin-top: 1.5rem;
	}
	.contact p {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		font-size: var(--step--1);
		color: var(--muted);
	}
</style>
