<script lang="ts">
	import MapPin from 'lucide-svelte/icons/map-pin';
	import Navigation from 'lucide-svelte/icons/navigation';
	import { addressOneLine, maps, site } from '$lib/site';
	import { trackEvent } from '$lib/state/consent.svelte';

	// The Google map is only loaded on request: it sets third-party cookies and is heavy.
	let requested = $state(false);
	let loaded = $state(false);
</script>

<div class="map-card smooth">
	<div class="map">
		{#if requested}
			{#if !loaded}<div class="skeleton fill" aria-hidden="true"></div>{/if}
			<iframe
				title="Map showing the J&C Accountants office at Wyvols Court, Swallowfield"
				src={maps.embed}
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				class:loaded
				onload={() => (loaded = true)}
			></iframe>
		{:else}
			<div class="facade">
				<svg viewBox="0 0 400 240" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
					<rect width="400" height="240" fill="#efe6d8" />
					<path d="M-10 170 C80 150 140 190 220 160 S340 120 410 140" stroke="#fff" stroke-width="14" fill="none" />
					<path d="M120 -10 C130 60 170 110 200 130 S250 220 240 250" stroke="#fff" stroke-width="10" fill="none" />
					<path d="M0 60 L400 90" stroke="#fff" stroke-width="6" />
					<path d="M300 0 L280 240" stroke="#fff" stroke-width="5" />
					<circle cx="200" cy="130" r="38" fill="#5b1418" opacity=".12" />
				</svg>
				<span class="pin"><MapPin size={28} /></span>
				<button class="btn btn--light" onclick={() => (requested = true)}>Show interactive map</button>
				<small>Loads Google Maps, which may set cookies.</small>
			</div>
		{/if}
	</div>
	<div class="info">
		<h3>Our office</h3>
		<address>
			{site.legalName}<br />
			{#each site.address.lines as line (line)}{line}<br />{/each}
			{site.address.locality}, {site.address.region}<br />
			<span class="tnum">{site.address.postcode}</span>
		</address>
		<p class="note">Visits by appointment — please call ahead.</p>
		<div class="dirs">
			<a class="btn btn--primary" href={maps.google} target="_blank" rel="noopener" onclick={() => trackEvent('get_directions', { provider: 'google' })}>
				<Navigation size={17} aria-hidden="true" /> Directions
			</a>
			<a class="btn btn--ghost" href={maps.apple} target="_blank" rel="noopener" onclick={() => trackEvent('get_directions', { provider: 'apple' })}>
				Apple Maps
			</a>
		</div>
		<span class="visually-hidden">Address: {addressOneLine}</span>
	</div>
</div>

<style>
	.map-card {
		--radius: var(--r-lg);
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow);
	}
	.map {
		position: relative;
		min-height: 340px;
		background: #efe6d8;
	}
	.fill {
		position: absolute;
		inset: 0;
		border-radius: 0;
	}
	iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		opacity: 0;
		transition: opacity 0.4s;
	}
	iframe.loaded {
		opacity: 1;
	}
	.facade {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 0.75rem;
		padding: 1rem;
		text-align: center;
	}
	.facade svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.facade > :not(svg) {
		position: relative;
	}
	.pin {
		color: var(--brand);
		filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.2));
	}
	.facade .btn {
		box-shadow: var(--shadow);
		background: var(--surface);
	}
	small {
		font-size: 0.78rem;
		color: var(--muted);
	}
	.info {
		display: grid;
		align-content: center;
		gap: 1rem;
		padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
	}
	address {
		font-style: normal;
		line-height: 1.7;
		color: var(--ink-2);
	}
	.note {
		font-size: 0.9rem;
		color: var(--muted);
	}
	.dirs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	@media (max-width: 767px) {
		.map-card {
			grid-template-columns: 1fr;
		}
		.map {
			min-height: 260px;
		}
	}
</style>
