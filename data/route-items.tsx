import { RouteItems } from "@/types/route-type";
import {
  Building2,
  LayoutDashboard,
  LifeBuoy,
  Send,
  SquareTerminal,
  User,
} from "lucide-react";

export const routeItems: RouteItems = {
  navMain: [
    {
      title: "Pekerjaan",
      url: "/dashboard/pekerjaan",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "List Pekerjaan",
          url: "/dashboard/pekerjaan",
        },
        {
          title: "Tambah Pekerjaan",
          url: "/dashboard/pekerjaan/tambah",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Bantuan",
      url: "/bantuan",
      icon: LifeBuoy,
    },
    {
      title: "Umpan Balik",
      url: "/umpan-balik",
      icon: Send,
    },
  ],
  managementNav: [
    {
      name: "Rekruter",
      url: "/dashboard/rekruter",
      icon: Building2,
    },
    {
      name: "Mahasiswa",
      url: "/dashboard/mahasiswa",
      icon: User,
    },
  ],
};
