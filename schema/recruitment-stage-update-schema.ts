import { z } from "zod";

export const RecruitmentStageUpdateSchema = z.object({
  stage_type: z.enum(["CV_SCREENING", "HR_INTERVIEW", "MANAGEMENT_INTERVIEW"]),
  final_status: z.enum(["ACCEPTED", "REJECTED", "PENDING"]).optional(),
  notes: z.string().optional(),
});

export type RecruitmentStageUpdateFormData = z.infer<
  typeof RecruitmentStageUpdateSchema
>;
