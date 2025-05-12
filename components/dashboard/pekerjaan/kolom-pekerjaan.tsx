"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TJob } from "@/types/job-type";
import { AksiPekerjaan } from "./aksi-pekerjaan";

export const pekerjaanColumns: ColumnDef<TJob>[] = [
  {
    accessorKey: "title",
    header: "Nama",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "recruiter.company_name",
    header: "Perusahaan",
    cell: ({ row }) => row.original.recruiter.company_name,
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => {
      const typeMap: Record<string, string> = {
        FULL_TIME: "Penuh Waktu",
        PART_TIME: "Paruh Waktu",
        INTERNSHIP: "Magang",
        CONTRACT: "Kontrak",
        FREELANCE: "Freelance",
        TEMPORARY: "Sementara",
      };

      const type = row.original.type;
      return typeMap[type] ?? type;
    },
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
            status === true
              ? "text-green-500 border-green-500"
              : status === false
              ? "text-red-500 border-red-500"
              : "text-red-500 border-red-500"
          }
          variant="outline"
        >
          {status ? "Dibuka" : "Ditutup"}
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
