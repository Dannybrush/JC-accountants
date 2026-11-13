export type Toast = {
	id: number;
	message: string;
	tone: 'neutral' | 'success';
	undo?: () => void;
	duration: number;
};

let nextId = 0;
const timers = new Map<number, ReturnType<typeof setTimeout>>();

export const toasts = $state<Toast[]>([]);

export function dismiss(id: number) {
	clearTimeout(timers.get(id));
	timers.delete(id);
	const i = toasts.findIndex((t) => t.id === id);
	if (i !== -1) toasts.splice(i, 1);
}

/** Show a toast. Pass `undo` to offer an Undo action; the toast then stays a little longer. */
export function toast(message: string, opts: { undo?: () => void; tone?: Toast['tone']; duration?: number } = {}) {
	const id = ++nextId;
	const duration = opts.duration ?? (opts.undo ? 6000 : 4000);
	toasts.push({ id, message, tone: opts.tone ?? 'neutral', undo: opts.undo, duration });
	if (toasts.length > 3) dismiss(toasts[0].id);
	timers.set(id, setTimeout(() => dismiss(id), duration));
	return id;
}

/** Pause/resume auto-dismiss while the pointer or focus is on the toast region. */
export function hold(id: number) {
	clearTimeout(timers.get(id));
}
export function release(id: number) {
	const t = toasts.find((t) => t.id === id);
	if (t) timers.set(id, setTimeout(() => dismiss(id), 2500));
}
