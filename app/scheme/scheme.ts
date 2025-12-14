import { z } from 'zod';

// Türkiye telefon numarası validasyonu (05XX XXX XX XX veya +90 5XX XXX XX XX)
const phoneRegex = /^(0|\+90)?5\d{9}$/;

export const bookingScheme = z.object({
	fullName: z
		.string()
		.min(2, { message: 'Ad Soyad en az 2 karakter olmalıdır' })
		.max(50, { message: 'Ad Soyad en fazla 50 karakter olabilir' })
		.regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, {
			message: 'Ad Soyad sadece harf içerebilir',
		}),
	phone: z
		.string()
		.min(10, { message: 'Telefon numarası en az 10 karakter olmalıdır' })
		.max(15, { message: 'Telefon numarası en fazla 15 karakter olabilir' })
		.regex(phoneRegex, {
			message: 'Geçerli bir Türkiye telefon numarası giriniz (05XX XXX XX XX)',
		}),
	email: z
		.string()
		.email({ message: 'Geçerli bir e-posta adresi giriniz' })
		.optional()
		.or(z.literal('')),
	description: z
		.string()
		.min(10, { message: 'Açıklama en az 10 karakter olmalıdır' })
		.max(500, { message: 'Açıklama en fazla 500 karakter olabilir' })
		.optional()
		.or(z.literal('')),
});

export type BookingFormData = z.infer<typeof bookingScheme>;