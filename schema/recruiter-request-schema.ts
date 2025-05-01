import { z } from "zod";

export enum RecruiterStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export const RecruiterRequestSchema = z.object({
  NPWP: z.string({ required_error: "NPWP wajib diisi." }),
  company_name: z
    .string({ required_error: "Nama perusahaan wajib diisi." })
    .min(3, "Nama perusahaan minimal 3 karakter"),
  company_logo: z.string({ required_error: "Logo perusahaan wajib diunggah." }),
  company_description: z
    .string({ required_error: "Deskripsi perusahaan wajib diisi." })
    .min(10, "Deskripsi minimal 10 karakter"),
  contract_file: z.string({ required_error: "File kontrak wajib diunggah." }),
  address: z
    .string({ required_error: "Alamat wajib diisi." })
    .min(5, "Alamat minimal 5 karakter"),
  phone_number: z
    .string({ required_error: "Nomor telepon wajib diisi." })
    .min(10, "Nomor telepon minimal 10 karakter"),

  linkedin_url: z.string().url("URL LinkedIn tidak valid").optional(),
  instagram_url: z.string().url("URL Instagram tidak valid").optional(),

  status: z.string({ required_error: "Status wajib diisi." }),

  province_id: z.string({ required_error: "Provinsi wajib dipilih." }),
  city_id: z.string({ required_error: "Kota/Kabupaten wajib dipilih." }),
  district_id: z.string({ required_error: "Kecamatan wajib dipilih." }),
  village_id: z.string({ required_error: "Kelurahan wajib dipilih." }),
});

export type RecruiterRequestFormData = z.output<typeof RecruiterRequestSchema>;
