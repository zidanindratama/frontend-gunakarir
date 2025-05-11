import { TRecruiter } from "./recruiter-type";
import { TJobMajor } from "./job-major-type";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT"
  | "FREELANCE";

export type TJob = {
  id: string;
  recruiter_id: string;
  title: string;
  short_description: string;
  full_description: string;
  salary: number;
  quota: number;
  application_start: string;
  application_end: string;
  status: boolean;
  province_id: string;
  city_id: string;
  type: JobType;
  created_at: string;
  updated_at: string;

  recruiter: TRecruiter;
  jobMajors: TJobMajor[];
};
