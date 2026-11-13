<script lang="ts">
	import Clock from 'lucide-svelte/icons/clock';
	import Mail from 'lucide-svelte/icons/mail';
	import MessageSquareReply from 'lucide-svelte/icons/message-square-reply';
	import Phone from 'lucide-svelte/icons/phone';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import EnquiryForm from '$lib/components/EnquiryForm.svelte';
	import MapCard from '$lib/components/MapCard.svelte';
	import FaqList from '$lib/components/FaqList.svelte';
	import { faqs } from '$lib/content/faqs';
	import { site } from '$lib/site';
	import { breadcrumbs, faqPage, localBusiness } from '$lib/schema';

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Contact', href: '/contact' }
	];
</script>

<Seo
	title="Contact Us"
	description="Contact J&C Accountants on 0118 923 5812 or send an enquiry online. We reply within one working day. Office at Wyvols Court, Swallowfield, Reading RG7 1WY."
	image="contact"
	schema={[breadcrumbs(crumbs), localBusiness(), faqPage(faqs)]}
/>

<PageHero
	{crumbs}
	eyebrow="Contact"
	title="Speak to J&C Accountants."
	lede="Whether you are switching accountant, starting a business or facing a deadline, tell us what you need. {site.responsePromise.long}"
/>

<section class="section section--tight">
	<div class="container layout" id="enquiry">
		<EnquiryForm />

		<aside class="side">
			<div class="card smooth">
				<h2>Prefer to talk?</h2>
				<a href={site.phone.href} class="big tnum"><Phone size={22} aria-hidden="true" /> {site.phone.display}</a>
				<p class="muted">{site.hours.days}, 9am to 5pm</p>
				<a href="mailto:{site.email}" class="line"><Mail size={18} aria-hidden="true" /> {site.email}</a>
			</div>
			<div class="card smooth promise">
				<MessageSquareReply size={26} aria-hidden="true" />
				<h2>Our response promise</h2>
				<p>{site.responsePromise.long} Enquiries received after 5pm or at the weekend are answered the next working day.</p>
				<p class="muted"><Clock size={15} aria-hidden="true" /> Office hours: {site.hours.label}</p>
			</div>
		</aside>
	</div>
</section>

<section class="section section--tight" aria-labelledby="visit-title">
	<div class="container">
		<h2 id="visit-title" class="visit-title">Visit our office</h2>
		<MapCard />
	</div>
</section>

<section class="section section--cream" aria-labelledby="faq-title">
	<div class="container faq">
		<div class="section-head">
			<span class="eyebrow">Before you get in touch</span>
			<h2 id="faq-title">Frequently asked questions.</h2>
		</div>
		<FaqList {faqs} />
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: clamp(1.5rem, 1rem + 2vw, 3rem);
		align-items: start;
		scroll-margin-top: calc(var(--header-h) + 1rem);
	}
	.side {
		display: grid;
		gap: 1.25rem;
	}
	.card {
		--radius: var(--r-lg);
		display: grid;
		gap: 0.75rem;
		padding: 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.card h2 {
		font-size: var(--step-1);
	}
	.big {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: var(--tap);
		font-family: var(--font-serif);
		font-size: var(--step-2);
		color: var(--brand);
		text-decoration: none;
	}
	.line {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 44px;
		padding-top: 0.75rem;
		border-top: 1px solid var(--line);
		color: var(--ink);
		text-decoration: none;
		overflow-wrap: anywhere;
	}
	.line:hover {
		color: var(--brand);
	}
	.muted {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.9rem;
		color: var(--muted);
	}
	.promise {
		background: var(--brand);
		color: var(--cream);
		border-color: var(--brand);
	}
	.promise h2 {
		color: var(--cream);
	}
	.promise p {
		color: rgb(243 235 221 / 0.85);
	}
	.promise .muted {
		color: rgb(243 235 221 / 0.7);
	}
	.visit-title {
		font-size: var(--step-2);
		margin-bottom: 1.5rem;
	}
	.faq {
		display: grid;
		grid-template-columns: 1fr 1.6fr;
		gap: 3rem;
		align-items: start;
	}
	@media (max-width: 1023px) {
		.layout,
		.faq {
			grid-template-columns: 1fr;
		}
	}
</style>
