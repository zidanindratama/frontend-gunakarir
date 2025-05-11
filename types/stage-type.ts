export type StageType =
  | "CV_SCREENING"
  | "HR_INTERVIEW"
  | "MANAGEMENT_INTERVIEW";

export type TStage = {
  id: string;
  application_id: string;
  stage_type: StageType;
  notes?: string;
  created_at: string;
  updated_at: string;
};
