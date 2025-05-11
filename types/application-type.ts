import { TJob } from "./job-type";
import { TStudent } from "./student-type";
import { TStage } from "./stage-type";
import { TInterview } from "./interview-type";

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "PASSED_SCREENING"
  | "FAILED_SCREENING"
  | "INTERVIEW_INVITED"
  | "CONFIRMED_INTERVIEW"
  | "DECLINED_INTERVIEW"
  | "ACCEPTED"
  | "REJECTED";

export type TApplication = {
  id: string;
  job_id: string;
  student_id: string;
  job?: TJob;
  student?: TStudent;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
  stages: TStage[];
  interviews: TInterview[];
};
