"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { AksiPekerjaan } from "./aksi-pekerjaan";

export type Pekerjaan = {
  id: string;
  title: string;
  recruiter: {
    company_name: string;
  };
  salary: number;
  status: "ACTIVE" | "INACTIVE" | "CLOSED";
};

export const pekerjaanColumns: ColumnDef<Pekerjaan>[] = [
  {
    accessorKey: "title",
    header: "Judul Pekerjaan",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "recruiter.company_name",
    header: "Perusahaan",
    cell: ({ row }) => row.original.recruiter.company_name,
  },
  {
    accessorKey: "salary",
    header: "Gaji",
    cell: ({ row }) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.original.salary),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={
            status === "ACTIVE"
              ? "text-green-500 border-green-500"
              : status === "INACTIVE"
              ? "text-yellow-500 border-yellow-500"
              : "text-red-500 border-red-500"
          }
          variant="outline"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <AksiPekerjaan pekerjaanId={row.original.id} />;
    },
  },
];
