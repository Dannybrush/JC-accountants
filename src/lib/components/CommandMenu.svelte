<script lang="ts">
	import { page } from '$app/state';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import CornerDownLeft from 'lucide-svelte/icons/corner-down-left';
	import Search from 'lucide-svelte/icons/search';
	import Sheet from './Sheet.svelte';
	import { searchCommands, type Command } from '$lib/nav';
	import { closeSheet, isMac, navigateFromSheet, openSheet } from '$lib/state/sheets';
	import { toast } from '$lib/state/toasts.svelte';
	import { trackEvent } from '$lib/state/consent.svelte';
	import { site } from '$lib/site';

	let query = $state('');
	let active = $state(0);
	let list = $state<HTMLUListElement>();

	const open = $derived(page.state.sheet === 'search');
	const results = $derived(searchCommands(query));
	const groups = $derived.by(() => {
		const map = new Map<string, { item: Command; index: number }[]>();
		results.forEach((item, index) => {
			if (!map.has(item.group)) map.set(item.group, []);
			map.get(item.group)!.push({ item, index });
		});
		return [...map];
	});

	$effect(() => {
		if (open) {
			query = '';
			active = 0;
		}
	});

	$effect(() => {
		// Keep the highlighted row in view while arrowing through results
		list?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
	});

	function onGlobalKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		const typing = target.closest('input, textarea, select, [contenteditable]');
		if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open ? closeSheet() : openSheet('search');
		} else if (e.key === '/' && !typing && !open) {
			e.preventDefault();
			openSheet('search');
		}
	}

	function onInputKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = (active + 1) % results.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = (active - 1 + results.length) % results.length;
		} else if (e.key === 'Enter' && results[active]) {
			e.preventDefault();
			run(results[active]);
		}
	}

	async function copy(text: string, label: string) {
		try {
			await navigator.clipboard.writeText(text);
			toast(`${label} copied to clipboard`, { tone: 'success' });
		} catch {
			toast(`Couldn't copy — ${text}`);
		}
	}

	async function run(cmd: Command) {
		trackEvent('command_menu', { command: cmd.id, query });
		if (cmd.action === 'copy-email') {
			closeSheet();
			return copy(site.email, 'Email address');
		}
		if (cmd.action === 'copy-phone') {
			closeSheet();
			return copy(site.phone.display, 'Phone number');
		}
		if (!cmd.href) return;
		if (cmd.external) {
			closeSheet();
			if (cmd.href.startsWith('tel:')) location.href = cmd.href;
			else window.open(cmd.href, '_blank', 'noopener');
			return;
		}
		await navigateFromSheet(cmd.href);
	}
</script>

<svelte:window onkeydown={onGlobalKeydown} />

<Sheet {open} onclose={closeSheet} label="Search the site" initialFocus="input" wide>
	{#snippet header()}
		<div class="field">
			<Search size={20} aria-hidden="true" />
			<input
				type="search"
				placeholder="Search services, questions, or type an action…"
				aria-label="Search the site"
				aria-controls="command-results"
				aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
				autocomplete="off"
				spellcheck="false"
				enterkeyhint="go"
				bind:value={query}
				oninput={() => (active = 0)}
				onkeydown={onInputKeydown}
			/>
			<kbd class="kbd-hint">esc</kbd>
		</div>
	{/snippet}

	{#if results.length}
		<ul id="command-results" role="listbox" aria-label="Results" bind:this={list}>
			{#each groups as [group, items] (group)}
				<li role="presentation" class="group">{group}</li>
				{#each items as { item, index } (item.id)}
					<li
						id="cmd-{item.id}"
						role="option"
						aria-selected={index === active}
						data-index={index}
						class:active={index === active}
						onpointermove={() => (active = index)}
						onclick={() => run(item)}
						onkeydown={() => {}}
					>
						<span class="label">{item.label}</span>
						{#if item.hint}<span class="hint">{item.hint}</span>{/if}
						{#if item.external}
							<ArrowUpRight size={16} aria-hidden="true" />
						{:else if index === active}
							<CornerDownLeft size={16} class="kbd-hint" aria-hidden="true" />
						{/if}
					</li>
				{/each}
			{/each}
		</ul>
	{:else}
		<div class="empty">
			<p>No results for “{query}”.</p>
			<p>Try “VAT”, “landlord” or “directions” — or <a href="/contact#enquiry" onclick={(e) => { e.preventDefault(); navigateFromSheet('/contact#enquiry'); }}>ask us directly</a>.</p>
		</div>
	{/if}

	<footer class="kbd-hint">
		<span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
		<span><kbd>↵</kbd> to open</span>
		<span><kbd>/</kbd> or <kbd>{isMac() ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd> to open anywhere</span>
	</footer>
</Sheet>

<style>
	.field {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem 0.25rem 0.85rem;
		border-bottom: 1px solid var(--line);
		color: var(--muted);
	}
	input {
		flex: 1;
		min-width: 0;
		min-height: var(--tap);
		border: 0;
		background: none;
		font-size: 1.1rem;
		color: var(--ink);
		outline: none;
	}
	input::-webkit-search-cancel-button {
		display: none;
	}
	ul {
		margin: 0;
		padding: 0.25rem 0;
		list-style: none;
	}
	.group {
		padding: 0.9rem 0.75rem 0.35rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}
	[role='option'] {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: var(--tap);
		padding: 0.5rem 0.75rem;
		border-radius: 10px;
		cursor: pointer;
		color: var(--ink);
	}
	[role='option'].active {
		background: var(--cream);
	}
	[role='option'].active .label {
		color: var(--brand);
	}
	.label {
		flex: 1;
		min-width: 0;
		font-weight: 500;
		line-height: 1.35;
	}
	.hint {
		flex: none;
		max-width: 40%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: var(--step--1);
		color: var(--muted);
	}
	[role='option'] :global(svg) {
		flex: none;
		color: var(--muted);
	}
	.empty {
		padding: 2rem 0.75rem;
		color: var(--muted);
		display: grid;
		gap: 0.5rem;
	}
	.empty a {
		color: var(--brand);
	}
	footer {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		margin-top: 0.75rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--line);
		font-size: 0.78rem;
		color: var(--muted);
	}
	footer span {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}
	@media (max-width: 767px) {
		.hint {
			display: none;
		}
	}
</style>
