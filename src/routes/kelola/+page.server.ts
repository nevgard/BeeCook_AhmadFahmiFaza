import type { PageServerLoad } from './$types';
import { getMenus } from '$lib/api';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const limit = 10;
	const menusData = await getMenus(fetch, page, limit);

	return {
		menus: menusData.menus,
		pagination: {
			totalItems: menusData.totalItems,
			totalPages: menusData.totalPages,
			currentPage: menusData.currentPage,
			itemsPerPage: menusData.itemsPerPage
		}
	};
};
