"use client";

import { cn } from "@/lib/utils";
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
