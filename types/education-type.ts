export type EducationDegree = "D3" | "S1" | "S2" | "S3";

export type TEducation = {
  id: string;
  student_id: string;
  degree: EducationDegree;
  university: string;
  faculty: string;
  major: string;
  gpa: number;
  start_year: number;
  end_year?: number;
  description?: string;
  created_at: string;
  updated_at: string;
};
