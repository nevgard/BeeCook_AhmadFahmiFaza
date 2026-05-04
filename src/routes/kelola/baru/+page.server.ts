import type { PageServerLoad, Actions } from './$types';
import { getCategories, createMenu } from '$lib/api';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { menuSchema } from '$lib/schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const categories = await getCategories(fetch);
	
	// Default form values
	const initialData = {
		ingredients: [{ description: '' }],
		recipes: [{ description: '', sort_number: '1' }]
	};

	const form = await superValidate(initialData, zod4(menuSchema));

	return { form, categories };
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod4(menuSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// Ensure recipes sort_number is string
			form.data.recipes = form.data.recipes.map((r, i) => ({
				...r,
				sort_number: (i + 1).toString()
			}));

			await createMenu(fetch, form.data);
		} catch (error: any) {
			return fail(500, { form, message: error.message });
		}

		throw redirect(303, '/kelola');
	}
};
