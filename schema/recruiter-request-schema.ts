import { z } from "zod";

export enum RecruiterStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export const RecruiterRequestSchema = z.object({
  username: z
    .string()
    .nonempty("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  image_url: z.string().url("URL gambar tidak valid").nullable().optional(),

  NPWP: z.string().nonempty("NPWP wajib diisi."),
  company_name: z
    .string()
    .min(3, "Nama perusahaan minimal 3 karakter")
    .nonempty("Nama perusahaan wajib diisi."),
  company_logo: z.string().nonempty("Logo perusahaan wajib diunggah."),
  company_description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .nonempty("Deskripsi perusahaan wajib diisi."),
  contract_file: z
    .string()
    .nonempty("File proposal kerja sama wajib diunggah."),
  address: z
    .string()
    .min(5, "Alamat minimal 5 karakter")
    .nonempty("Alamat wajib diisi."),
  phone_number: z
    .string()
    .min(10, "Nomor telepon minimal 10 karakter")
    .nonempty("Nomor telepon wajib diisi."),
  linkedin_url: z
    .string()
    .url("URL LinkedIn tidak valid")
    .or(z.literal(""))
    .transform((val) => val ?? "")
    .optional(),
  instagram_url: z
    .string()
    .url("URL Instagram tidak valid")
    .or(z.literal(""))
    .transform((val) => val ?? "")
    .optional(),

  status: z.string().nonempty("Status wajib diisi."),
  province_id: z.string().nonempty("Provinsi wajib dipilih."),
  city_id: z.string().nonempty("Kota/Kabupaten wajib dipilih."),
  district_id: z.string().nonempty("Kecamatan wajib dipilih."),
  village_id: z.string().nonempty("Kelurahan wajib dipilih."),
});

export type RecruiterRequestFormData = z.output<typeof RecruiterRequestSchema>;
