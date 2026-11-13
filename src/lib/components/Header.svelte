<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Menu from 'lucide-svelte/icons/menu';
	import Phone from 'lucide-svelte/icons/phone';
	import Search from 'lucide-svelte/icons/search';
	import Logo from './Logo.svelte';
	import { primaryNav } from '$lib/nav';
	import { services } from '$lib/content/services';
	import { areas } from '$lib/content/areas';
	import { site } from '$lib/site';
	import { isMac, openSheet } from '$lib/state/sheets';

	type MenuKey = 'services' | 'areas';
	let openMenu = $state<MenuKey | null>(null);
	let scrolled = $state(false);
	let mod = $state('Ctrl');

	const triggers: Partial<Record<MenuKey, HTMLElement>> = {};
	const panels: Partial<Record<MenuKey, HTMLElement>> = {};

	// --- Safe triangle -------------------------------------------------------------------------
	// When the pointer leaves a trigger heading for its panel, we keep the menu open while the
	// pointer stays inside the triangle formed by the exit point and the panel's top corners.
	// This stops a diagonal movement across a neighbouring trigger from switching menus.
	let grace: [number, number][] | null = null;
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	function inPolygon(x: number, y: number, poly: [number, number][]) {
		let inside = false;
		for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
			const [xi, yi] = poly[i];
			const [xj, yj] = poly[j];
			if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
		}
		return inside;
	}

	function show(key: MenuKey) {
		clearTimeout(closeTimer);
		openMenu = key;
	}

	function scheduleClose(delay = 120) {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => {
			openMenu = null;
			grace = null;
		}, delay);
	}

	function onTriggerEnter(key: MenuKey, e: PointerEvent) {
		if (e.pointerType !== 'mouse') return;
		// Still travelling through the safe triangle towards the open panel: ignore this trigger
		if (grace && openMenu && openMenu !== key && inPolygon(e.clientX, e.clientY, grace)) return;
		grace = null;
		show(key);
	}

	function onTriggerLeave(key: MenuKey, e: PointerEvent) {
		if (e.pointerType !== 'mouse' || openMenu !== key) return;
		const rect = panels[key]?.getBoundingClientRect();
		if (!rect) return scheduleClose();
		// Slightly widen the triangle so near-misses still count
		grace = [
			[e.clientX, e.clientY - 4],
			[rect.left - 24, rect.top + 1],
			[rect.right + 24, rect.top + 1]
		];
		scheduleClose(450);
	}

	function onWindowPointerMove(e: PointerEvent) {
		if (!grace || !openMenu || e.pointerType !== 'mouse') return;
		if (inPolygon(e.clientX, e.clientY, grace)) {
			// Re-anchor so the triangle narrows as the pointer approaches the panel
			grace[0] = [e.clientX, e.clientY - 4];
			scheduleClose(450);
		} else if (!panels[openMenu]?.matches(':hover') && !triggers[openMenu]?.matches(':hover')) {
			scheduleClose(80);
		}
	}

	function onPanelEnter() {
		clearTimeout(closeTimer);
		grace = null;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && openMenu) {
			const key = openMenu;
			openMenu = null;
			triggers[key]?.focus();
		}
	}

	function onFocusOut(key: MenuKey, e: FocusEvent) {
		const next = e.relatedTarget as Node | null;
		if (next && (panels[key]?.contains(next) || triggers[key]?.contains(next))) return;
		if (openMenu === key) openMenu = null;
	}

	afterNavigate(() => {
		openMenu = null;
		grace = null;
	});

	$effect(() => {
		mod = isMac() ? '⌘' : 'Ctrl';
		const onScroll = () => (scrolled = scrollY > 8);
		onScroll();
		addEventListener('scroll', onScroll, { passive: true });
		return () => removeEventListener('scroll', onScroll);
	});

	const isCurrent = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(href + '/');
</script>

<svelte:window onpointermove={onWindowPointerMove} onkeydown={onKeydown} />

<header class:scrolled>
	<div class="container bar">
		<a href="/" class="brand" aria-label="J&C Accountants — home">
			<Logo />
		</a>

		<nav aria-label="Main" class="desktop-nav">
			<ul>
				{#each primaryNav as item (item.href)}
					<li>
						{#if item.menu}
							{@const key = item.menu}
							<div class="has-menu" onfocusout={(e) => onFocusOut(key, e)}>
								<button
									bind:this={triggers[key]}
									class="nav-link"
									class:current={isCurrent(item.href)}
									aria-expanded={openMenu === key}
									aria-controls="menu-{key}"
									onpointerenter={(e) => onTriggerEnter(key, e)}
									onpointerleave={(e) => onTriggerLeave(key, e)}
									onclick={() => (openMenu === key ? (openMenu = null) : show(key))}
								>
									{item.label}
									<ChevronDown size={15} aria-hidden="true" />
								</button>
								<div
									id="menu-{key}"
									role="group"
									aria-label="{item.label} menu"
									bind:this={panels[key]}
									class="panel smooth {key}"
									class:open={openMenu === key}
									onpointerenter={onPanelEnter}
									onpointerleave={(e) => e.pointerType === 'mouse' && scheduleClose(200)}
								>
									{#if key === 'services'}
										<ul class="mega">
											{#each services as s (s.slug)}
												<li>
													<a href="/services/{s.slug}" class="mega-item">
														<strong>{s.title}</strong>
														<span>{s.summary}</span>
													</a>
												</li>
											{/each}
										</ul>
										<div class="panel-foot">
											<a href="/services" class="link-arrow">All services <ArrowRight size={16} /></a>
											<span>Working with Xero, QuickBooks, FreeAgent, Sage and more</span>
										</div>
									{:else}
										<ul class="areas-list">
											{#each areas as a (a.slug)}
												<li>
													<a href="/areas/{a.slug}" class="mega-item">
														<strong>{a.name}</strong>
														<span>{a.places.slice(0, 3).join(' · ')}</span>
													</a>
												</li>
											{/each}
										</ul>
										<div class="panel-foot">
											<a href="/areas" class="link-arrow">Clients across the UK <ArrowRight size={16} /></a>
										</div>
									{/if}
								</div>
							</div>
						{:else}
							<a href={item.href} class="nav-link" class:current={isCurrent(item.href)} aria-current={isCurrent(item.href) ? 'page' : undefined}>
								{item.label}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<div class="actions">
			<button class="search-btn" onclick={() => openSheet('search')} aria-label="Search the site" aria-keyshortcuts="Control+K Meta+K /">
				<Search size={18} aria-hidden="true" />
				<span class="search-label">Search</span>
				<span class="kbd-hint keys"><kbd>{mod}</kbd><kbd>K</kbd></span>
			</button>
			<a href={site.phone.href} class="phone tnum">
				<Phone size={16} aria-hidden="true" />
				{site.phone.display}
			</a>
			<a href="/contact#enquiry" class="btn btn--primary cta">Get in touch</a>
			<button class="menu-btn" aria-label="Open menu" onclick={() => openSheet('menu')}>
				<Menu size={24} aria-hidden="true" />
			</button>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		padding-top: var(--safe-top);
		background: rgb(251 248 243 / 0.86);
		backdrop-filter: saturate(1.4) blur(14px);
		-webkit-backdrop-filter: saturate(1.4) blur(14px);
		border-bottom: 1px solid transparent;
		transition:
			border-color 0.3s,
			box-shadow 0.3s;
		view-transition-name: header;
	}
	header.scrolled {
		border-bottom-color: var(--line);
		box-shadow: 0 6px 24px -18px rgb(42 8 9 / 0.35);
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		height: var(--header-h);
	}
	.brand {
		display: flex;
		align-items: center;
		min-height: var(--tap);
		text-decoration: none;
		flex: none;
	}

	.desktop-nav > ul {
		display: flex;
		gap: 0.15rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		min-height: 44px;
		padding: 0 0.75rem;
		border: 0;
		border-radius: 8px;
		white-space: nowrap;
		background: none;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--ink-2);
		text-decoration: none;
		cursor: pointer;
		transition:
			color 0.2s,
			background-color 0.2s;
	}
	.nav-link:hover,
	.nav-link[aria-expanded='true'] {
		color: var(--ink);
		background: rgb(91 20 24 / 0.05);
	}
	.nav-link.current {
		color: var(--brand);
	}
	.nav-link :global(svg) {
		transition: transform 0.25s var(--ease-out);
	}
	.nav-link[aria-expanded='true'] :global(svg) {
		transform: rotate(180deg);
	}

	.has-menu {
		position: relative;
	}
	.panel {
		--radius: var(--r-lg);
		position: absolute;
		top: calc(100% + 14px);
		left: -1rem;
		padding: 0.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-lg);
		opacity: 0;
		visibility: hidden;
		transform: translateY(-6px);
		transition:
			opacity 0.18s var(--ease-out),
			transform 0.22s var(--ease-out),
			visibility 0s 0.22s;
	}
	/* Invisible bridge so the gap between trigger and panel doesn't count as leaving */
	.panel::before {
		content: '';
		position: absolute;
		inset: -15px 0 auto;
		height: 15px;
	}
	.panel.open {
		opacity: 1;
		visibility: visible;
		transform: none;
		transition:
			opacity 0.18s var(--ease-out),
			transform 0.22s var(--ease-out);
	}
	.panel.services {
		width: min(680px, 80vw);
	}
	.panel.areas {
		width: 340px;
	}
	.mega {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.areas-list {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.mega-item {
		display: grid;
		gap: 0.25rem;
		padding: 0.9rem 1rem;
		border-radius: 12px;
		text-decoration: none;
		transition: background-color 0.15s;
	}
	.mega-item:hover,
	.mega-item:focus-visible {
		background: var(--paper);
	}
	.mega-item strong {
		font-family: var(--font-serif);
		font-size: 1.08rem;
		font-weight: 500;
		color: var(--ink);
	}
	.mega-item:hover strong {
		color: var(--brand);
	}
	.mega-item span {
		font-size: 0.88rem;
		line-height: 1.5;
		color: var(--muted);
	}
	.panel-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-top: 0.5rem;
		padding: 0.5rem 1rem 0.25rem;
		border-top: 1px solid var(--line);
		font-size: 0.85rem;
		color: var(--muted);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.search-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 44px;
		min-width: 44px;
		justify-content: center;
		padding: 0 0.75rem;
		border: 1px solid var(--line);
		border-radius: 10px;
		background: var(--surface);
		color: var(--muted);
		font-size: 0.9rem;
		cursor: pointer;
		transition: border-color 0.2s;
	}
	.search-btn:hover {
		border-color: var(--line-strong);
		color: var(--ink);
	}
	.keys {
		display: inline-flex;
		gap: 2px;
	}
	.phone {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 44px;
		padding: 0 0.6rem;
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--ink);
		text-decoration: none;
		white-space: nowrap;
	}
	.phone:hover {
		color: var(--brand);
	}
	.menu-btn {
		display: none;
		place-items: center;
		width: var(--tap);
		height: var(--tap);
		border: 0;
		border-radius: 12px;
		background: none;
		color: var(--ink);
		cursor: pointer;
	}

	@media (max-width: 1360px) {
		.phone {
			display: none;
		}
	}
	@media (max-width: 1180px) {
		.search-label {
			display: none;
		}
	}
	@media (max-width: 1023px) {
		.desktop-nav,
		.cta,
		.search-label,
		.keys {
			display: none;
		}
		.search-btn {
			border: 0;
			background: none;
			width: var(--tap);
			height: var(--tap);
			padding: 0;
		}
		.menu-btn {
			display: grid;
		}
	}
</style>
