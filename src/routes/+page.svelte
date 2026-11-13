<script lang="ts">
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import BookOpenCheck from 'lucide-svelte/icons/book-open-check';
	import Building2 from 'lucide-svelte/icons/building-2';
	import Calculator from 'lucide-svelte/icons/calculator';
	import Check from 'lucide-svelte/icons/check';
	import Clock from 'lucide-svelte/icons/clock';
	import FileText from 'lucide-svelte/icons/file-text';
	import Laptop from 'lucide-svelte/icons/laptop';
	import MessagesSquare from 'lucide-svelte/icons/messages-square';
	import Phone from 'lucide-svelte/icons/phone';
	import Briefcase from 'lucide-svelte/icons/briefcase';
	import Home from 'lucide-svelte/icons/house';
	import Landmark from 'lucide-svelte/icons/landmark';
	import Seo from '$lib/components/Seo.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import FaqList from '$lib/components/FaqList.svelte';
	import Reviews from '$lib/components/Reviews.svelte';
	import MapCard from '$lib/components/MapCard.svelte';
	import KeyDates from '$lib/components/KeyDates.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { services } from '$lib/content/services';
	import { caseStudies } from '$lib/content/case-studies';
	import { areas } from '$lib/content/areas';
	import { faqs } from '$lib/content/faqs';
	import { site, yearsTrading } from '$lib/site';
	import { faqPage, localBusiness } from '$lib/schema';

	const serviceIcons: Record<string, typeof FileText> = {
		'accounts-and-tax': FileText,
		'bookkeeping-and-vat': BookOpenCheck,
		'making-tax-digital': Laptop,
		'advisory-and-formations': Landmark
	};

	const audiences = [
		{
			icon: Building2,
			title: 'Limited companies',
			text: 'Year-end accounts, corporation tax, VAT and director remuneration for owner-managed companies.',
			links: [
				{ label: 'Accounts & tax', href: '/services/accounts-and-tax' },
				{ label: 'Bookkeeping & VAT', href: '/services/bookkeeping-and-vat' }
			]
		},
		{
			icon: Home,
			title: 'Sole traders & landlords',
			text: 'Self assessment, rental accounts and Making Tax Digital for Income Tax — set up and filed for you.',
			links: [
				{ label: 'Making Tax Digital', href: '/services/making-tax-digital' },
				{ label: 'Self assessment', href: '/services/accounts-and-tax' }
			]
		},
		{
			icon: Briefcase,
			title: 'Contractors & freelancers',
			text: 'Company formation, IR35 reviews and a tax-efficient way to pay yourself through your own company.',
			links: [
				{ label: 'Advisory & formations', href: '/services/advisory-and-formations' },
				{ label: 'Case study', href: '/case-studies/contractor-year-end-clarity' }
			]
		}
	];

	const steps = [
		{ icon: MessagesSquare, title: 'Tell us what you need', text: `Send an enquiry or call. ${site.responsePromise.long}` },
		{ icon: Calculator, title: 'A clear proposal', text: 'We agree exactly what we will do for you and confirm the fee in writing before any work starts.' },
		{ icon: Check, title: 'We take it from here', text: 'We handle the handover from your previous accountant, set up HMRC authority and get to work.' }
	];
</script>

<Seo
	title="J&C Accountants | Accountants in Berkshire & Across the UK"
	exact
	description="Independent accountants since 2010. Accounts, tax returns, bookkeeping, VAT and Making Tax Digital for limited companies, sole traders, landlords and contractors. Reply within 1 working day."
	schema={[localBusiness(), faqPage(faqs)]}
/>

<!-- Hero -->
<section class="hero">
	<div class="container hero-grid">
		<div class="hero-copy">
			<span class="eyebrow">Independent accountants · Est. {site.founded}</span>
			<h1>Accounts, tax and advice you can rely on.</h1>
			<p class="lede">
				For limited companies, sole traders, landlords and contractors who want their numbers right, their deadlines met and an
				accountant who answers the phone.
			</p>
			<div class="hero-actions">
				<a href="/contact#enquiry" class="btn btn--primary btn--lg">Send an enquiry <ArrowRight size={18} aria-hidden="true" /></a>
				<a href={site.phone.href} class="btn btn--ghost btn--lg tnum"><Phone size={18} aria-hidden="true" /> {site.phone.display}</a>
			</div>
			<p class="promise"><Clock size={16} aria-hidden="true" /> <span><strong>{site.responsePromise.short}.</strong> {site.hours.label}.</span></p>
		</div>

		<aside class="credentials smooth" aria-label="At a glance">
			<dl>
				<div>
					<dt>Established</dt>
					<dd class="tnum">{site.founded}</dd>
					<span class="sub">{yearsTrading} years in practice</span>
				</div>
				<div>
					<dt>Response time</dt>
					<dd>1 day</dd>
					<span class="sub">Reply within one working day</span>
				</div>
				<div>
					<dt>Software</dt>
					<dd>Any</dd>
					<span class="sub">Xero, QuickBooks, FreeAgent, Sage…</span>
				</div>
				<div>
					<dt>Clients</dt>
					<dd>UK-wide</dd>
					<span class="sub">Berkshire · Sheffield · Weymouth</span>
				</div>
			</dl>
			<p class="reg">
				{site.legalName} · Company no. <span class="tnum">{site.companyNumber}</span>
			</p>
		</aside>
	</div>
</section>

<!-- Software -->
<section class="software" aria-label="Software we work with">
	<div class="container software-inner">
		<p>Working in the software you already use</p>
		<ul>
			<li>Xero</li>
			<li>QuickBooks</li>
			<li>FreeAgent</li>
			<li>Sage</li>
			<li>Dext</li>
			<li>&amp; more</li>
		</ul>
	</div>
</section>

<!-- Services -->
<section class="section" aria-labelledby="services-title">
	<div class="container">
		<div class="section-head split">
			<div>
				<span class="eyebrow">What we do</span>
				<h2 id="services-title">Everything your accounts need, under one roof.</h2>
			</div>
			<a href="/services" class="link-arrow">View all services <ArrowRight size={18} aria-hidden="true" /></a>
		</div>
		<ul class="services">
			{#each services as s (s.slug)}
				{@const Icon = serviceIcons[s.slug]}
				<li>
					<a href="/services/{s.slug}" class="service smooth">
						<span class="service-icon"><Icon size={24} aria-hidden="true" /></span>
						<h3>{s.title}</h3>
						<p>{s.summary}</p>
						<span class="more">Learn more <ArrowRight size={16} aria-hidden="true" /></span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Who we help -->
<section class="section section--cream" aria-labelledby="who-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Who we help</span>
			<h2 id="who-title">Built around the way you earn.</h2>
		</div>
		<div class="audiences">
			{#each audiences as a (a.title)}
				<article class="audience">
					<a.icon size={28} aria-hidden="true" />
					<h3>{a.title}</h3>
					<p>{a.text}</p>
					<ul>
						{#each a.links as link (link.href + link.label)}
							<li><a href={link.href} class="link-arrow">{link.label} <ArrowRight size={16} aria-hidden="true" /></a></li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- MTD & key dates -->
<section class="section section--brand" aria-labelledby="mtd-title">
	<div class="container mtd">
		<div class="mtd-copy">
			<span class="eyebrow">Making Tax Digital</span>
			<h2 id="mtd-title">Quarterly reporting is here. We’ll make it painless.</h2>
			<p>
				Making Tax Digital for Income Tax started in April 2026 for sole traders and landlords with qualifying income over £50,000. The
				threshold falls to £30,000 in April 2027 and £20,000 in April 2028.
			</p>
			<p>We set up the software, submit every quarterly update and file your final declaration — so the new rules cost you no extra time.</p>
			<a href="/services/making-tax-digital" class="btn btn--light">How we handle MTD <ArrowRight size={18} aria-hidden="true" /></a>
		</div>
		<div class="mtd-dates">
			<h3>Upcoming deadlines</h3>
			<KeyDates />
		</div>
	</div>
</section>

<!-- How it works -->
<section class="section" aria-labelledby="how-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Getting started</span>
			<h2 id="how-title">Switching to J&C is simple.</h2>
			<p class="lede">No forms to chase, no awkward conversations with your old accountant. We handle the handover.</p>
		</div>
		<ol class="steps">
			{#each steps as step, i (step.title)}
				<li>
					<span class="step-num tnum">0{i + 1}</span>
					<step.icon size={26} aria-hidden="true" />
					<h3>{step.title}</h3>
					<p>{step.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- Case studies -->
<section class="section section--cream" aria-labelledby="cases-title">
	<div class="container">
		<div class="section-head split">
			<div>
				<span class="eyebrow">Case studies</span>
				<h2 id="cases-title">How we help clients like you.</h2>
			</div>
			<a href="/case-studies" class="link-arrow">All case studies <ArrowRight size={18} aria-hidden="true" /></a>
		</div>
		<ul class="cases">
			{#each caseStudies as c (c.slug)}
				<li>
					<a href="/case-studies/{c.slug}" class="case smooth">
						<span class="case-meta">{c.sector} · {c.location}</span>
						<h3 style:view-transition-name="case-{c.slug}">{c.title}</h3>
						<p>{c.summary}</p>
						<span class="result"><strong class="tnum">{c.results[0].value}</strong> {c.results[0].label}</span>
						<span class="more">Read the case study <ArrowRight size={16} aria-hidden="true" /></span>
					</a>
				</li>
			{/each}
		</ul>
		<p class="note">Case studies are anonymised, illustrative examples of our work.</p>
	</div>
</section>

<!-- Reviews -->
<section class="section" aria-labelledby="reviews-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Client reviews</span>
			<h2 id="reviews-title">What our clients say.</h2>
		</div>
		<Reviews />
	</div>
</section>

<!-- Team -->
<section class="section section--tight" aria-labelledby="team-title">
	<div class="container team">
		<Picture
			name="team"
			alt="The J&C Accountants team at the Wyvols Court office in Swallowfield"
			sizes="(min-width: 1024px) 55vw, 100vw"
			class="team-photo smooth"
			style="--radius: var(--r-lg)"
		/>
		<div class="team-copy">
			<span class="eyebrow">The firm</span>
			<h2 id="team-title">An independent practice, run by its directors.</h2>
			<p>
				J&C was founded in {site.founded} and is led by directors {site.directors[0].name} and {site.directors[1].name}. You deal with
				people who know your business — not a call centre and not a different junior every year.
			</p>
			<a href="/about" class="link-arrow">Meet the team <ArrowRight size={18} aria-hidden="true" /></a>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section section--cream" aria-labelledby="faq-title">
	<div class="container faq">
		<div class="section-head">
			<span class="eyebrow">Questions</span>
			<h2 id="faq-title">Frequently asked questions.</h2>
			<p>Can’t find your answer? <a href="/contact#enquiry">Ask us directly</a> — we reply within one working day.</p>
		</div>
		<FaqList {faqs} />
	</div>
</section>

<!-- Areas & map -->
<section class="section" aria-labelledby="areas-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Where we work</span>
			<h2 id="areas-title">Based in Berkshire. Working across the UK.</h2>
			<p class="lede">
				Our office is in Swallowfield, near Reading. We also look after clients throughout
				{#each areas.slice(1) as a, i (a.slug)}<a href="/areas/{a.slug}">{a.name}</a>{i === 0 ? ' and ' : ''}{/each}
				and the rest of the UK.
			</p>
		</div>
		<ul class="area-chips">
			{#each areas as a (a.slug)}
				<li><a href="/areas/{a.slug}" class="chip">{a.name} <ArrowRight size={15} aria-hidden="true" /></a></li>
			{/each}
			<li><a href="/areas" class="chip">Across the UK <ArrowRight size={15} aria-hidden="true" /></a></li>
		</ul>
		<MapCard />
	</div>
</section>

<CtaBand />

<style>
	/* Hero */
	.hero {
		position: relative;
		padding-block: clamp(2.5rem, 1.5rem + 5vw, 6rem) clamp(3rem, 2rem + 5vw, 6.5rem);
		background:
			radial-gradient(ellipse 50% 70% at 95% 10%, rgb(91 20 24 / 0.08), transparent 70%),
			radial-gradient(ellipse 40% 50% at 0% 100%, rgb(232 220 200 / 0.6), transparent 70%),
			var(--paper);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: clamp(2rem, 1rem + 4vw, 5rem);
		align-items: center;
	}
	.hero-copy {
		display: grid;
		gap: 1.5rem;
	}
	.hero h1 {
		font-size: clamp(2.5rem, 1.6rem + 3.6vw, 4.6rem);
		max-width: 14ch;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
	.promise {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.93rem;
		color: var(--muted);
	}
	.promise :global(svg) {
		color: var(--success);
		flex: none;
	}
	.promise strong {
		color: var(--ink);
		font-weight: 600;
	}

	.credentials {
		--radius: var(--r-lg);
		padding: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
		background: var(--brand);
		color: var(--cream);
		box-shadow: var(--shadow-lg);
		position: relative;
		overflow: hidden;
	}
	.credentials::after {
		content: 'J&C';
		position: absolute;
		right: -0.5rem;
		bottom: -3.5rem;
		font-family: var(--font-serif);
		font-size: 11rem;
		line-height: 1;
		color: rgb(243 235 221 / 0.05);
		pointer-events: none;
	}
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 0;
	}
	dl > div {
		display: grid;
		gap: 0.2rem;
		padding: 1.25rem 0.25rem;
		border-bottom: 1px solid rgb(243 235 221 / 0.16);
	}
	dl > div:nth-child(odd) {
		padding-right: 1rem;
		border-right: 1px solid rgb(243 235 221 / 0.16);
	}
	dl > div:nth-child(even) {
		padding-left: 1.25rem;
	}
	dt {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cream-deep);
		opacity: 0.8;
	}
	dd {
		margin: 0;
		font-family: var(--font-serif);
		font-size: clamp(1.8rem, 1.5rem + 1vw, 2.4rem);
		line-height: 1.1;
	}
	.sub {
		font-size: 0.82rem;
		color: rgb(243 235 221 / 0.7);
	}
	.reg {
		position: relative;
		margin-top: 1.25rem;
		font-size: 0.78rem;
		color: rgb(243 235 221 / 0.6);
	}

	/* Software strip */
	.software {
		border-block: 1px solid var(--line);
		background: var(--surface);
	}
	.software-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2.5rem;
		padding-block: 1.5rem;
	}
	.software p {
		font-size: 0.85rem;
		color: var(--muted);
	}
	.software ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 2.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-family: var(--font-serif);
		font-size: 1.2rem;
		color: var(--ink-2);
	}

	.split {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 1rem 2rem;
		max-width: none;
	}
	.split > div {
		display: grid;
		gap: 1rem;
		max-width: 40rem;
	}

	/* Services */
	.services {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.service {
		--radius: var(--r-lg);
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		height: 100%;
		padding: 2rem 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
		text-decoration: none;
		transition:
			border-color 0.25s,
			box-shadow 0.3s var(--ease-out),
			transform 0.3s var(--ease-out);
	}
	.service:hover {
		border-color: var(--line-strong);
		box-shadow: var(--shadow);
		transform: translateY(-3px);
	}
	.service-icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 14px;
		background: var(--cream);
		color: var(--brand);
		margin-bottom: 0.5rem;
	}
	.service p {
		flex: 1;
		color: var(--ink-2);
		font-size: 0.97rem;
	}
	.more {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--brand);
	}
	.more :global(svg) {
		transition: transform 0.25s var(--ease-out);
	}
	a:hover .more :global(svg) {
		transform: translateX(3px);
	}

	/* Audiences */
	.audiences {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(1.5rem, 1rem + 2vw, 3rem);
	}
	.audience {
		display: grid;
		align-content: start;
		gap: 0.85rem;
		padding-top: 1.5rem;
		border-top: 2px solid var(--brand);
		color: var(--brand);
	}
	.audience h3 {
		font-size: var(--step-2);
		margin-top: 0.25rem;
	}
	.audience p {
		color: var(--ink-2);
	}
	.audience ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	/* MTD */
	.mtd {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2rem, 1rem + 5vw, 6rem);
		align-items: center;
	}
	.mtd-copy {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
	}
	.mtd-copy p {
		color: rgb(243 235 221 / 0.82);
		max-width: 34rem;
	}
	.mtd-copy .btn {
		margin-top: 0.5rem;
	}
	.mtd-dates h3 {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cream-deep);
		margin-bottom: 1rem;
	}

	/* Steps */
	.steps {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: step;
	}
	.steps li {
		position: relative;
		display: grid;
		align-content: start;
		gap: 0.75rem;
		padding: 2rem 1.75rem;
		border-radius: var(--r-lg);
		background: var(--surface);
		border: 1px solid var(--line);
		color: var(--brand);
	}
	.step-num {
		position: absolute;
		top: 1.5rem;
		right: 1.75rem;
		font-family: var(--font-serif);
		font-size: 2.25rem;
		line-height: 1;
		color: var(--cream-deep);
	}
	.steps p {
		color: var(--ink-2);
	}

	/* Case studies */
	.cases {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.case {
		--radius: var(--r-lg);
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		height: 100%;
		padding: 2rem 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
		text-decoration: none;
		transition:
			box-shadow 0.3s var(--ease-out),
			transform 0.3s var(--ease-out);
	}
	.case:hover {
		box-shadow: var(--shadow);
		transform: translateY(-3px);
	}
	.case-meta {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--brand);
	}
	.case h3 {
		font-size: var(--step-2);
	}
	.case p {
		flex: 1;
		color: var(--ink-2);
		font-size: 0.97rem;
	}
	.result {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		padding-block: 0.9rem;
		border-block: 1px solid var(--line);
		font-size: 0.9rem;
		color: var(--muted);
	}
	.result strong {
		font-family: var(--font-serif);
		font-size: 1.6rem;
		font-weight: 500;
		color: var(--brand);
	}
	.note {
		margin-top: 1.5rem;
		font-size: 0.85rem;
		color: var(--muted);
	}

	/* Team */
	.team {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: clamp(2rem, 1rem + 4vw, 5rem);
		align-items: center;
	}
	.team-copy {
		display: grid;
		gap: 1.25rem;
		justify-items: start;
	}
	.team-copy p {
		color: var(--ink-2);
		font-size: var(--step-1);
	}

	/* FAQ */
	.faq {
		display: grid;
		grid-template-columns: 1fr 1.6fr;
		gap: clamp(2rem, 1rem + 4vw, 5rem);
		align-items: start;
	}
	.faq .section-head a {
		color: var(--brand);
	}

	/* Areas */
	.section-head a {
		color: var(--brand);
		text-underline-offset: 3px;
	}
	.area-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0 0 2rem;
		padding: 0;
		list-style: none;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		min-height: 44px;
		padding: 0 1.1rem;
		border: 1px solid var(--line-strong);
		border-radius: 99px;
		background: var(--surface);
		font-weight: 500;
		text-decoration: none;
		transition:
			border-color 0.2s,
			color 0.2s;
	}
	.chip:hover {
		border-color: var(--brand);
		color: var(--brand);
	}

	@media (max-width: 1023px) {
		.hero-grid,
		.mtd,
		.team,
		.faq {
			grid-template-columns: 1fr;
		}
		.audiences,
		.steps {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 479px) {
		.hero-actions .btn {
			flex: 1 1 100%;
		}
	}
</style>
