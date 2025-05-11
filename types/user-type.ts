import { TStudent } from "./student-type";
import { TRecruiter } from "./recruiter-type";

export type Role = "ADMIN" | "RECRUITER" | "STUDENT";

export type TUser = {
  id: string;
  email: string;
  username: string;
  password?: string;
  image_url?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;

  student?: TStudent;
  recruiter?: TRecruiter;
};
