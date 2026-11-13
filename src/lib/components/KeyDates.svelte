<script lang="ts">
	import { upcoming } from '$lib/content/key-dates';

	// Pre-rendered with the build date, then refreshed on load so the list is never out of date
	let now = $state(__BUILD_TIME__);
	const dates = $derived(upcoming(new Date(now)));
	$effect(() => {
		now = Date.now();
	});

	const day = new Intl.DateTimeFormat('en-GB', { day: '2-digit' });
	const month = new Intl.DateTimeFormat('en-GB', { month: 'short' });
	const full = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
	const daysUntil = (d: Date) => Math.ceil((+d - now) / 86_400_000);
</script>

<ol class="dates">
	{#each dates as d (d.title + d.date.toISOString())}
		<li>
			<time datetime={d.date.toISOString().slice(0, 10)} aria-label={full.format(d.date)}>
				<span class="day">{day.format(d.date)}</span>
				<span class="month">{month.format(d.date)}</span>
			</time>
			<div>
				<strong>{d.title}</strong>
				<span>{d.detail}</span>
			</div>
			<span class="countdown tnum">{daysUntil(d.date) <= 0 ? 'Today' : `${daysUntil(d.date)} days`}</span>
		</li>
	{/each}
</ol>

<style>
	.dates {
		margin: 0;
		padding: 0;
		list-style: none;
		border-top: 1px solid rgb(243 235 221 / 0.18);
	}
	li {
		display: grid;
		grid-template-columns: 4.25rem 1fr auto;
		align-items: center;
		gap: 1.25rem;
		padding-block: 1.1rem;
		border-bottom: 1px solid rgb(243 235 221 / 0.18);
	}
	time {
		display: grid;
		justify-items: center;
		line-height: 1;
	}
	.day {
		font-family: var(--font-serif);
		font-size: 2rem;
		color: var(--cream);
	}
	.month {
		margin-top: 0.25rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cream-deep);
	}
	div {
		display: grid;
		gap: 0.15rem;
	}
	strong {
		color: var(--cream);
		font-weight: 600;
	}
	div span {
		font-size: 0.9rem;
		color: rgb(243 235 221 / 0.7);
	}
	.countdown {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--cream-deep);
		text-align: right;
	}
</style>
