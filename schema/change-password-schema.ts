import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(6, "Password lama wajib diisi"),
    new_password: z.string().min(6, "Password baru minimal 6 karakter"),
    confirm_password: z.string().min(6, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirm_password"],
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;
