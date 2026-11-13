<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import CheckCircle2 from 'lucide-svelte/icons/circle-check';
	import Mail from 'lucide-svelte/icons/mail';
	import Phone from 'lucide-svelte/icons/phone';
	import Seo from '$lib/components/Seo.svelte';
	import { services } from '$lib/content/services';
	import { caseStudies } from '$lib/content/case-studies';
	import { site } from '$lib/site';

	let name = $state('');
	let pref = $state<'email' | 'phone'>('email');

	$effect(() => {
		try {
			name = sessionStorage.getItem('jc-enquiry-name') ?? '';
			pref = sessionStorage.getItem('jc-enquiry-pref') === 'phone' ? 'phone' : 'email';
		} catch {
			/* ignore */
		}
	});

	const next = $derived([
		{ n: '1', title: 'Confirmation', text: 'A confirmation email is on its way to you now. If it doesn’t arrive, please check your junk folder.' },
		{
			n: '2',
			title: pref === 'phone' ? 'We’ll call you' : 'We’ll reply',
			text: `${pref === 'phone' ? 'A member of the team will call you' : 'You’ll receive a personal reply'} within one working day (${site.hours.label}).`
		},
		{ n: '3', title: 'A clear proposal', text: 'Once we understand what you need, we confirm the scope and fee in writing before any work starts.' }
	]);
</script>

<Seo title="Thank You — Enquiry Received" description="Thank you for contacting J&C Accountants. We will reply within one working day." image="contact" noindex />

<section class="section thanks">
	<div class="container narrow">
		<span class="icon"><CheckCircle2 size={44} aria-hidden="true" /></span>
		<h1>Thank you{name ? `, ${name}` : ''}. Your enquiry has been sent.</h1>
		<p class="lede">{site.responsePromise.long}</p>

		<ol class="steps">
			{#each next as step (step.n)}
				<li>
					<span class="n tnum">{step.n}</span>
					<div>
						<h2>{step.title}</h2>
						<p>{step.text}</p>
					</div>
				</li>
			{/each}
		</ol>

		<div class="urgent smooth">
			<p><strong>Need us sooner?</strong> Call during office hours and mention your enquiry.</p>
			<div class="actions">
				<a href={site.phone.href} class="btn btn--primary tnum"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
				<a href="mailto:{site.email}" class="btn btn--ghost"><Mail size={18} aria-hidden="true" /> Email us</a>
			</div>
		</div>

		<div class="explore">
			<h2>While you wait</h2>
			<ul>
				<li><a href="/case-studies/{caseStudies[0].slug}" class="link-arrow">Read: {caseStudies[0].title} <ArrowRight size={16} aria-hidden="true" /></a></li>
				<li><a href="/services/{services[2].slug}" class="link-arrow">How we handle Making Tax Digital <ArrowRight size={16} aria-hidden="true" /></a></li>
				<li><a href="/about" class="link-arrow">Meet the directors <ArrowRight size={16} aria-hidden="true" /></a></li>
			</ul>
		</div>
	</div>
</section>

<style>
	.narrow {
		max-width: 46rem;
		display: grid;
		gap: 1.5rem;
		justify-items: start;
	}
	.icon {
		display: grid;
		place-items: center;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: #e5f0e8;
		color: var(--success);
		animation: pop 0.6s var(--ease-spring) both;
	}
	@keyframes pop {
		from {
			transform: scale(0.6);
			opacity: 0;
		}
	}
	h1 {
		font-size: var(--step-4);
	}
	.steps {
		display: grid;
		gap: 1.25rem;
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
		width: 100%;
	}
	.steps li {
		display: flex;
		gap: 1rem;
	}
	.n {
		flex: none;
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--brand);
		color: var(--cream);
		font-weight: 600;
		font-size: 0.9rem;
	}
	.steps h2 {
		font-size: var(--step-1);
	}
	.steps p {
		color: var(--ink-2);
	}
	.urgent {
		--radius: var(--r-lg);
		display: grid;
		gap: 1rem;
		width: 100%;
		margin-top: 1rem;
		padding: 1.5rem;
		background: var(--cream);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.explore {
		width: 100%;
		margin-top: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--line);
	}
	.explore h2 {
		font-size: var(--step-1);
		margin-bottom: 0.5rem;
	}
	.explore ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
