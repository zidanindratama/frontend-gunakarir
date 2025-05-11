import { TMajor } from "./major-type";

export type TFacultyMajor = {
  id: string;
  name: string;
  created_at: string;
  majors: TMajor[];
};
