export type EducationDegree = "D3" | "S1" | "S2" | "S3";

export type TFaculty = {
  id: string;
  name: string;
  created_at: string;
  updatedAt: string;
};

export type TMajor = {
  id: string;
  faculty_id: string;
  name: string;
  degree: EducationDegree;
  created_at: string;
  updatedAt: string;
};
