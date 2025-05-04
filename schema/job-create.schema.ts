import { z } from "zod";

export const CreateJobSchema = z
  .object({
    title: z.string().min(1, "Judul wajib diisi"),
    short_description: z.string().min(1, "Deskripsi singkat wajib diisi"),
    full_description: z.string().min(1, "Deskripsi lengkap wajib diisi"),
    salary: z.coerce
      .number({
        invalid_type_error: "Gaji harus berupa angka",
      })
      .min(1, "Gaji wajib diisi dan tidak boleh negatif"),
    quota: z.coerce
      .number({
        invalid_type_error: "Kuota harus berupa angka",
      })
      .min(1, "Kuota wajib diisi dan tidak boleh negatif"),

    application_start: z.coerce.date({
      invalid_type_error: "Tanggal mulai lamar tidak valid",
    }),
    application_end: z.coerce.date({
      invalid_type_error: "Tanggal akhir lamar tidak valid",
    }),

    province_id: z.string().min(1, "Provinsi wajib diisi"),
    city_id: z.string().min(1, "Kota/Kabupaten wajib diisi"),

    major_ids: z.array(z.string()).optional(),
  })
  .refine((data) => data.application_end >= data.application_start, {
    path: ["application_end"],
    message: "Tanggal akhir tidak boleh lebih awal dari tanggal mulai",
  });

export type CreateJobFormData = z.infer<typeof CreateJobSchema>;
