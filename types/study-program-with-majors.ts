export type Major = {
  id: string;
  study_program_id: string;
  name: string;
  degree: string;
  created_at: string;
};

export type StudyProgramWithMajors = {
  id: string;
  name: string;
  created_at: string;
  majors: Major[];
};
