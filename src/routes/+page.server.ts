import type { PageServerLoad } from './$types';
import { getCategories } from '$lib/api';

export const load: PageServerLoad = async ({ fetch }) => {
	const categories = await getCategories(fetch);
	return { categories };
};
