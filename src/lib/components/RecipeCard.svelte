<script lang="ts">
	import type { Menu } from '$lib/api';
	import { getImageUrl } from '$lib/api';

	let { menu }: { menu: Menu } = $props();
</script>

<a
	href={`/resep/${menu.slug}`}
	class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
>
	<div class="relative h-48 md:h-56 overflow-hidden bg-gray-100">
		<img
			src={getImageUrl(menu.file_id)}
			alt={menu.name}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			loading="lazy"
			referrerpolicy="no-referrer"
		/>
	</div>
	<div class="p-5">
		<div class="flex items-center justify-between mb-3">
			<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
				{menu.category?.name || 'Kategori'}
			</span>
			<div class="flex items-center text-gray-500 text-xs">
				<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				{menu.cooking_duration} m
			</div>
		</div>
		<h3 class="text-base font-bold text-navy-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
			{menu.name}
		</h3>
	</div>
</a>
