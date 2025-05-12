"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TApplication } from "@/types/application-type";
import { Badge } from "@/components/ui/badge";
import { getLamaranStatusLabel } from "@/helpers/get-application-status-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const interviewManagementColumns: ColumnDef<TApplication>[] = [
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
    id: "schedule",
    header: "Tanggal Wawancara",
    cell: ({ row }) => {
      const interview = row.original.interviews.find(
        (intv) => intv.type === "MANAGEMENT"
      );
      return interview?.schedule
        ? new Date(interview.schedule).toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
          })
        : "-";
    },
  },
  {
    id: "confirm_deadline",
    header: "Batas Konfirmasi",
    cell: ({ row }) => {
      const interview = row.original.interviews.find(
        (intv) => intv.type === "MANAGEMENT"
      );
      return interview?.confirm_deadline
        ? new Date(interview.confirm_deadline).toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
          })
        : "-";
    },
  },
  {
    id: "method",
    header: "Metode",
    cell: ({ row }) =>
      row.original.interviews.find((intv) => intv.type === "MANAGEMENT")
        ?.method ?? "-",
  },
  {
    id: "interview_detail",
    header: "Detail Interview",
    cell: ({ row }) => {
      const intv = row.original.interviews.find(
        (intv) => intv.type === "MANAGEMENT"
      );
      if (!intv) return "-";
      if (intv.method === "ONLINE") {
        return (
          <a
            href={intv.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Link Interview
          </a>
        );
      }
      if (intv.method === "OFFLINE") {
        return intv.location ?? "-";
      }
      return "-";
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div className="flex flex-row gap-6">
          <Button variant={"outline"} size={"sm"} asChild>
            <Link
              href={`/dashboard/pekerjaan/${application.job_id}/tahapan/${application.id}/${application.stages[0].id}`}
            >
              Revisi Tahapan Awal
            </Link>
          </Button>
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
