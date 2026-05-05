<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import { deleteMenu, uploadMenuImage } from '$lib/api';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();

	let menus = $derived(data.menus);
	let pagination = $derived(data.pagination);

	// Modal States
	let deleteId: number | null = $state(null);
	let uploadId: number | null = $state(null);
	let fileInput: HTMLInputElement = $state() as any;
	let selectedFile: File | null = $state(null);
	let previewUrl: string | null = $state(null);

	async function confirmDelete() {
		if (!deleteId) return;
		try {
			toast.loading('Menghapus resep...', { id: 'delete' });
			await deleteMenu(fetch, deleteId);
			toast.success('Resep berhasil dihapus', { id: 'delete' });
			deleteId = null;
			invalidateAll();
		} catch (e: any) {
			toast.error('Gagal menghapus resep: ' + e.message, { id: 'delete' });
		}
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			selectedFile = target.files[0];
			previewUrl = URL.createObjectURL(selectedFile);
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			selectedFile = event.dataTransfer.files[0];
			previewUrl = URL.createObjectURL(selectedFile);
		}
	}

	async function handleUpload() {
		if (!uploadId || !selectedFile) return;
		try {
			toast.loading('Mengunggah gambar...', { id: 'upload' });
			await uploadMenuImage(fetch, uploadId, selectedFile);
			toast.success('Gambar berhasil diunggah', { id: 'upload' });
			closeUploadModal();
			invalidateAll();
		} catch (e: any) {
			toast.error('Gagal mengunggah gambar: ' + e.message, { id: 'upload' });
		}
	}

	function closeUploadModal() {
		uploadId = null;
		selectedFile = null;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
	}

	function buildUrl(pageNum: number): string {
		const url = new URL(page.url);
		url.searchParams.set('page', pageNum.toString());
		return url.pathname + url.search;
	}
</script>

<svelte:head>
	<title>Kelola Resep - BeeCook</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-navy-900">Kelola Resep</h1>
		<a
			href="/kelola/baru"
			class="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-colors"
		>
			Tambah Resep
		</a>
	</div>

	<!-- Table & Cards -->
	<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden fade-in">
		
		<!-- Desktop Table (hidden on mobile) -->
		<div class="hidden md:block overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead class="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100 uppercase">
					<tr>
						<th class="px-6 py-4 font-medium">Nama Resep</th>
						<th class="px-6 py-4 font-medium">Kategori</th>
						<th class="px-6 py-4 font-medium">File ID</th>
						<th class="px-6 py-4 font-medium text-right">Action</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each menus as menu}
						<tr class="hover:bg-gray-50/50 transition-colors">
							<td class="px-6 py-4 font-medium text-navy-900">{menu.name}</td>
							<td class="px-6 py-4 text-gray-600">{menu.category?.name || '-'}</td>
							<td class="px-6 py-4 text-gray-500 font-mono text-xs">{menu.file_id || '-'}</td>
							<td class="px-6 py-4 text-right">
								<div class="flex justify-end gap-4 font-medium">
									<button
										onclick={() => deleteId = menu.id}
										class="text-red-500 hover:text-red-700 transition-colors"
									>
										Del
									</button>
									<a
										href={`/kelola/edit/${menu.id}`}
										class="text-blue-600 hover:text-blue-800 transition-colors"
									>
										Edit
									</a>
									<button
										onclick={() => uploadId = menu.id}
										class="text-emerald-600 hover:text-emerald-800 transition-colors"
									>
										Gambar
									</button>
								</div>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="px-6 py-8 text-center text-gray-500">
								Belum ada data resep.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Mobile Cards (hidden on desktop) -->
		<div class="md:hidden divide-y divide-gray-100">
			{#each menus as menu}
				<div class="p-5 hover:bg-gray-50/50 transition-colors">
					<div class="mb-3">
						<h3 class="font-bold text-navy-900 text-[15px] mb-2 leading-tight">{menu.name}</h3>
						<div class="flex items-center gap-2 text-xs">
							<span class="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
								{menu.category?.name || 'Kategori'}
							</span>
							<span class="text-gray-400 font-mono truncate max-w-[120px]" title={menu.file_id}>
								{menu.file_id || 'No File ID'}
							</span>
						</div>
					</div>
					<div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-sm font-medium">
						<button
							onclick={() => deleteId = menu.id}
							class="text-red-600 flex-1 text-center py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
						>
							Del
						</button>
						<a
							href={`/kelola/edit/${menu.id}`}
							class="text-blue-600 flex-1 text-center py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors block"
						>
							Edit
						</a>
						<button
							onclick={() => uploadId = menu.id}
							class="text-emerald-600 flex-1 text-center py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
						>
							Gambar
						</button>
					</div>
				</div>
			{:else}
				<div class="p-8 text-center text-gray-500">
					Belum ada data resep.
				</div>
			{/each}
		</div>
		
		<!-- Pagination Footer -->
		{#if pagination.totalPages > 1}
			<div class="px-6 py-4 border-t border-gray-100 flex items-center gap-4 text-sm text-navy-900">
				<a
					href={pagination.currentPage > 1 ? buildUrl(pagination.currentPage - 1) : '#'}
					class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors {pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : ''}"
				>
					&laquo;
				</a>
				<span class="px-2 py-1 bg-gray-50 rounded border border-gray-200 min-w-8 text-center">
					{pagination.currentPage}
				</span>
				<span>of &nbsp; {pagination.totalPages}</span>
				<a
					href={pagination.currentPage < pagination.totalPages ? buildUrl(pagination.currentPage + 1) : '#'}
					class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors {pagination.currentPage === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}"
				>
					&raquo;
				</a>
			</div>
		{/if}
	</div>
</div>

<!-- Delete Confirmation Modal -->
{#if deleteId}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm fade-in">
		<div class="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl">
			<h3 class="text-xl font-bold text-navy-900 mb-2">Hapus Resep?</h3>
			<p class="text-gray-500 mb-8">Apakah Anda yakin ingin menghapus resep ini? Tindakan ini tidak dapat dibatalkan.</p>
			<div class="flex gap-3 justify-end">
				<button
					onclick={() => deleteId = null}
					class="px-4 py-2 text-navy-900 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
				>
					Batal
				</button>
				<button
					onclick={confirmDelete}
					class="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
				>
					Hapus
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Upload Image Modal -->
{#if uploadId}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/40 backdrop-blur-sm fade-in">
		<div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl flex flex-col overflow-hidden">
			<!-- Header -->
			<div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
				<h3 class="text-lg font-bold text-navy-900">Upload Gambar</h3>
				<button aria-label="Tutup Modal" onclick={closeUploadModal} class="p-2 hover:bg-gray-200 rounded-full transition-colors">
					<svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
				</button>
			</div>
			
			<!-- Body -->
			<div class="p-6 md:p-8">
				<div
					class="border-2 border-dashed rounded-xl p-8 text-center transition-colors {selectedFile ? 'border-amber-400 bg-amber-50/30' : 'border-gray-300 hover:border-amber-400 hover:bg-gray-50'}"
					ondragover={(e) => e.preventDefault()}
					ondrop={handleDrop}
					role="button"
					tabindex="0"
					onclick={() => fileInput.click()}
					onkeydown={(e) => e.key === 'Enter' && fileInput.click()}
				>
					<input
						type="file"
						accept="image/*"
						class="hidden"
						bind:this={fileInput}
						onchange={handleFileChange}
					/>
					
					{#if !previewUrl}
						<div class="flex flex-col items-center gap-3">
							<svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<p class="text-navy-900 font-medium">Drop your files here or <span class="text-blue-600">browse</span></p>
							<p class="text-xs text-gray-400">Maximum size: 50MB</p>
						</div>
					{:else}
						<p class="text-sm text-left font-medium text-gray-500 mb-3">Preview</p>
						<div class="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 group">
							<img src={previewUrl} alt="Preview" class="w-full h-full object-cover" />
							<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<span class="text-white text-sm font-medium">Click to change</span>
							</div>
						</div>
					{/if}
				</div>
			</div>
			
			<!-- Footer -->
			<div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
				<button
					onclick={closeUploadModal}
					class="px-5 py-2 text-navy-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={handleUpload}
					disabled={!selectedFile}
					class="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
				>
					Upload
				</button>
			</div>
		</div>
	</div>
{/if}
