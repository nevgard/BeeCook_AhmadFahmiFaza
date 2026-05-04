import { z } from 'zod';

export const menuSchema = z.object({
	name: z.string().min(3, 'Nama resep minimal 3 karakter'),
	description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
	cooking_duration: z.string().min(1, 'Durasi harus diisi'),
	category_id: z.string().min(1, 'Kategori harus dipilih'),
	ingredients: z.array(
		z.object({ description: z.string().min(2, 'Bahan tidak boleh kosong') })
	).min(1, 'Minimal 1 bahan'),
	recipes: z.array(
		z.object({ 
			description: z.string().min(5, 'Instruksi tidak boleh kosong'),
			sort_number: z.string()
		})
	).min(1, 'Minimal 1 instruksi'),
	nutritions: z.object({
		calory: z.string().min(1, 'Wajib diisi'),
		protein: z.string().min(1, 'Wajib diisi'),
		carbohydrate: z.string().min(1, 'Wajib diisi'),
		fat: z.string().min(1, 'Wajib diisi')
	})
});

export type MenuSchema = z.infer<typeof menuSchema>;
