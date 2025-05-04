"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import AksiRekruter from "./aksi-rekruter";

export type Recruiter = {
  id: string;
  company_name: string;
  NPWP: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  user: {
    email: string;
    username: string;
  };
};

export const recruiterColumns: ColumnDef<Recruiter>[] = [
  {
    accessorKey: "company_name",
    header: "Nama Perusahaan",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.company_name}</div>
    ),
  },
  {
    accessorKey: "NPWP",
    header: "NPWP",
    cell: ({ row }) => row.original.NPWP,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => row.original.user.email,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={
            status === "APPROVED"
              ? "text-green-500 border-green-500"
              : status === "REJECTED"
              ? "text-red-500 border-red-500"
              : "text-yellow-500 border-yellow-500"
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
      return <AksiRekruter recruiterId={row.original.id} />;
    },
  },
];
