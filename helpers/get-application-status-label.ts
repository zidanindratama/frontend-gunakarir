import { lamaranStatus } from "@/components/main/profile/lamaran-status";
import { ApplicationStatus } from "@/types/application-type";

export const statusMap: Record<ApplicationStatus, keyof typeof lamaranStatus> =
  {
    SUBMITTED: "TERKIRIM",
    PENDING: "MENUNGGU_TINJAUAN",
    INTERVIEW_INVITED: "UNDANGAN_INTERVIEW",
    CONFIRMED_INTERVIEW: "AKAN_HADIR_INTERVIEW",
    DECLINED_INTERVIEW: "TIDAK_HADIR_INTERVIEW",
    ACCEPTED: "DITERIMA",
    REJECTED: "DITOLAK",
  };

export function getLamaranStatusKey(status: ApplicationStatus) {
  return statusMap[status];
}

export function getLamaranStatusLabel(status: ApplicationStatus) {
  return lamaranStatus[statusMap[status]].label;
}

export function getLamaranStatusColor(status: ApplicationStatus) {
  return lamaranStatus[statusMap[status]].color;
}

export function getLamaranStatusIcon(status: ApplicationStatus) {
  return lamaranStatus[statusMap[status]].icon;
}
