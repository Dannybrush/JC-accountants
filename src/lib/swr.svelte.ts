// Minimal stale-while-revalidate for client fetches: show the cached copy instantly (if any),
// then refetch in the background and swap in the fresh data.

export function swr<T>(url: string, { maxAge = 1000 * 60 * 60 * 24 } = {}) {
	const key = `swr:${url}`;
	const state = $state<{ data: T | null; error: boolean; revalidating: boolean }>({
		data: null,
		error: false,
		revalidating: false
	});

	async function revalidate() {
		state.revalidating = true;
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error(String(res.status));
			const data = (await res.json()) as T;
			state.data = data;
			state.error = false;
			try {
				localStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
			} catch {
				/* storage full or blocked — cache is optional */
			}
		} catch {
			// Keep showing stale data if we have it; only surface an error when there is nothing to show
			if (!state.data) state.error = true;
		} finally {
			state.revalidating = false;
		}
	}

	$effect(() => {
		try {
			const cached = JSON.parse(localStorage.getItem(key) ?? 'null');
			if (cached && Date.now() - cached.at < maxAge) state.data = cached.data;
		} catch {
			/* ignore corrupt cache */
		}
		revalidate();
	});

	return state;
}
