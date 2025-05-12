"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TApplication } from "@/types/application-type";
import { Badge } from "@/components/ui/badge";
import { getLamaranStatusLabel } from "@/helpers/get-application-status-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const kandidatLolosColumns: ColumnDef<TApplication>[] = [
  {
    accessorKey: "student.fullname",
    header: "Nama Mahasiswa",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Link
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
    accessorKey: "job.title",
    header: "Posisi",
    cell: ({ row }) => row.original.job?.title ?? "-",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Button className="bg-blue-500" size="sm" asChild>
          <Link href={`/pekerjaan/${application.job_id}`}>Detail Lowongan</Link>
        </Button>
      );
    },
  },
];
