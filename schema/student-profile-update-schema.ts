import { z } from "zod";

export const StudentProfileUpdateSchema = z.object({
  username: z
    .string()
    .nonempty("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  image_url: z.string().url("URL gambar tidak valid").nullable().optional(),

  NPM: z.string().nonempty("NPM wajib diisi").min(8, "NPM minimal 8 karakter"),
  fullname: z
    .string()
    .nonempty("Nama lengkap wajib diisi")
    .min(3, "Nama lengkap minimal 3 karakter"),
  address: z
    .string()
    .nonempty("Alamat wajib diisi")
    .min(5, "Alamat minimal 5 karakter"),
  phone_number: z
    .string()
    .nonempty("Nomor telepon wajib diisi")
    .min(10, "Nomor telepon minimal 10 karakter"),
  bio: z
    .string()
    .nonempty("Bio wajib diisi")
    .min(5, "Bio minimal 5 karakter")
    .max(100, "Bio maksimal 100 karakter"),
  gender: z.enum(["MALE", "FEMALE"], {
    required_error: "Jenis kelamin wajib dipilih",
  }),

  CV_file: z
    .string({ required_error: "CV wajib diunggah" })
    .nonempty("CV wajib diunggah"),
  KTM_file: z
    .string({ required_error: "KTM wajib diunggah" })
    .nonempty("KTM wajib diunggah"),

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

  province_id: z.string().nonempty("Provinsi wajib dipilih"),
  city_id: z.string().nonempty("Kota/Kabupaten wajib dipilih"),
  district_id: z.string().nonempty("Kecamatan wajib dipilih"),
  village_id: z.string().nonempty("Kelurahan wajib dipilih"),
});

export type StudentProfileUpdateFormData = z.infer<
  typeof StudentProfileUpdateSchema
>;
