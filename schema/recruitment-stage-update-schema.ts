import { z } from "zod";

export const RecruitmentStageUpdateSchema = z
  .object({
    stage_type: z.enum([
      "CV_SCREENING",
      "HR_INTERVIEW",
      "MANAGEMENT_INTERVIEW",
    ]),
    final_status: z
      .enum(["ACCEPTED", "REJECTED", "PENDING", "INTERVIEW_INVITED"])
      .optional(),
    notes: z.string().optional(),
    repeat_interview: z.boolean().optional(),
    schedule: z
      .any()
      .transform((val) => (val ? new Date(val) : undefined))
      .optional(),
    confirm_deadline: z
      .any()
      .transform((val) => (val ? new Date(val) : undefined))
      .optional(),
    method: z.enum(["ONLINE", "OFFLINE"]).optional(),
    link: z.string().optional(), // akan divalidasi di refine
    location: z.string().optional(),
    is_same_location: z.boolean().optional(),
  })
  .refine((data) => !data.repeat_interview || !!data.schedule, {
    message: "Tanggal interview wajib diisi.",
    path: ["schedule"],
  })
  .refine((data) => !data.repeat_interview || !!data.confirm_deadline, {
    message: "Batas konfirmasi wajib diisi.",
    path: ["confirm_deadline"],
  })
  .refine((data) => !data.repeat_interview || !!data.method, {
    message: "Metode interview wajib dipilih.",
    path: ["method"],
  })
  .refine(
    (data) =>
      !data.repeat_interview ||
      data.method !== "ONLINE" ||
      (data.link && data.link.trim() !== ""),
    {
      message: "Link interview online wajib diisi.",
      path: ["link"],
    }
  )
  .refine(
    (data) =>
      !data.repeat_interview ||
      data.method !== "OFFLINE" ||
      data.is_same_location ||
      (data.location && data.location.trim() !== ""),
    {
      message:
        "Lokasi interview offline wajib diisi jika tidak sama dengan alamat perusahaan.",
      path: ["location"],
    }
  );

export type RecruitmentStageUpdateFormData = z.infer<
  typeof RecruitmentStageUpdateSchema
>;
