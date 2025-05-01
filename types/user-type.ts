export type TUser = {
  id: string;
  email: string;
  username: string;
  image_url?: string;
  role: "ADMIN" | "RECRUITER" | "STUDENT";
  createdAt: string;
  updatedAt: string;
  student?: TStudent;
  recruiter?: TRecruiter;
};

export type TStudent = {
  id: string;
  user_id: string;
  NPM: string;
  CV_file: string;
  KTM_file: string;
  fullname: string;
  address: string;
  phone_number: string;
  bio: string;
  linkedin_url?: string;
  instagram_url?: string;
  gender: "MALE" | "FEMALE";
  status: "APPROVED" | "REJECTED" | "PENDING";

  province_id: string;
  city_id: string;
  district_id: string;
  village_id: string;

  applications: TApplication[];
  organizationalExperiences: TOrganizationalExperience[];
  workExperiences: TWorkExperience[];
  educations: TEducation[];

  created_at: string;
  updated_at: string;
};

export type TRecruiter = {
  id: string;
  user_id: string;
  NPWP: string;
  company_name: string;
  company_logo: string;
  company_description: string;
  contract_file: string;
  address: string;
  phone_number: string;
  linkedin_url?: string;
  instagram_url?: string;
  rejection_reason?: string;
  status: "APPROVED" | "REJECTED" | "PENDING";

  province_id: string;
  city_id: string;
  district_id: string;
  village_id: string;

  jobs: TJob[];

  created_at: string;
  updated_at: string;
};

export type TApplication = {
  id: string;
  job_id: string;
  student_id: string;
  status: string;
  applied_at: string;
  updated_at: string;
};

export type TOrganizationalExperience = {
  id: string;
  organization_name: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export type TWorkExperience = {
  id: string;
  company_name: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export type TEducation = {
  id: string;
  degree: "S1" | "S2" | "S3";
  university: string;
  faculty: string;
  major: string;
  gpa: number;
  start_year: number;
  end_year?: number | null;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type TJob = {
  id: string;
  recruiter_id: string;
  title: string;
  short_description: string;
  full_description: string;
  salary: string;
  province_id: string;
  city_id: string;
  status: "ACTIVE" | "INACTIVE" | "CLOSED";
  created_at: string;
  updated_at: string;
};
