<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tick, untrack } from 'svelte';

	type Props = {
		open: boolean;
		onclose: () => void;
		label: string;
		/** `sheet` slides up from the bottom on small screens; on wider screens both render as a centred panel. */
		children: Snippet;
		header?: Snippet;
		initialFocus?: string;
		wide?: boolean;
	};

	let { open, onclose, label, children, header, initialFocus, wide = false }: Props = $props();

	let mounted = $state(false);
	let shown = $state(false);
	let panel = $state<HTMLDivElement>();
	let body = $state<HTMLDivElement>();
	let returnFocus: HTMLElement | null = null;

	// Drag state lives outside reactivity: it changes every frame and only touches the DOM
	let drag: { startY: number; startOffset: number; lastY: number; lastT: number; velocity: number } | null = null;
	let offset = 0;

	$effect(() => {
		const isOpen = open;
		untrack(() => (isOpen ? show() : hide()));
	});

	async function show() {
		returnFocus = document.activeElement as HTMLElement;
		mounted = true;
		document.documentElement.style.overflow = 'hidden';
		await tick();
		// Double rAF so the off-screen start position is committed before transitioning in
		requestAnimationFrame(() => requestAnimationFrame(() => (shown = true)));
		const target = initialFocus ? panel?.querySelector<HTMLElement>(initialFocus) : panel;
		target?.focus({ preventScroll: true });
	}

	function hide() {
		if (!mounted) return;
		shown = false;
		offset = 0;
		if (panel) panel.style.transform = '';
		document.documentElement.style.overflow = '';
		returnFocus?.focus?.({ preventScroll: true });
		// Safety net in case no transitionend fires (e.g. closed before it finished opening)
		setTimeout(() => {
			if (!open && !shown) mounted = false;
		}, 700);
	}

	function onTransitionEnd(e: TransitionEvent) {
		// Unmount only once fully closed — reopening mid-animation simply reverses the transition
		if (e.target === panel && e.propertyName === 'transform' && !shown && !open) mounted = false;
	}

	function currentTranslateY() {
		if (!panel) return 0;
		const m = new DOMMatrixReadOnly(getComputedStyle(panel).transform);
		return m.m42;
	}

	function onPointerDown(e: PointerEvent) {
		if (e.pointerType === 'mouse' || !panel) return;
		if (matchMedia('(min-width: 768px)').matches) return;
		// Let the content scroll; only drag when it is scrolled to the top or the handle is used
		const fromHandle = (e.target as HTMLElement).closest('[data-handle]');
		if (!fromHandle && body && body.scrollTop > 0) return;
		if ((e.target as HTMLElement).closest('input, textarea, select')) return;
		// Interruptible: pick up the sheet wherever it currently is, mid-animation or not
		const y = currentTranslateY();
		panel.style.transition = 'none';
		panel.style.transform = `translate3d(0, ${y}px, 0)`;
		drag = { startY: e.clientY, startOffset: y, lastY: e.clientY, lastT: e.timeStamp, velocity: 0 };
	}

	function onPointerMove(e: PointerEvent) {
		if (!drag || !panel) return;
		const dy = e.clientY - drag.startY + drag.startOffset;
		if (Math.abs(e.clientY - drag.startY) > 4 && !panel.hasPointerCapture(e.pointerId)) {
			try {
				panel.setPointerCapture(e.pointerId);
			} catch {
				// Pointer already released or cancelled; keep following move events without capture
			}
		}
		// Resist upward drag with a rubber-band effect
		offset = dy < 0 ? -Math.sqrt(-dy) * 2 : dy;
		const dt = e.timeStamp - drag.lastT;
		if (dt > 0) drag.velocity = (e.clientY - drag.lastY) / dt;
		drag.lastY = e.clientY;
		drag.lastT = e.timeStamp;
		panel.style.transform = `translate3d(0, ${offset}px, 0)`;
	}

	function onPointerUp() {
		if (!drag || !panel) return;
		const { velocity } = drag;
		drag = null;
		panel.style.transition = '';
		const height = panel.offsetHeight;
		if (offset > height * 0.3 || velocity > 0.5) {
			panel.style.transform = '';
			onclose();
		} else {
			panel.style.transform = '';
			offset = 0;
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			onclose();
		}
		if (e.key === 'Tab' && panel) trapFocus(e, panel);
	}

	function trapFocus(e: KeyboardEvent, root: HTMLElement) {
		const items = [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')];
		if (!items.length) return;
		const first = items[0];
		const last = items[items.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if mounted}
	<div class="root" class:shown>
		<button class="scrim" tabindex="-1" aria-label="Close" onclick={onclose}></button>
		<div
			bind:this={panel}
			class="panel smooth"
			class:wide
			role="dialog"
			aria-modal="true"
			aria-label={label}
			tabindex="-1"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
			ontransitionend={onTransitionEnd}
		>
			<div class="handle" data-handle aria-hidden="true"><span></span></div>
			{#if header}<div class="head">{@render header()}</div>{/if}
			<div class="body" bind:this={body}>
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.root {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}
	.scrim {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		background: rgb(29 20 22 / 0.5);
		backdrop-filter: blur(2px);
		opacity: 0;
		transition: opacity 0.35s var(--ease-out);
		cursor: default;
	}
	.shown .scrim {
		opacity: 1;
	}
	.panel {
		--radius: var(--r-lg);
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-height: calc(100dvh - var(--safe-top) - 2.5rem);
		background: var(--paper);
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		box-shadow: var(--shadow-lg);
		transform: translate3d(0, 100%, 0);
		/* Transitions (not keyframes) so a new target interrupts smoothly from wherever the sheet is */
		transition: transform 0.45s var(--ease-out);
		touch-action: pan-y;
		outline: none;
		will-change: transform;
	}
	.shown .panel {
		transform: translate3d(0, 0, 0);
	}
	.handle {
		display: grid;
		place-items: center;
		height: 28px;
		flex: none;
		cursor: grab;
	}
	.handle span {
		width: 40px;
		height: 5px;
		border-radius: 99px;
		background: var(--line-strong);
	}
	.head {
		flex: none;
		padding-inline: 1.25rem;
	}
	.body {
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: 0.5rem 1.25rem calc(1.5rem + var(--safe-bottom));
	}

	@media (min-width: 768px) {
		.root {
			align-items: flex-start;
			padding-top: 12vh;
		}
		.panel {
			width: min(640px, calc(100vw - 2rem));
			max-height: 70vh;
			border-radius: var(--radius);
			transform: translate3d(0, -8px, 0) scale(0.98);
			opacity: 0;
			transition:
				transform 0.25s var(--ease-out),
				opacity 0.2s var(--ease-out);
		}
		@supports (corner-shape: squircle) {
			.panel {
				border-radius: calc(var(--radius) * 1.75);
			}
		}
		.panel.wide {
			width: min(760px, calc(100vw - 2rem));
		}
		.shown .panel {
			transform: none;
			opacity: 1;
		}
		.handle {
			display: none;
		}
		.head {
			padding-top: 1rem;
		}
		.body {
			padding-bottom: 1.25rem;
		}
	}
</style>
