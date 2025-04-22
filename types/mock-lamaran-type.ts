import { LucideIcon } from "lucide-react";

export type TStatusLamaran =
  | "TERKIRIM"
  | "REVIEW"
  | "LOLOS_SCREENING"
  | "TIDAK_LOLOS_SCREENING"
  | "UNDANGAN_INTERVIEW"
  | "AKAN_HADIR_INTERVIEW"
  | "TIDAK_HADIR_INTERVIEW"
  | "DITERIMA"
  | "DITOLAK";

export type TLamaran = {
  id: string;
  position: string;
  type: "Part-time" | "Full-time" | "Internship" | "Freelance";
  salary: string;
  company: {
    name: string;
    location: string;
    logoUrl: string;
  };
  status: TStatusLamaran;
  date: string;
};
