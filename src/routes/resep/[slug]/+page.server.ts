import type { PageServerLoad } from './$types';
import { getMenuDetail } from '$lib/api';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const menu = await getMenuDetail(fetch, params.slug);
		return { menu };
	} catch (e) {
		error(404, 'Resep tidak ditemukan');
	}
};
