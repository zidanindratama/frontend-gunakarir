"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TApplication } from "@/types/application-type";
import { Badge } from "@/components/ui/badge";
import { getLamaranStatusLabel } from "@/helpers/get-application-status-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const cvScreeningColumns: ColumnDef<TApplication>[] = [
  {
    accessorKey: "student.fullname",
    header: "Nama Mahasiswa",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Link
          className="text-blue-500 underline"
          href={`/dashboard/pekerjaan/${application.job_id}/mahasiswa/${application.student_id}`}
        >
          {row.original.student?.fullname ?? "-"}
        </Link>
      );
    },
  },
  {
    accessorKey: "student.NPM",
    header: "NPM",
    cell: ({ row }) => row.original.student?.NPM ?? "-",
  },
  {
    accessorKey: "status",
    header: "Status Lamaran",
    cell: ({ row }) => (
      <Badge variant="outline">
        {getLamaranStatusLabel(row.original.status)}
      </Badge>
    ),
  },
  {
    accessorKey: "applied_at",
    header: "Tanggal Lamar",
    cell: ({ row }) =>
      new Date(row.original.applied_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div className="flex flex-row gap-6">
          <Button className="bg-blue-500" size={"sm"} asChild>
            <Link
              href={`/dashboard/pekerjaan/${application.job_id}/tahapan/${application.id}`}
            >
              Ubah Tahapan Aktif
            </Link>
          </Button>
        </div>
      );
    },
  },
];
