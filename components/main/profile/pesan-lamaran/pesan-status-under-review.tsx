import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { TApplication } from "@/types/application-type";
import React from "react";
import { LamaranStatusBadge } from "../lamaran-status";

type Props = { application: TApplication };

const PesanStatusUnderReview = ({ application }: Props) => {
  const studentName = application.student?.fullname ?? "Pelamar";
  const jobTitle = application.job?.title ?? "Posisi yang dilamar";
  const recruiter = application.job?.recruiter;

  const companyName = recruiter?.company_name ?? "Perusahaan";
  const recruiterName = recruiter?.user?.username ?? "Tim Rekrutmen";
  const recruiterEmail = recruiter?.user?.email;

  const currentStage =
    application.stages?.[application.stages.length - 1]?.stage_type ??
    "CV_SCREENING";

  const stageLabels: Record<string, string> = {
    CV_SCREENING: "CV Screening",
    HR_INTERVIEW: "Interview HR",
    MANAGEMENT_INTERVIEW: "Interview Manajemen",
  };

  const currentStageLabel = stageLabels[currentStage] ?? "Proses Review";

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-muted-foreground mb-1">Status</h4>
        <LamaranStatusBadge type={getLamaranStatusKey(application.status)} />
      </div>

      <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4">
        <p>
          Dear <strong>{studentName}</strong>,
        </p>

        <p>
          Kami ingin menginformasikan bahwa lamaran Anda untuk posisi{" "}
          <strong>{jobTitle}</strong> di <strong>{companyName}</strong> saat ini
          sedang dalam tahap <strong>{currentStageLabel}</strong> dan sedang
          direview oleh tim rekrutmen kami.
        </p>

        <p>
          Kami akan menilai kembali kualifikasi, pengalaman, dan kesesuaian Anda
          terhadap posisi tersebut secara menyeluruh.
        </p>

        <p>
          Proses ini dapat memakan waktu beberapa hari kerja. Kami akan segera
          menghubungi Anda jika Anda terpilih untuk mengikuti tahapan
          selanjutnya.
        </p>

        <p>
          Terima kasih atas kesabaran dan minat Anda untuk bergabung bersama{" "}
          <strong>{companyName}</strong>.
        </p>

        <p>
          Hormat kami,
          <br />
          <strong>{recruiterName}</strong>
          <br />
          {companyName}
          <br />
          {recruiterEmail}
        </p>
      </div>
    </div>
  );
};

export default PesanStatusUnderReview;
