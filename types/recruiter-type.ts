import { TUser } from "./user-type";

export type Status = "APPROVED" | "REJECTED" | "PENDING";

export type TRecruiter = {
  id: string;
  user_id: string;
  user: TUser;
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
  status: Status;
  province_id: string;
  city_id: string;
  district_id: string;
  village_id: string;
  created_at: string;
  updated_at: string;
};
