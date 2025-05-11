import { TJob } from "./job-type";
import { TMajor } from "./major-type";

export type TJobMajor = {
  id: string;
  job_id: string;
  major_id: string;
  job: TJob;
  major: TMajor;
  created_at: string;
  updatedAt: string;
};
