import type { PageServerLoad, Actions } from './$types';
import { getCategories, getMenuById, updateMenu } from '$lib/api';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { menuSchema } from '$lib/schema';
import { fail, redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const [categories, menu] = await Promise.all([
			getCategories(fetch),
			getMenuById(fetch, params.id)
		]);
		
		// Map menu data to form schema safely
		const initialData = {
			name: menu.name || '',
			description: menu.description || '',
			cooking_duration: menu.cooking_duration ? menu.cooking_duration.toString() : '0',
			category_id: menu.category_id ? menu.category_id.toString() : '',
			ingredients: menu.ingredients && menu.ingredients.length > 0 
				? menu.ingredients.map(i => ({ description: i.description }))
				: [{ description: '' }],
			recipes: menu.recipes && menu.recipes.length > 0
				? [...menu.recipes].sort((a, b) => a.sort_number - b.sort_number).map(r => ({ description: r.description, sort_number: r.sort_number.toString() }))
				: [{ description: '', sort_number: '1' }],
			nutritions: menu.nutrition ? {
				calory: menu.nutrition.calory.toString(),
				protein: menu.nutrition.protein.toString(),
				carbohydrate: menu.nutrition.carbohydrate.toString(),
				fat: menu.nutrition.fat.toString()
			} : { calory: '0', protein: '0', carbohydrate: '0', fat: '0' }
		};

		const form = await superValidate(initialData, zod4(menuSchema));

		return { form, categories, id: params.id };
	} catch (e) {
		console.error('ERROR in load kelola/edit/[id]:', e);
		error(404, 'Resep tidak ditemukan');
	}
};

export const actions: Actions = {
	default: async ({ request, fetch, params }) => {
		const form = await superValidate(request, zod4(menuSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			form.data.recipes = form.data.recipes.map((r, i) => ({
				...r,
				sort_number: (i + 1).toString()
			}));

			await updateMenu(fetch, params.id, form.data);
		} catch (error: any) {
			return fail(500, { form, message: error.message });
		}

		throw redirect(303, '/kelola');
	}
};
