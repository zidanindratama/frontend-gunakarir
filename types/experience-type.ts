export type TOrganizationalExperience = {
  id: string;
  student_id: string;
  organization_name: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type TWorkExperience = {
  id: string;
  student_id: string;
  company_name: string;
  position: string;
  start_date: string;
  end_date?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};
