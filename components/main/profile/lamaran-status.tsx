"use client";

import {
  MapPin,
  Eye,
  FileCheck2,
  XCircle,
  CalendarClock,
  CalendarCheck,
  CalendarX,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const lamaranStatus = {
  TERKIRIM: {
    label: "Terkirim",
    color: "text-yellow-600",
    icon: MapPin,
  },
  REVIEW: {
    label: "Review",
    color: "text-blue-600",
    icon: Eye,
  },
  LOLOS_SCREENING: {
    label: "Lolos Screening",
    color: "text-cyan-700",
    icon: FileCheck2,
  },
  TIDAK_LOLOS_SCREENING: {
    label: "Tidak Lolos Screening",
    color: "text-red-600",
    icon: FileCheck2,
  },
  UNDANGAN_INTERVIEW: {
    label: "Undangan Interview",
    color: "text-purple-700",
    icon: CalendarClock,
  },
  AKAN_HADIR_INTERVIEW: {
    label: "Akan Hadir Interview",
    color: "text-green-700",
    icon: CalendarCheck,
  },
  TIDAK_HADIR_INTERVIEW: {
    label: "Tidak Hadir Interview",
    color: "text-rose-600",
    icon: CalendarX,
  },
  DITERIMA: {
    label: "Diterima",
    color: "text-emerald-700",
    icon: CheckCircle2,
  },
  DITOLAK: {
    label: "Ditolak",
    color: "text-red-700", // sebelumnya abu-abu, sekarang merah
    icon: XCircle,
  },
};

export function LamaranStatusBadge({
  type,
}: {
  type: keyof typeof lamaranStatus;
}) {
  const status = lamaranStatus[type];
  if (!status) return null;
  const Icon = status.icon;

  return (
    <div className={cn("inline-flex items-center gap-1 text-sm", status.color)}>
      <Icon className="w-4 h-4" />
      <span>{status.label}</span>
    </div>
  );
}
