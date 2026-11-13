<script lang="ts">
	import Clock from 'lucide-svelte/icons/clock';
	import Handshake from 'lucide-svelte/icons/handshake';
	import ShieldCheck from 'lucide-svelte/icons/shield-check';
	import Target from 'lucide-svelte/icons/target';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Picture from '$lib/components/Picture.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { site, yearsTrading } from '$lib/site';
	import { breadcrumbs, localBusiness } from '$lib/schema';

	const crumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'About us', href: '/about' }
	];

	// TODO: replace bios with wording approved by each director
	const people = [
		{
			name: 'Clifford Rumble',
			image: 'clifford-rumble' as const,
			role: `Director · since ${site.founded}`,
			bio: 'Clifford founded J&C Accountants in 2010 and has guided the practice ever since. He works closely with owner-managed companies and contractors on year-end accounts, tax planning and the decisions that shape a business.'
		},
		{
			name: 'Joanne Wilson',
			image: 'joanne-wilson' as const,
			role: 'Director · since 2013',
			bio: 'Joanne has been a director of J&C since 2013. She leads the firm’s bookkeeping, VAT and Making Tax Digital work, making sure every client’s records are accurate, current and filed on time.'
		}
	];

	const values = [
		{ icon: Target, title: 'Accuracy first', text: 'Every set of accounts is reviewed before it leaves the office. We would rather ask one more question than file one wrong figure.' },
		{ icon: Clock, title: 'Early, not on time', text: 'We work to our own deadlines, well ahead of HMRC’s, so you know your position months before payment is due.' },
		{ icon: Handshake, title: 'Plain English', text: 'You will always understand what we have done, what you owe and why. No jargon, no surprises.' },
		{ icon: ShieldCheck, title: 'Discretion', text: 'Your financial affairs are handled confidentially and stored securely, in line with UK GDPR.' }
	];
</script>

<Seo
	title="About Us — An Independent Practice Since 2010"
	description="J&C Accountants is an independent accountancy practice founded in 2010 and led by directors Clifford Rumble and Joanne Wilson, based at Wyvols Court, Swallowfield."
	image="about"
	schema={[breadcrumbs(crumbs), localBusiness()]}
/>

<PageHero
	{crumbs}
	eyebrow="About us"
	title="An independent practice, run by its directors since {site.founded}."
	lede="For {yearsTrading} years, J&C has looked after businesses, landlords and contractors who value accuracy, reliability and an accountant they can actually reach."
/>

<section class="section section--tight">
	<div class="container">
		<Picture
			name="team"
			alt="Directors Clifford Rumble and Joanne Wilson with the J&C Accountants team at Wyvols Court"
			sizes="(min-width: 1260px) 1216px, 100vw"
			eager
			class="smooth"
			style="--radius: var(--r-lg)"
		/>
		<div class="story">
			<h2>Our story</h2>
			<div class="prose">
				<p>
					J & C Accountants Limited was incorporated in April {site.founded}. From the start the idea was simple: offer owner-managed
					businesses the standard of work they would expect from a much larger firm, with the personal attention only a small practice can
					give.
				</p>
				<p>
					That has not changed. Today we act for clients across the UK from our office at Wyvols Court in Swallowfield, with particular
					strength in Berkshire, Sheffield and Weymouth. Many of our clients have been with us for years — which we take as the best
					measure of how we are doing.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="section section--cream" aria-labelledby="people-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Leadership</span>
			<h2 id="people-title">The directors.</h2>
		</div>
		<div class="people">
			{#each people as p (p.name)}
				<article class="person">
					<Picture name={p.image} alt="Portrait of {p.name}, {p.role.split(' ·')[0]} at J&C Accountants" sizes="(min-width: 900px) 280px, 40vw" class="smooth" style="--radius: var(--r-lg)" />
					<div>
						<h3>{p.name}</h3>
						<p class="role">{p.role}</p>
						<p>{p.bio}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section" aria-labelledby="values-title">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">How we work</span>
			<h2 id="values-title">What you can expect from us.</h2>
		</div>
		<ul class="values">
			{#each values as v (v.title)}
				<li>
					<v.icon size={26} aria-hidden="true" />
					<h3>{v.title}</h3>
					<p>{v.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="section section--tight">
	<div class="container company smooth">
		<h2>Company information</h2>
		<dl>
			<div><dt>Registered name</dt><dd>{site.legalName}</dd></div>
			<div><dt>Company number</dt><dd class="tnum"><a href="https://find-and-update.company-information.service.gov.uk/company/{site.companyNumber}" target="_blank" rel="noopener">{site.companyNumber}</a></dd></div>
			<div><dt>Incorporated</dt><dd class="tnum">8 April {site.founded}</dd></div>
			<div><dt>Registered office</dt><dd>{site.address.lines.join(', ')}, {site.address.locality} <span class="tnum">{site.address.postcode}</span></dd></div>
		</dl>
	</div>
</section>

<CtaBand />

<style>
	.story {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 2rem;
		margin-top: clamp(2.5rem, 2rem + 2vw, 4rem);
	}
	.story .prose {
		font-size: var(--step-1);
	}
	.people {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(2rem, 1rem + 3vw, 4rem);
	}
	.person {
		display: grid;
		grid-template-columns: minmax(140px, 240px) 1fr;
		gap: 1.75rem;
		align-items: start;
	}
	.person h3 {
		font-size: var(--step-2);
	}
	.role {
		margin: 0.35rem 0 1rem;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: var(--brand);
	}
	.person p:last-child {
		color: var(--ink-2);
	}
	.values {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.values li {
		display: grid;
		align-content: start;
		gap: 0.75rem;
		color: var(--brand);
	}
	.values p {
		color: var(--ink-2);
		font-size: 0.97rem;
	}
	.company {
		--radius: var(--r-lg);
		padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
		background: var(--surface);
		border: 1px solid var(--line);
	}
	.company h2 {
		font-size: var(--step-2);
		margin-bottom: 1.5rem;
	}
	.company dl {
		display: grid;
		grid-template-columns: repeat(4, auto);
		gap: 1.5rem 2.5rem;
		margin: 0;
	}
	.company dt {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.company dd {
		margin: 0.3rem 0 0;
	}
	.company a {
		color: var(--brand);
	}
	@media (max-width: 1023px) {
		.story,
		.people {
			grid-template-columns: 1fr;
		}
		.values,
		.company dl {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 599px) {
		.person {
			grid-template-columns: 120px 1fr;
			gap: 1.25rem;
		}
		.values,
		.company dl {
			grid-template-columns: 1fr;
		}
	}
</style>
