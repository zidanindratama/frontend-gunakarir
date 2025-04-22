import { TLamaran } from "@/types/mock-lamaran-type";

export const applications: TLamaran[] = [
  {
    id: "1",
    position: "Front-end Web Developer",
    type: "Part-time",
    salary: "Rp.8.000.000 - Rp.12.000.000",
    company: {
      name: "DOT Indonesia",
      location: "Malang",
      logoUrl: "/main/company-logo-1.svg",
    },
    status: "TERKIRIM",
    date: "2025-04-29",
  },
  {
    id: "2",
    position: "UI/UX Designer",
    type: "Full-time",
    salary: "Rp.10.000.000 - Rp.14.000.000",
    company: {
      name: "Kreasi Digital",
      location: "Jakarta",
      logoUrl: "/main/company-logo-2.svg",
    },
    status: "REVIEW",
    date: "2025-04-26",
  },
  {
    id: "3",
    position: "Backend Developer",
    type: "Full-time",
    salary: "Rp.12.000.000 - Rp.15.000.000",
    company: {
      name: "NextDev Labs",
      location: "Bandung",
      logoUrl: "/main/company-logo-3.svg",
    },
    status: "LOLOS_SCREENING",
    date: "2025-04-22",
  },
  {
    id: "4",
    position: "Mobile App Developer",
    type: "Internship",
    salary: "Rp.3.000.000 - Rp.5.000.000",
    company: {
      name: "Appify Studio",
      location: "Yogyakarta",
      logoUrl: "/main/company-logo-4.svg",
    },
    status: "DITERIMA",
    date: "2025-04-15",
  },
  {
    id: "5",
    position: "Full-stack Engineer",
    type: "Freelance",
    salary: "Rp.6.000.000 - Rp.9.000.000",
    company: {
      name: "Buildify Tech",
      location: "Surabaya",
      logoUrl: "/main/company-logo-5.svg",
    },
    status: "DITOLAK",
    date: "2025-04-10",
  },
];
