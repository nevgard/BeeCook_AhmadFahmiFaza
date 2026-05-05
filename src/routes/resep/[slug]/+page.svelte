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

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden md:overflow-visible">
	<!-- Background glow -->
	<div class="absolute right-[-100px] top-[400px] w-[600px] h-[600px] bg-amber-100/70 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

	<!-- Hero Section -->
	<div class="relative w-full h-[350px] md:h-[450px] rounded-[32px] overflow-hidden mb-8 shadow-sm">
		<img
			src={getImageUrl(menu.file_id)}
			alt={menu.name}
			class="absolute inset-0 w-full h-full object-cover"
			referrerpolicy="no-referrer"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
		
		<div class="absolute bottom-0 left-0 w-full p-8 md:p-12">
			<h1 class="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md max-w-4xl leading-tight">
				{menu.name}
			</h1>
		</div>
	</div>

	<!-- Meta Info (Category & Duration) -->
	<div class="flex flex-wrap items-center gap-10 md:gap-16 mb-10 px-2 md:px-4">
		<!-- Kategori -->
		<div class="flex items-center gap-4">
			<div class="text-amber-500 shrink-0">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-10 h-10">
					<circle cx="12" cy="12" r="5" />
					<path d="M4 4v5a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V4" />
					<path d="M6 4v16" />
					<path d="M20 4v16" />
					<path d="M20 4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3" />
				</svg>
			</div>
			<div>
				<p class="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Kategori</p>
				<p class="font-bold text-gray-900 leading-none">{menu.category?.name || 'Kategori'}</p>
			</div>
		</div>

		<!-- Durasi -->
		<div class="flex items-center gap-4">
			<div class="text-amber-500 shrink-0">
				<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="9" />
					<path d="M12 7v5l3 3" />
				</svg>
			</div>
			<div>
				<p class="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Durasi</p>
				<p class="font-bold text-gray-900 leading-none">{menu.cooking_duration} menit</p>
			</div>
		</div>
	</div>

	<!-- Description -->
	<div class="mb-14 px-2 md:px-4">
		<p class="text-[15px] text-gray-500 leading-relaxed">
			{menu.description}
		</p>
	</div>

	<!-- Nutrition -->
	{#if menu.nutrition}
		<div class="mb-16 px-2 md:px-4">
			<h2 class="text-xl font-bold text-gray-900 mb-6">Informasi Nutrisi</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
				<div class="bg-white/60 backdrop-blur-sm border border-amber-300 rounded-2xl py-6 px-2 text-center shadow-sm">
					<p class="text-xl md:text-2xl font-bold text-gray-900 mb-1">{menu.nutrition.calory} <span class="text-sm font-semibold">kcal</span></p>
					<p class="text-[13px] text-gray-500 font-medium">Kalori</p>
				</div>
				<div class="bg-white/60 backdrop-blur-sm border border-amber-300 rounded-2xl py-6 px-2 text-center shadow-sm">
					<p class="text-xl md:text-2xl font-bold text-gray-900 mb-1">{menu.nutrition.protein}<span class="text-sm font-semibold">g</span></p>
					<p class="text-[13px] text-gray-500 font-medium">Protein</p>
				</div>
				<div class="bg-white/60 backdrop-blur-sm border border-amber-300 rounded-2xl py-6 px-2 text-center shadow-sm">
					<p class="text-xl md:text-2xl font-bold text-gray-900 mb-1">{menu.nutrition.fat}<span class="text-sm font-semibold">g</span></p>
					<p class="text-[13px] text-gray-500 font-medium">Lemak</p>
				</div>
				<div class="bg-white/60 backdrop-blur-sm border border-amber-300 rounded-2xl py-6 px-2 text-center shadow-sm">
					<p class="text-xl md:text-2xl font-bold text-gray-900 mb-1">{menu.nutrition.carbohydrate}<span class="text-sm font-semibold">g</span></p>
					<p class="text-[13px] text-gray-500 font-medium">Karbohidrat</p>
				</div>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 px-2 md:px-4 pb-16">
		<!-- Ingredients -->
		<div>
			<h2 class="text-xl font-bold text-gray-900 mb-6">Bahan-bahan</h2>
			<ul class="space-y-4">
				{#each menu.ingredients as ingredient}
					<li class="text-[15px] text-gray-800 leading-relaxed">
						{ingredient.description}
					</li>
				{:else}
					<li class="text-gray-500 italic">Data bahan belum tersedia.</li>
				{/each}
			</ul>
		</div>

		<!-- Instructions -->
		<div>
			<h2 class="text-xl font-bold text-gray-900 mb-6">Cara Masak</h2>
			<div class="space-y-7">
				{#each [...menu.recipes].sort((a, b) => a.sort_number - b.sort_number) as recipe, index}
					<div class="flex items-start gap-5">
						<div class="w-9 h-9 rounded-full bg-amber-400 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
							{index + 1}
						</div>
						<div class="pt-1">
							<p class="text-[15px] text-gray-800 leading-relaxed">{recipe.description}</p>
						</div>
					</div>
				{:else}
					<p class="text-gray-500 italic">Data instruksi masak belum tersedia.</p>
				{/each}
			</div>
		</div>
	</div>
</div>
