"use client";

import { cn } from "@/lib/utils";
import { TApplication } from "@/types/application-type";
import {
  MapPin,
  Eye,
  XCircle,
  CalendarClock,
  CalendarCheck,
  CalendarX,
  CheckCircle2,
} from "lucide-react";

export const lamaranStatus = {
  TERKIRIM: {
    label: "Terkirim",
    color: "text-yellow-600",
    icon: MapPin,
  },
  MENUNGGU_TINJAUAN: {
    label: "Menunggu Tinjauan",
    color: "text-blue-600",
    icon: Eye,
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
    color: "text-red-700",
    icon: XCircle,
  },
};

export function LamaranStatusBadge({
  type,
  application,
}: {
  type: keyof typeof lamaranStatus;
  application?: TApplication;
}) {
  const status = lamaranStatus[type];
  if (!status) return null;

  const Icon = status.icon;

  let stageLabel = "";
  if (type === "UNDANGAN_INTERVIEW" && application?.interviews?.length) {
    const latestInterview =
      application.interviews[application.interviews.length - 1]; // ambil interview pertama, bisa ubah logic kalau perlu
    stageLabel =
      latestInterview.type === "HR"
        ? " (HR Interview)"
        : latestInterview.type === "MANAGEMENT"
        ? " (Manajemen Interview)"
        : "";
  }

  return (
    <div className={cn("inline-flex items-center gap-1 text-sm", status.color)}>
      <Icon className="w-4 h-4" />
      <span>
        {status.label}
        {stageLabel}
      </span>
    </div>
  );
}
