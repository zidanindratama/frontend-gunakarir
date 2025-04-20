import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    role: z.enum(["STUDENT", "RECRUITER"]),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirm_password: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi tidak cocok",
    path: ["confirm_password"],
  });
