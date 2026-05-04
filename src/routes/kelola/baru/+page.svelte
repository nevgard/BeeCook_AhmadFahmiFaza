<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { menuSchema } from '$lib/schema';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(menuSchema),
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'redirect') {
				toast.success('Resep berhasil dibuat!');
			} else if (result.type === 'failure') {
				toast.error(result.data?.message || 'Gagal menyimpan resep. Cek kembali form Anda.');
			}
		}
	});

	function addIngredient() {
		$form.ingredients = [...$form.ingredients, { description: '' }];
	}

	function removeIngredient(index: number) {
		if ($form.ingredients.length > 1) {
			$form.ingredients = $form.ingredients.filter((_, i) => i !== index);
		}
	}

	function addRecipe() {
		$form.recipes = [...$form.recipes, { description: '', sort_number: ($form.recipes.length + 1).toString() }];
	}

	function removeRecipe(index: number) {
		if ($form.recipes.length > 1) {
			$form.recipes = $form.recipes.filter((_, i) => i !== index);
		}
	}
</script>

<svelte:head>
	<title>Buat Resep Baru - BeeCook</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
	<h1 class="text-3xl font-bold text-navy-900 mb-8">Buat Resep Baru</h1>

	<form method="POST" use:enhance class="space-y-8 fade-in">
		
		<!-- Informasi Utama -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
			<h2 class="text-xl font-bold text-navy-900 mb-6">Informasi Utama</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nama Resep</label>
						<input
							type="text"
							id="name"
							name="name"
							bind:value={$form.name}
							placeholder="Nama Resep"
							class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
						/>
						{#if $errors.name}<p class="mt-1 text-sm text-red-500">{$errors.name}</p>{/if}
					</div>

					<div>
						<label for="category_id" class="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
						<div class="relative">
							<select
								id="category_id"
								name="category_id"
								bind:value={$form.category_id}
								class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none transition-colors"
							>
								<option value="" disabled selected>Kategori</option>
								{#each data.categories as category}
									<option value={category.id.toString()}>{category.name}</option>
								{/each}
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
							</div>
						</div>
						{#if $errors.category_id}<p class="mt-1 text-sm text-red-500">{$errors.category_id}</p>{/if}
					</div>

					<div>
						<label for="cooking_duration" class="block text-sm font-semibold text-gray-700 mb-2">Durasi Masak (menit)</label>
						<input
							type="text"
							inputmode="numeric"
							id="cooking_duration"
							name="cooking_duration"
							bind:value={$form.cooking_duration}
							placeholder="60"
							class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
						/>
						{#if $errors.cooking_duration}<p class="mt-1 text-sm text-red-500">{$errors.cooking_duration}</p>{/if}
					</div>
				</div>

				<div>
					<label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
					<textarea
						id="description"
						name="description"
						bind:value={$form.description}
						placeholder="Isi deskripsi singkat tentang makanan"
						rows="8"
						class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
					></textarea>
					{#if $errors.description}<p class="mt-1 text-sm text-red-500">{$errors.description}</p>{/if}
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Bahan-bahan -->
			<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-xl font-bold text-navy-900">Bahan - Bahan</h2>
					<button
						type="button"
						onclick={addIngredient}
						class="px-3 py-1.5 text-xs font-medium text-navy-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors border border-gray-200"
					>
						Tambah Bahan
					</button>
				</div>
				
				<div class="space-y-3">
					{#each $form.ingredients as _, i}
						<div class="flex gap-2">
							<input
								type="text"
								bind:value={$form.ingredients[i].description}
								placeholder={`Bahan ${i + 1}`}
								class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm"
							/>
							<button
								type="button"
								aria-label="Hapus Bahan"
								onclick={() => removeIngredient(i)}
								class="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 disabled:opacity-50"
								disabled={$form.ingredients.length === 1}
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
							</button>
						</div>
						{#if $errors.ingredients?.[i]?.description}
							<p class="text-xs text-red-500">{$errors.ingredients[i].description}</p>
						{/if}
					{/each}
				</div>
			</div>

			<!-- Instruksi Masak -->
			<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-xl font-bold text-navy-900">Instruksi Masak</h2>
					<button
						type="button"
						onclick={addRecipe}
						class="px-3 py-1.5 text-xs font-medium text-navy-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors border border-gray-200"
					>
						Tambah Instruksi
					</button>
				</div>
				
				<div class="space-y-3">
					{#each $form.recipes as _, i}
						<div class="flex gap-2">
							<input
								type="text"
								bind:value={$form.recipes[i].description}
								placeholder={`Instruksi ${i + 1}`}
								class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm"
							/>
							<button
								type="button"
								aria-label="Hapus Instruksi"
								onclick={() => removeRecipe(i)}
								class="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 disabled:opacity-50"
								disabled={$form.recipes.length === 1}
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
							</button>
						</div>
						{#if $errors.recipes?.[i]?.description}
							<p class="text-xs text-red-500">{$errors.recipes[i].description}</p>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Informasi Nutrisi -->
		<div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
			<h2 class="text-xl font-bold text-navy-900 mb-6">Informasi Nutrisi</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				<div>
					<label for="calory" class="block text-sm font-semibold text-gray-700 mb-2">Kalori (kcal)</label>
					<input
						type="text"
						inputmode="numeric"
						id="calory"
						bind:value={$form.nutritions.calory}
						placeholder="0"
						class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
					/>
					{#if $errors.nutritions?.calory}<p class="mt-1 text-xs text-red-500">{$errors.nutritions.calory}</p>{/if}
				</div>
				<div>
					<label for="protein" class="block text-sm font-semibold text-gray-700 mb-2">Protein (g)</label>
					<input
						type="text"
						inputmode="numeric"
						id="protein"
						bind:value={$form.nutritions.protein}
						placeholder="0"
						class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
					/>
					{#if $errors.nutritions?.protein}<p class="mt-1 text-xs text-red-500">{$errors.nutritions.protein}</p>{/if}
				</div>
				<div>
					<label for="carbohydrate" class="block text-sm font-semibold text-gray-700 mb-2">Karbohidrat (g)</label>
					<input
						type="text"
						inputmode="numeric"
						id="carbohydrate"
						bind:value={$form.nutritions.carbohydrate}
						placeholder="0"
						class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
					/>
					{#if $errors.nutritions?.carbohydrate}<p class="mt-1 text-xs text-red-500">{$errors.nutritions.carbohydrate}</p>{/if}
				</div>
				<div>
					<label for="fat" class="block text-sm font-semibold text-gray-700 mb-2">Lemak (g)</label>
					<input
						type="text"
						inputmode="numeric"
						id="fat"
						bind:value={$form.nutritions.fat}
						placeholder="0"
						class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
					/>
					{#if $errors.nutritions?.fat}<p class="mt-1 text-xs text-red-500">{$errors.nutritions.fat}</p>{/if}
				</div>
			</div>
		</div>

		<div class="flex justify-end pt-4">
			<button
				type="submit"
				disabled={$submitting}
				class="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold rounded-lg shadow-md transition-colors w-full md:w-auto"
			>
				{$submitting ? 'Menyimpan...' : 'Simpan Resep'}
			</button>
		</div>

	</form>
</div>
