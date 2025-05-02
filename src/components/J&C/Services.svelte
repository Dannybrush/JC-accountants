<script>
	import { Briefcase, BarChart, ShieldCheck } from 'lucide-svelte';

	const services = [
		{
			icon: Briefcase,
			title: 'Tax Consulting',
			description: 'Receive expert advice to optimise your tax strategy.'
		},
		{
            icon: BarChart,
			title: 'Financial Planning',
			description: 'Build a secure financial future with tailored planning.'
		},
		{
			icon: ShieldCheck,
			title: 'Audit & Assurance',
			description: 'Ensure compliance, accuracy, and peace of mind.'
		}
	];
</script>

<section id="services" class="services">
	<div class="container">
		<h2>Our Services</h2>
		<p class="intro">Professional financial solutions tailored for businesses and individuals.</p>
		<div class="service-list">
			{#each services as { icon: Icon, title, description }}
				<div class="service-item">
					<div class="icon-wrapper"><Icon size="40" /></div>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.services {
		background-color: var(--accent-color);
		padding: 5rem 2rem;
		border-top: 5px solid var(--primary-color);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	h2 {
		font-size: 2.75rem;
		font-weight: 700;
		color: var(--primary-color);
		margin-bottom: 0.5rem;
	}

	.intro {
		font-size: 1.2rem;
		color: #f4f4f4;
		margin-bottom: 3rem;
	}

	.service-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.service-item {
		background-color: #fff;
		padding: 2.5rem;
		border-radius: var(--border-radius);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.service-item:hover {
		transform: translateY(-6px);
		box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
	}

	h3 {
		font-size: 1.6rem;
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.05rem;
		color: #333;
		line-height: 1.6;
	}

	.icon-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		color: var(--primary-color);
	}

	.service-item svg {
		stroke-width: 2;
	}
</style>
