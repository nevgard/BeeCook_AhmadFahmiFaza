<script lang="ts">
	import type { PageData } from './$types';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { getImageUrl } from '$lib/api';
	import { page } from '$app/state';
	import BackgroundGlow from '$lib/components/BackgroundGlow.svelte';

	let { data }: { data: PageData } = $props();

	// Computed properties based on the new runes API (or simple derivation)
	let menus = $derived(data.menus);
	let categories = $derived(data.categories);
	let pagination = $derived(data.pagination);
	let selectedCategory = $derived(data.selectedCategoryId);

	// Get trending menu (using the first menu from the list as a placeholder for trending)
	let trendingMenu = $derived(menus.length > 0 ? menus[0] : null);

	function buildUrl(pageNum: number, categoryId?: string): string {
		const url = new URL(page.url);
		url.searchParams.set('page', pageNum.toString());
		if (categoryId) {
			url.searchParams.set('category_id', categoryId);
		} else {
			url.searchParams.delete('category_id');
		}
		return url.pathname + url.search;
	}
</script>

<svelte:head>
	<title>Katalog Resep - BeeCook</title>
	<meta name="description" content="Temukan berbagai resep masakan nusantara yang lezat dan mudah dibuat." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
	<!-- Background glow -->
	<BackgroundGlow class="right-[-100px] top-[200px]" size="w-[500px] h-[500px]" color="bg-amber-100/60" />

	<!-- Trending Banner -->
	{#if trendingMenu}
		<a href={`/resep/${trendingMenu.slug}`} class="block relative w-full h-[280px] md:h-[320px] rounded-[32px] overflow-hidden mb-10 group shadow-sm">
			<img
				src={getImageUrl(trendingMenu.file_id)}
				alt={trendingMenu.name}
				class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
				referrerpolicy="no-referrer"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
			<div class="absolute bottom-0 left-0 p-8 md:p-12">
				<span class="inline-block text-[#EAB308] font-semibold text-[13px] md:text-sm mb-3">Sedang Trending</span>
				<h2 class="text-3xl md:text-[40px] font-bold text-white group-hover:text-gray-100 transition-colors leading-tight">{trendingMenu.name}</h2>
			</div>
		</a>
	{/if}

	<!-- Category Filter Tabs -->
	<div class="flex flex-wrap items-center gap-4 mb-12 pb-2 overflow-x-auto no-scrollbar">
		<a
			href="/resep"
			class="px-8 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all {selectedCategory ? 'bg-[#0F172A] text-white hover:bg-navy-800' : 'bg-[#EAB308] text-white shadow-md'}"
		>
			Semua
		</a>
		{#each categories as category}
			<a
				href={`/resep?category_id=${category.id}`}
				class="px-8 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all {selectedCategory === category.id.toString() ? 'bg-[#EAB308] text-white shadow-md' : 'bg-[#0F172A] text-white hover:bg-navy-800'}"
			>
				{category.name}
			</a>
		{/each}
	</div>

	<!-- Recipe Grid -->
	{#if menus.length === 0}
		<div class="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
			<p class="text-gray-500 font-medium">Belum ada resep di kategori ini.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
			{#each menus as menu}
				<div class="fade-in">
					<RecipeCard {menu} />
				</div>
			{/each}
		</div>
	{/if}

	<!-- Pagination -->
	{#if pagination.totalPages > 1}
		<div class="mt-16 mb-8 flex items-center justify-center gap-2">
			<!-- Previous button -->
			<a
				href={pagination.currentPage > 1 ? buildUrl(pagination.currentPage - 1, selectedCategory) : '#'}
				class="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-navy-900 transition-colors {pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}"
			>
				&laquo; Previous
			</a>

			<!-- Page numbers -->
			{#each Array(pagination.totalPages) as _, i}
				{@const pageNum = i + 1}
				<!-- Simplistic pagination logic to match design (showing limited numbers) -->
				{#if pageNum === 1 || pageNum === pagination.totalPages || (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1)}
					<a
						href={buildUrl(pageNum, selectedCategory)}
						class="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-[13px] font-bold transition-colors {pageNum === pagination.currentPage ? 'bg-gray-100 text-navy-900' : 'text-gray-500 hover:bg-gray-50'}"
					>
						{pageNum}
					</a>
				{:else if (pageNum === pagination.currentPage - 2 && pageNum > 1) || (pageNum === pagination.currentPage + 2 && pageNum < pagination.totalPages)}
					<span class="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-400 font-bold">...</span>
				{/if}
			{/each}

			<!-- Next button -->
			<a
				href={pagination.currentPage < pagination.totalPages ? buildUrl(pagination.currentPage + 1, selectedCategory) : '#'}
				class="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-navy-900 transition-colors {pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}"
			>
				Next &raquo;
			</a>
		</div>
	{/if}
</div>
