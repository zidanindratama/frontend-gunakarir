import { z } from "zod";

export const AdminReviewSchema = z
  .object({
    status: z.enum(["APPROVED", "REJECTED"], {
      required_error: "Status wajib dipilih",
    }),
    rejection_reason: z.string().optional(),
  })
  .refine(
    (data) => data.status !== "REJECTED" || !!data.rejection_reason?.trim(),
    {
      message: "Alasan penolakan wajib diisi jika status REJECTED",
      path: ["rejection_reason"],
    }
  );

export type AdminReviewFormData = z.infer<typeof AdminReviewSchema>;
