import { TUser } from "./user-type";
import { TEducation } from "./education-type";
import { TOrganizationalExperience, TWorkExperience } from "./experience-type";

export type Gender = "MALE" | "FEMALE";
export type Status = "APPROVED" | "REJECTED" | "PENDING";

export type TStudent = {
  id: string;
  user_id: string;
  user: TUser;
  NPM: string;
  CV_file: string;
  KTM_file: string;
  fullname: string;
  address: string;
  phone_number: string;
  bio: string;
  linkedin_url?: string;
  instagram_url?: string;
  gender: Gender;
  status: Status;
  province_id: string;
  city_id: string;
  district_id: string;
  village_id: string;
  created_at: string;
  updated_at: string;

  educations: TEducation[];
  organizationalExperiences: TOrganizationalExperience[];
  workExperiences: TWorkExperience[];
};
