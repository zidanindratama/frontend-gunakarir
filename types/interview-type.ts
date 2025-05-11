export type InterviewMethod = "ONLINE" | "OFFLINE";
export type InterviewType = "HR" | "MANAGEMENT";

export type TInterview = {
  id: string;
  application_id: string;
  schedule: string;
  confirm_deadline: string;
  method: InterviewMethod;
  type: InterviewType;
  link?: string;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};
