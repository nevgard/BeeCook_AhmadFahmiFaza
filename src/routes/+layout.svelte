<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'Beranda' },
		{ href: '/resep', label: 'Resep' },
		{ href: '/kelola', label: 'Kelola' }
	];

	let mobileMenuOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<title>BeeCook - Where Quality Meets Flavor</title>
	<meta name="description" content="Platform katalog resep makanan Indonesia. Jelajahi menu berdasarkan kategori, lihat detail nutrisi, dan kelola data resep." />
</svelte:head>

<!-- Navbar -->
<nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 group">
				<img src="/assets/logo/logo-beecook-color.png" alt="BeeCook Logo" class="h-10 w-auto transition-transform group-hover:scale-105" />
			</a>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="relative text-lg font-bold transition-colors duration-200 py-1 {isActive(link.href) ? 'text-amber-500' : 'text-navy-800 hover:text-amber-600'}"
					>
						{link.label}
						{#if isActive(link.href)}
							<span class="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full"></span>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Mobile Hamburger -->
			<button
				class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6 text-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden pb-4 border-t border-gray-100 fade-in">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block py-3 px-2 text-sm font-medium transition-colors {isActive(link.href) ? 'text-amber-500' : 'text-navy-800 hover:text-amber-600'}"
						onclick={() => mobileMenuOpen = false}
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>

<!-- Main Content -->
<main class="min-h-screen">
	{@render children()}
</main>

<!-- Footer -->
<footer class="bg-navy-900 text-white pt-12 pb-6">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
			<!-- Logo -->
			<div>
				<img src="/assets/logo/logo-beecook-white.png" alt="BeeCook" class="h-10 w-auto mb-4" />
			</div>

			<!-- Partnership -->
			<div>
				<h4 class="font-semibold text-sm mb-4">Partnership</h4>
				<ul class="space-y-2">
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">Layanan</a></li>
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">Kontributor</a></li>
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">Iklan</a></li>
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">Karir</a></li>
				</ul>
			</div>

			<!-- Bantuan -->
			<div>
				<h4 class="font-semibold text-sm mb-4">Bantuan</h4>
				<ul class="space-y-2">
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">FAQ</a></li>
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">Kontak Kami</a></li>
					<li><a href="/" class="text-sm text-gray-400 hover:text-amber-500 transition-colors">Aksesibilitas</a></li>
				</ul>
			</div>

			<!-- Social Media -->
			<div class="flex items-start gap-4">
				<a href="/" aria-label="TikTok" class="hover:opacity-80 transition-opacity"><img src="/assets/sosmed/socmed-tiktok.png" alt="TikTok" class="w-6 h-6" /></a>
				<a href="/" aria-label="Facebook" class="hover:opacity-80 transition-opacity"><img src="/assets/sosmed/socmed-facebook.png" alt="Facebook" class="w-6 h-6" /></a>
				<a href="/" aria-label="Instagram" class="hover:opacity-80 transition-opacity"><img src="/assets/sosmed/socmed-instagram.png" alt="Instagram" class="w-6 h-6" /></a>
				<a href="/" aria-label="X" class="hover:opacity-80 transition-opacity"><img src="/assets/sosmed/socmed-x.png" alt="X" class="w-6 h-6" /></a>
			</div>
		</div>

		<div class="border-t border-navy-700 pt-6">
			<p class="text-xs text-gray-500">BECOOK MEDIA | ALL RIGHTS RESERVED</p>
		</div>
	</div>
</footer>

<Toaster richColors position="top-right" />
