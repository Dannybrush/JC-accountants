<script lang="ts">
	import Star from 'lucide-svelte/icons/star';
	import { swr } from '$lib/swr.svelte';
	import type { Review } from '$lib/content/reviews';

	const feed = swr<{ reviews: Review[] }>('/api/reviews');
	const dateFmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
</script>

<div class="grid" aria-busy={!feed.data && !feed.error}>
	{#if feed.data}
		{#each feed.data.reviews as review, i (i)}
			<figure class="card smooth" class:placeholder={review.placeholder}>
				{#if review.placeholder}<span class="flag">Review slot — add a genuine review</span>{/if}
				<div class="stars" role="img" aria-label="{review.rating} out of 5 stars">
					{#each { length: 5 } as _, s (s)}
						<Star size={16} fill={s < review.rating ? 'currentColor' : 'none'} aria-hidden="true" />
					{/each}
				</div>
				<blockquote><p>“{review.body}”</p></blockquote>
				<figcaption>
					<strong>{review.author}</strong>
					<span>{review.context}</span>
					<span class="meta"><time datetime={review.date}>{dateFmt.format(new Date(review.date))}</time> · via {review.source}</span>
				</figcaption>
			</figure>
		{/each}
	{:else if feed.error}
		<p class="error">Reviews are unavailable right now.</p>
	{:else}
		{#each { length: 3 } as _, i (i)}
			<div class="card smooth" aria-hidden="true">
				<div class="skeleton" style="width: 96px; height: 16px"></div>
				<div class="skeleton" style="height: 14px; margin-top: 1.25rem"></div>
				<div class="skeleton" style="height: 14px; margin-top: 0.6rem"></div>
				<div class="skeleton" style="height: 14px; width: 70%; margin-top: 0.6rem"></div>
				<div class="skeleton" style="height: 14px; width: 40%; margin-top: 2rem"></div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 1.25rem;
	}
	.card {
		--radius: var(--r-lg);
		position: relative;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 1.75rem;
		min-height: 260px;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-sm);
	}
	.placeholder {
		background: repeating-linear-gradient(135deg, var(--surface) 0 12px, var(--paper) 12px 24px);
		border-style: dashed;
		border-color: var(--line-strong);
	}
	.flag {
		position: absolute;
		top: -0.7rem;
		left: 1.25rem;
		padding: 0.15rem 0.6rem;
		border-radius: 99px;
		background: var(--focus);
		color: #fff;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.04em;
	}
	.stars {
		display: flex;
		gap: 2px;
		color: #b8862f;
	}
	blockquote {
		flex: 1;
		margin: 1rem 0 1.5rem;
		font-family: var(--font-serif);
		font-size: 1.12rem;
		line-height: 1.55;
		color: var(--ink);
	}
	figcaption {
		display: grid;
		gap: 0.1rem;
		font-size: 0.9rem;
		color: var(--muted);
	}
	figcaption strong {
		color: var(--ink);
	}
	.meta {
		font-size: 0.8rem;
	}
	.error {
		color: var(--muted);
	}
</style>
