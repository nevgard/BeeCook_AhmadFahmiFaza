<script lang="ts">
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	let email = $state('');

	const categoryImages: Record<string, string> = {
		'main-course': '/assets/category/category-main-course.png',
		'beverages': '/assets/category/category-beverages.png',
		'appetizer': '/assets/category/category-appetizer.png',
		'side-dish': '/assets/category/category-side-dish.png',
		'dessert': '/assets/category/category-dessert.png'
	};

	function handleSubscribe(e: Event) {
		e.preventDefault();
		if (email) {
			toast.success('Berhasil berlangganan!', { description: `Email ${email} telah terdaftar.` });
			email = '';
		} else {
			toast.error('Masukkan email Anda');
		}
	}
</script>

<svelte:head>
	<title>BeeCook - Where Quality Meets Flavor</title>
	<meta name="description" content="Platform katalog resep makanan Indonesia terbaik. Jelajahi resep berdasarkan kategori." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<div class="fade-in">
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
					Where <span class="text-amber-500 italic">Quality</span>
					<img src="/assets/stars.png" alt="" class="inline w-6 h-6 -mt-4" />
					<br />Meets <span class="font-black">Flavor.</span>
				</h1>
				<div class="mt-8">
					<a
						href="/resep"
						class="inline-flex items-center px-6 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
					>
						Eksplor Sekarang
					</a>
				</div>
				<div class="mt-8 flex items-center gap-3">
					<div class="flex -space-x-3">
						<img src="/assets/avatar/people1.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
						<img src="/assets/avatar/people2.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
						<img src="/assets/avatar/people3.png" alt="User" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
					</div>
					<span class="text-sm font-medium text-navy-800">1.000+ Pengguna</span>
				</div>
			</div>
			<div class="relative fade-in" style="animation-delay: 0.2s">
				<img
					src="/assets/hero-image.png"
					alt="Hidangan lezat"
					class="w-full max-w-lg mx-auto rounded-2xl drop-shadow-2xl"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Category Section -->
<section class="py-16 md:py-24 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-2xl md:text-3xl font-bold text-navy-900">
				Eksplor berdasarkan
				<span class="relative inline-block text-navy-900 italic">
					Kategori
					<img src="/assets/line-doodle.png" alt="" class="absolute -bottom-2 left-0 w-full h-auto" />
				</span>
			</h2>
		</div>
		<div class="flex flex-wrap justify-center gap-8 md:gap-12">
			{#each data.categories as cat}
				<a href="/resep?category_id={cat.id}" class="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-2 duration-300">
					<div class="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-amber-100 group-hover:border-amber-400 transition-colors shadow-md">
						<img
							src={categoryImages[cat.slug] || '/assets/category/category-main-course.png'}
							alt={cat.name}
							class="w-full h-full object-cover"
						/>
					</div>
					<span class="text-sm font-medium text-navy-800 group-hover:text-amber-600 transition-colors">{cat.name}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Newsletter / Subscribe Section -->
<section class="py-16 md:py-24 bg-gradient-to-r from-amber-50/50 to-orange-50/30">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
					Dapatkan menu menarik setiap hari
				</h2>
				<p class="text-gray-500 text-sm leading-relaxed mb-8">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
				</p>
				<form onsubmit={handleSubscribe} class="flex gap-3 max-w-md">
					<div class="relative flex-1">
						<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<input
							type="email"
							bind:value={email}
							placeholder="you@email.com"
							class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
						/>
					</div>
					<button
						type="submit"
						class="px-6 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
					>
						Langganan
					</button>
				</form>
			</div>
			<div class="flex justify-center md:justify-end">
				<div class="relative">
					<div class="w-64 h-64 md:w-72 md:h-72 rounded-full bg-amber-400 overflow-hidden shadow-xl">
						<img
							src="/assets/people-chef-subscribe.png"
							alt="Chef"
							class="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
