import { TJob } from "./job-type";
import { TStudent } from "./student-type";
import { TStage } from "./stage-type";
import { TInterview } from "./interview-type";
import { TAiInterview } from "./ai-interview-type";

export type ApplicationStatus =
  | "SUBMITTED"
  | "PENDING"
  | "INTERVIEW_INVITED"
  | "CONFIRMED_INTERVIEW"
  | "DECLINED_INTERVIEW"
  | "ACCEPTED"
  | "REJECTED";

export enum ApplicationStatusEnum {
  SUBMITTED = "SUBMITTED",
  PENDING = "PENDING",
  INTERVIEW_INVITED = "INTERVIEW_INVITED",
  CONFIRMED_INTERVIEW = "CONFIRMED_INTERVIEW",
  DECLINED_INTERVIEW = "DECLINED_INTERVIEW",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

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
  AiInterview?: TAiInterview;
};
