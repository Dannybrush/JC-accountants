import { goto, pushState } from '$app/navigation';
import { page } from '$app/state';

// Sheets are tied to history via shallow routing, so the system back gesture (including Android's
// predictive back) closes the open sheet instead of leaving the page.

export function openSheet(sheet: NonNullable<App.PageState['sheet']>) {
	if (page.state.sheet === sheet) return;
	pushState('', { sheet });
}

export function closeSheet() {
	if (page.state.sheet) history.back();
}

/** Close the sheet (popping its history entry) before navigating, so Back never reopens it. */
export async function navigateFromSheet(href: string) {
	if (page.state.sheet) {
		const popped = new Promise((resolve) => addEventListener('popstate', resolve, { once: true }));
		history.back();
		await popped;
	}
	await goto(href);
}

export const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
