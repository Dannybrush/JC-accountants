<script lang="ts">
	let { tone = 'dark' }: { tone?: 'dark' | 'light' } = $props();
</script>

<span class="logo {tone}">
	<img src="/apple-touch-icon.png" alt="" width="44" height="44" />
	<span class="words">
		<span class="mark">J&amp;C</span>
		<span class="sub">Accountants</span>
	</span>
</span>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		line-height: 1;
	}
	img {
		width: 44px;
		height: 44px;
		border-radius: 9px;
	}
	@supports (corner-shape: squircle) {
		img {
			corner-shape: squircle;
			border-radius: 16px;
		}
	}
	.words {
		display: grid;
		gap: 0.28rem;
	}
	.mark {
		font-family: var(--font-serif);
		font-size: 1.45rem;
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--brand);
	}
	.sub {
		font-size: 0.62rem;
		font-weight: 600;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: var(--ink-2);
	}
	.light .mark,
	.light .sub {
		color: var(--cream);
	}
</style>
