import { PUBLIC_API_BASE_URL } from '$env/static/public';

const BASE = PUBLIC_API_BASE_URL;

export interface Category {
	id: number;
	name: string;
	slug: string;
	image: string;
	file_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface Menu {
	id: number;
	name: string;
	description: string;
	cooking_duration: number;
	slug: string;
	image: string;
	file_id: string;
	category_id: number;
	createdAt: string;
	updatedAt: string;
	category: { name: string; slug: string };
}

export interface Ingredient {
	id: number;
	description: string;
}

export interface Recipe {
	id: number;
	description: string;
	sort_number: number;
}

export interface Nutrition {
	id: number;
	calory: number;
	protein: number;
	carbohydrate: number;
	fat: number;
}

export interface MenuDetail extends Menu {
	ingredients: Ingredient[];
	recipes: Recipe[];
	nutrition: Nutrition;
}

export interface MenuListResponse {
	menus: Menu[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
	itemsPerPage: number;
}

export function getImageUrl(fileId: string): string {
	if (!fileId) return '/assets/hero-image.png';
	return `https://lh3.googleusercontent.com/d/${fileId}`;
}

export async function getCategories(fetch: typeof globalThis.fetch): Promise<Category[]> {
	const res = await fetch(`${BASE}/category`);
	if (!res.ok) throw new Error('Failed to fetch categories');
	const json = await res.json();
	return json.data.categories;
}

export async function getMenus(
	fetch: typeof globalThis.fetch,
	page = 1,
	limit = 9,
	category_id?: number | string
): Promise<MenuListResponse> {
	let url = `${BASE}/menu?page=${page}&limit=${limit}`;
	if (category_id) url += `&category_id=${category_id}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error('Failed to fetch menus');
	const json = await res.json();
	return json.data;
}

export async function getMenuDetail(
	fetch: typeof globalThis.fetch,
	slug: string
): Promise<MenuDetail> {
	const res = await fetch(`${BASE}/menu/detail/${slug}`);
	if (!res.ok) throw new Error('Failed to fetch menu detail');
	const json = await res.json();
	return json.data.menu;
}

export async function getMenuById(
	fetch: typeof globalThis.fetch,
	id: number | string
): Promise<MenuDetail> {
	const res = await fetch(`${BASE}/menu/find/${id}`);
	if (!res.ok) throw new Error('Failed to fetch menu');
	const json = await res.json();
	return json.data.menu;
}

export async function createMenu(
	fetch: typeof globalThis.fetch,
	data: {
		name: string;
		description: string;
		cooking_duration: string;
		category_id: string;
		ingredients: { description: string }[];
		recipes: { description: string; sort_number: string }[];
		nutritions: { calory: string; protein: string; carbohydrate: string; fat: string };
	}
) {
	const res = await fetch(`${BASE}/menu`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || 'Failed to create menu');
	}
	return res.json();
}

export async function updateMenu(
	fetch: typeof globalThis.fetch,
	id: number | string,
	data: {
		name: string;
		description: string;
		cooking_duration: string;
		category_id: string;
		ingredients: { description: string }[];
		recipes: { description: string; sort_number: string }[];
		nutritions: { calory: string; protein: string; carbohydrate: string; fat: string };
	}
) {
	const res = await fetch(`${BASE}/menu/update/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || 'Failed to update menu');
	}
	return res.json();
}

export async function deleteMenu(fetch: typeof globalThis.fetch, id: number | string) {
	const res = await fetch(`${BASE}/menu/delete/${id}`, { method: 'DELETE' });
	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || 'Failed to delete menu');
	}
	return res.json();
}

export async function uploadMenuImage(fetch: typeof globalThis.fetch, id: number | string, file: File) {
	const formData = new FormData();
	formData.append('image', file);
	const res = await fetch(`${BASE}/menu/upload/${id}`, {
		method: 'PUT',
		body: formData
	});
	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || 'Failed to upload image');
	}
	return res.json();
}
