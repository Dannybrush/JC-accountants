import { browser } from '$app/environment';
const GA_ID: string | undefined = import.meta.env.PUBLIC_GA_ID;

// Analytics consent. Google Analytics is never loaded until the visitor opts in (UK GDPR / PECR).
// The choice is stored in localStorage; the banner reappears after 12 months.

type Choice = 'granted' | 'denied';
const KEY = 'jc-consent';
const MAX_AGE = 1000 * 60 * 60 * 24 * 365;

export const consent = $state<{ analytics: Choice | null; settingsOpen: boolean }>({
	analytics: null,
	settingsOpen: false
});

export const analyticsEnabled = () => Boolean(GA_ID);

export function loadConsent() {
	if (!browser) return;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return;
		const { analytics, at } = JSON.parse(raw);
		if (Date.now() - at < MAX_AGE) consent.analytics = analytics;
	} catch {
		// Storage unavailable (private mode): ask again next visit.
	}
	if (consent.analytics === 'granted') startAnalytics();
}

/** Applied immediately (optimistically) — persistence happens in the background and can fail silently. */
export function setConsent(analytics: Choice) {
	consent.analytics = analytics;
	consent.settingsOpen = false;
	try {
		localStorage.setItem(KEY, JSON.stringify({ analytics, at: Date.now() }));
	} catch {
		// Non-fatal; the choice still applies for this visit.
	}
	if (analytics === 'granted') startAnalytics();
	else stopAnalytics();
}

export function resetConsent() {
	consent.analytics = null;
	try {
		localStorage.removeItem(KEY);
	} catch {
		/* ignore */
	}
}

let started = false;
function startAnalytics() {
	const id = GA_ID;
	if (!id || started) {
		if (started) window.gtag('consent', 'update', { analytics_storage: 'granted' });
		return;
	}
	started = true;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () {
		// gtag requires the arguments object itself, not a spread array
		// eslint-disable-next-line prefer-rest-params
		window.dataLayer.push(arguments);
	};
	window.gtag('consent', 'default', {
		analytics_storage: 'granted',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
	window.gtag('js', new Date());
	window.gtag('config', id, { anonymize_ip: true, send_page_view: false });
	const s = document.createElement('script');
	s.async = true;
	s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
	document.head.append(s);
}

function stopAnalytics() {
	if (!started) return;
	window.gtag('consent', 'update', { analytics_storage: 'denied' });
	// Remove first-party GA cookies already set
	for (const c of document.cookie.split(';')) {
		const name = c.split('=')[0].trim();
		if (name.startsWith('_ga')) {
			document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`;
			document.cookie = `${name}=; Max-Age=0; path=/`;
		}
	}
}

export function trackPageView(path: string, title: string) {
	if (started && consent.analytics === 'granted') {
		window.gtag('event', 'page_view', { page_path: path, page_title: title, page_location: location.href });
	}
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
	if (started && consent.analytics === 'granted') window.gtag('event', name, params);
}
