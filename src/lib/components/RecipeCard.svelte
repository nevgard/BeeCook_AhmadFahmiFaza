<script lang="ts">
	import type { Menu } from '$lib/api';
	import { getImageUrl } from '$lib/api';

	let { menu }: { menu: Menu } = $props();
</script>

<a
	href={`/resep/${menu.slug}`}
	class="group block bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
>
	<div class="relative h-48 md:h-[220px] overflow-hidden bg-gray-100">
		<img
			src={getImageUrl(menu.file_id)}
			alt={menu.name}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
			loading="lazy"
			referrerpolicy="no-referrer"
		/>
	</div>
	<div class="p-5 md:p-6">
		<div class="flex items-center justify-between mb-4">
			<span class="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#2563EB] text-white">
				{menu.category?.name || 'Kategori'}
			</span>
			<div class="flex items-center text-gray-400 text-xs font-medium">
				<svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="10" stroke-width="2" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" />
				</svg>
				{menu.cooking_duration} m
			</div>
		</div>
		<h3 class="text-[15px] font-bold text-navy-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
			{menu.name}
		</h3>
	</div>
</a>
