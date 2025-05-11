"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { TStudent } from "@/types/student-type";
import { AksiMahasiswa } from "./aksi-mahasiswa";

export const mahasiswaColumns: ColumnDef<TStudent>[] = [
  {
    accessorKey: "fullname",
    header: "Nama Lengkap",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.fullname
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </div>
    ),
  },
  {
    accessorKey: "NPM",
    header: "NPM",
    cell: ({ row }) => row.original.NPM,
  },
  {
    accessorKey: "phone_number",
    header: "No. Telepon",
    cell: ({ row }) => row.original.phone_number,
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
      return <AksiMahasiswa mahasiswaId={row.original.id} />;
    },
  },
];
