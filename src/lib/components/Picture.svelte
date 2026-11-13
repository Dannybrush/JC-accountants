<script lang="ts">
	import manifest from '$lib/images.json';

	type Props = {
		/** Key in src/lib/images.json (file name in assets/photos without extension) */
		name: keyof typeof manifest;
		alt: string;
		sizes?: string;
		eager?: boolean;
		class?: string;
		style?: string;
	};

	let { name, alt, sizes = '100vw', eager = false, class: className = '', style = '' }: Props = $props();

	const img = $derived(manifest[name]);
	const srcset = (format: string) => img.widths.map((w) => `/images/${name}-${w}.${format} ${w}w`).join(', ');
	const fallback = $derived(`/images/${name}-${img.widths[Math.min(1, img.widths.length - 1)]}.webp`);

	let loaded = $state(false);

	// Images served from cache can finish before hydration attaches onload
	function check(node: HTMLImageElement) {
		if (node.complete && node.naturalWidth) loaded = true;
	}
</script>

<div
	class="picture {className}"
	class:loaded
	style="aspect-ratio: {img.width} / {img.height}; background-image: url('{img.blur}'); {style}"
>
	<picture>
		<source type="image/avif" srcset={srcset('avif')} {sizes} />
		<source type="image/webp" srcset={srcset('webp')} {sizes} />
		<img
			src={fallback}
			{alt}
			width={img.width}
			height={img.height}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : 'auto'}
			decoding="async"
			onload={() => (loaded = true)}
			use:check
		/>
	</picture>
</div>

<style>
	.picture {
		position: relative;
		overflow: hidden;
		background-size: cover;
		background-position: center;
		background-color: var(--cream-deep);
	}
	/* Blur the tiny placeholder; scale hides the soft edges */
	.picture::before {
		content: '';
		position: absolute;
		inset: -20px;
		background: inherit;
		filter: blur(20px);
		transition: opacity 0.5s var(--ease-out);
	}
	.picture.loaded::before {
		opacity: 0;
	}
	img {
		position: relative;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.5s var(--ease-out);
	}
	.loaded img {
		opacity: 1;
	}
	@media (scripting: none) {
		img {
			opacity: 1;
		}
	}
</style>
