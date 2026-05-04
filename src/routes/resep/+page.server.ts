import type { PageServerLoad } from './$types';
import { getMenus, getCategories } from '$lib/api';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 9;
	const category_id = url.searchParams.get('category_id') || undefined;

	const [menusData, categories] = await Promise.all([
		getMenus(fetch, page, limit, category_id),
		getCategories(fetch)
	]);

	return {
		menus: menusData.menus,
		pagination: {
			totalItems: menusData.totalItems,
			totalPages: menusData.totalPages,
			currentPage: menusData.currentPage,
			itemsPerPage: menusData.itemsPerPage
		},
		categories,
		selectedCategoryId: category_id
	};
};
