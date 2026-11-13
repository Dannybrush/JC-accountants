import { json } from '@sveltejs/kit';
import { reviews } from '$lib/content/reviews';

export const prerender = false;

// Reviews are served from the edge cache and refreshed in the background (stale-while-revalidate),
// so this can later fetch live Google reviews (Places API) without slowing any page down.
export function GET() {
	return json(
		{ reviews, updated: new Date().toISOString() },
		{
			headers: {
				'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
				'CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
			}
		}
	);
}
