<script lang="ts">
	import Clock from 'lucide-svelte/icons/clock';
	import Phone from 'lucide-svelte/icons/phone';
	import { site } from '$lib/site';

	let {
		title = 'Let’s talk about your accounts.',
		text = 'Tell us a little about your situation and we will explain how we can help — clearly, and without obligation.'
	}: { title?: string; text?: string } = $props();
</script>

<section class="section section--brand cta" aria-labelledby="cta-title">
	<div class="container inner">
		<div>
			<h2 id="cta-title">{title}</h2>
			<p>{text}</p>
		</div>
		<div class="actions">
			<a href="/contact#enquiry" class="btn btn--light btn--lg">Send an enquiry</a>
			<a href={site.phone.href} class="btn btn--ghost btn--lg tnum"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
			<p class="promise"><Clock size={16} aria-hidden="true" /> {site.responsePromise.short} · {site.hours.label}</p>
		</div>
	</div>
</section>

<style>
	.cta {
		position: relative;
		overflow: hidden;
	}
	.cta::before {
		content: '';
		position: absolute;
		inset: auto -10% -60% auto;
		width: 60vw;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgb(243 235 221 / 0.08), transparent 65%);
	}
	.inner {
		position: relative;
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 2.5rem;
		align-items: center;
	}
	p {
		margin-top: 1rem;
		max-width: 34rem;
		color: rgb(243 235 221 / 0.8);
		font-size: var(--step-1);
	}
	.actions {
		display: grid;
		gap: 0.75rem;
		justify-self: end;
		width: min(100%, 360px);
	}
	.promise {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		margin: 0.25rem 0 0;
		font-size: 0.88rem;
	}
	@media (max-width: 767px) {
		.inner {
			grid-template-columns: 1fr;
		}
		.actions {
			justify-self: stretch;
			width: 100%;
		}
	}
</style>
