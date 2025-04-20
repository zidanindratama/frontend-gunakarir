export type TUser = {
  id: string;
  email: string;
  username: string;
  image_url: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
  student?: any;
  recruiter?: any;
};
