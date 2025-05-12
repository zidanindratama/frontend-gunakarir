import { z } from "zod";

export const RecruitmentStageCreateSchema = z
  .object({
    final_status: z.enum([
      "ACCEPTED",
      "REJECTED",
      "PENDING",
      "INTERVIEW_INVITED",
    ]),
    schedule: z.date().optional(),
    confirm_deadline: z.date().optional(),
    method: z.enum(["ONLINE", "OFFLINE"]).optional(),
    notes: z.string().optional(),
    link: z.string().optional(),
    location: z.string().optional(),
    is_same_location: z.boolean().optional(),
    stage_type: z
      .enum(["CV_SCREENING", "HR_INTERVIEW", "MANAGEMENT_INTERVIEW"])
      .optional(),
  })
  .superRefine((data, ctx) => {
    const isAccepted = data.final_status === "ACCEPTED";
    const isRejected = data.final_status === "REJECTED";

    if (isRejected && (!data.notes || data.notes.trim() === "")) {
      ctx.addIssue({
        path: ["notes"],
        code: z.ZodIssueCode.custom,
        message: "Catatan wajib diisi jika status ditolak",
      });
    }

    const showInterviewForm =
      isAccepted &&
      (data.stage_type === "CV_SCREENING" ||
        data.stage_type === "HR_INTERVIEW");

    if (showInterviewForm) {
      if (!data.schedule) {
        ctx.addIssue({
          path: ["schedule"],
          code: z.ZodIssueCode.custom,
          message: "Tanggal wawancara wajib diisi",
        });
      }

      if (!data.confirm_deadline) {
        ctx.addIssue({
          path: ["confirm_deadline"],
          code: z.ZodIssueCode.custom,
          message: "Batas konfirmasi wajib diisi",
        });
      }

      if (!data.method) {
        ctx.addIssue({
          path: ["method"],
          code: z.ZodIssueCode.custom,
          message: "Metode interview wajib diisi",
        });
      }
      if (data.method === "ONLINE" && (!data.link || data.link.trim() === "")) {
        ctx.addIssue({
          path: ["link"],
          code: z.ZodIssueCode.custom,
          message: "Link interview wajib diisi untuk metode online",
        });
      }

      if (
        data.method === "OFFLINE" &&
        !data.is_same_location &&
        (!data.location || data.location.trim() === "")
      ) {
        ctx.addIssue({
          path: ["location"],
          code: z.ZodIssueCode.custom,
          message: "Lokasi interview wajib diisi untuk metode offline",
        });
      }
    }
  });

export type RecruitmentStageCreateFormData = z.infer<
  typeof RecruitmentStageCreateSchema
>;
