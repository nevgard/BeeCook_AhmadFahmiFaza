<script lang="ts">
	import type { PageData } from './$types';
	import { getImageUrl } from '$lib/api';

	let { data }: { data: PageData } = $props();
	let menu = $derived(data.menu);
</script>

<svelte:head>
	<title>{menu.name} - BeeCook</title>
	<meta name="description" content={menu.description} />
</svelte:head>

<!-- Hero Section -->
<div class="relative w-full h-[50vh] md:h-[60vh] bg-gray-900 overflow-hidden">
	<img
		src={getImageUrl(menu.file_id)}
		alt={menu.name}
		class="absolute inset-0 w-full h-full object-cover opacity-80"
		referrerpolicy="no-referrer"
	/>
	<div class="absolute inset-0 bg-gradient-to-t from-white via-black/20 to-black/40"></div>
	
	<div class="absolute bottom-0 left-0 w-full">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
			<span class="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-md mb-4 shadow-sm uppercase tracking-wider">
				{menu.category?.name || 'Kategori'}
			</span>
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy-900 drop-shadow-md mb-6 leading-tight">
				{menu.name}
			</h1>
			
			<div class="flex items-center gap-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg inline-flex max-w-full overflow-x-auto">
				<div class="flex items-center gap-3">
					<div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
					</div>
					<div>
						<p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Kategori</p>
						<p class="font-bold text-navy-900 whitespace-nowrap">{menu.category?.name || '-'}</p>
					</div>
				</div>
				<div class="w-px h-10 bg-gray-200 shrink-0"></div>
				<div class="flex items-center gap-3">
					<div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<div>
						<p class="text-xs text-gray-500 font-medium uppercase tracking-wider">Durasi</p>
						<p class="font-bold text-navy-900 whitespace-nowrap">{menu.cooking_duration} menit</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
	
	<!-- Description -->
	<div class="mb-16 fade-in">
		<p class="text-lg text-gray-600 leading-relaxed font-light">{menu.description}</p>
	</div>

	<!-- Nutrition -->
	{#if menu.nutrition}
		<div class="mb-16 fade-in">
			<h2 class="text-2xl font-bold text-navy-900 mb-6">Informasi Nutrisi</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div class="bg-white border-2 border-amber-100 rounded-2xl p-6 text-center hover:border-amber-400 transition-colors shadow-sm">
					<p class="text-3xl font-black text-navy-900 mb-1">{menu.nutrition.calory} <span class="text-lg">kcal</span></p>
					<p class="text-sm font-medium text-gray-500">Kalori</p>
				</div>
				<div class="bg-white border-2 border-amber-100 rounded-2xl p-6 text-center hover:border-amber-400 transition-colors shadow-sm">
					<p class="text-3xl font-black text-navy-900 mb-1">{menu.nutrition.protein} <span class="text-lg">g</span></p>
					<p class="text-sm font-medium text-gray-500">Protein</p>
				</div>
				<div class="bg-white border-2 border-amber-100 rounded-2xl p-6 text-center hover:border-amber-400 transition-colors shadow-sm">
					<p class="text-3xl font-black text-navy-900 mb-1">{menu.nutrition.fat} <span class="text-lg">g</span></p>
					<p class="text-sm font-medium text-gray-500">Lemak</p>
				</div>
				<div class="bg-white border-2 border-amber-100 rounded-2xl p-6 text-center hover:border-amber-400 transition-colors shadow-sm">
					<p class="text-3xl font-black text-navy-900 mb-1">{menu.nutrition.carbohydrate} <span class="text-lg">g</span></p>
					<p class="text-sm font-medium text-gray-500">Karbohidrat</p>
				</div>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-12 gap-12">
		<!-- Ingredients -->
		<div class="md:col-span-5 fade-in">
			<h2 class="text-2xl font-bold text-navy-900 mb-6">Bahan-bahan</h2>
			<ul class="space-y-4">
				{#each menu.ingredients as ingredient}
					<li class="flex items-start gap-3">
						<div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
						<span class="text-gray-700 leading-relaxed">{ingredient.description}</span>
					</li>
				{:else}
					<li class="text-gray-500 italic">Data bahan belum tersedia.</li>
				{/each}
			</ul>
		</div>

		<!-- Instructions -->
		<div class="md:col-span-7 fade-in">
			<h2 class="text-2xl font-bold text-navy-900 mb-6">Cara Masak</h2>
			<div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-200 before:to-transparent">
				{#each [...menu.recipes].sort((a, b) => a.sort_number - b.sort_number) as recipe, index}
					<div class="relative flex items-start gap-6 group">
						<div class="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-400 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-amber-500 transition-all">
							{index + 1}
						</div>
						<div class="pt-2 md:pt-3">
							<p class="text-gray-700 leading-relaxed group-hover:text-navy-900 transition-colors">{recipe.description}</p>
						</div>
					</div>
				{:else}
					<p class="text-gray-500 italic">Data instruksi masak belum tersedia.</p>
				{/each}
			</div>
		</div>
	</div>
</div>
