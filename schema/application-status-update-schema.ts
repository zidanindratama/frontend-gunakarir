import { ApplicationStatusEnum } from "@/types/application-type";
import { z } from "zod";

export const ApplicationUpdateSchema = z.object({
  status: z
    .nativeEnum(ApplicationStatusEnum, {
      errorMap: () => ({ message: "Status tidak valid" }),
    })
    .optional(),
});

export type ApplicationUpdateFormData = z.infer<typeof ApplicationUpdateSchema>;
