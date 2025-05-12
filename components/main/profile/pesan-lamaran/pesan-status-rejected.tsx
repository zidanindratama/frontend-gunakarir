"use client";

import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { TApplication } from "@/types/application-type";
import React from "react";
import { LamaranStatusBadge } from "../lamaran-status";

type Props = {
  application: TApplication;
};

const PesanStatusRejected = ({ application }: Props) => {
  const studentName = application.student?.fullname ?? "Pelamar";
  const jobTitle = application.job?.title ?? "Posisi yang dilamar";
  const recruiter = application.job?.recruiter;

  const companyName = recruiter?.company_name ?? "Perusahaan";
  const recruiterName = recruiter?.user?.username ?? "Tim Rekrutmen";
  const recruiterEmail = recruiter?.user?.email ?? "hrd@example.com";

  const currentStage =
    application.stages?.[application.stages.length - 1]?.stage_type ??
    "CV_SCREENING";

  const lastStage = application.stages?.[application.stages.length - 1];
  const notes = lastStage?.notes;

  const stageLabels: Record<string, string> = {
    CV_SCREENING: "tahapan CV Screening",
    HR_INTERVIEW: "tahapan Interview HR",
    MANAGEMENT_INTERVIEW: "tahapan Interview Manajemen",
  };

  const currentStageLabel = stageLabels[currentStage] ?? "proses seleksi";

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
          Terima kasih atas ketertarikan Anda pada posisi{" "}
          <strong>{jobTitle}</strong> di <strong>{companyName}</strong>. Kami
          sangat menghargai waktu dan usaha yang telah Anda luangkan dalam
          mengikuti proses rekrutmen ini.
        </p>

        <p>
          Berdasarkan hasil evaluasi pada <strong>{currentStageLabel}</strong>,
          kami memutuskan untuk tidak melanjutkan proses rekrutmen Anda ke tahap
          selanjutnya.
        </p>

        {notes && (
          <p>
            <em>Catatan dari tim rekrutmen:</em>
            <br />
            <span className="italic text-muted-foreground">
              &quot;{notes}&quot;
            </span>
          </p>
        )}

        <p>
          Kami akan menyimpan informasi Anda di database kami, dan akan
          menghubungi Anda jika ada kesempatan yang lebih sesuai di masa
          mendatang.
        </p>

        <p>
          Terima kasih sekali lagi atas minat Anda untuk bergabung dengan{" "}
          <strong>{companyName}</strong>. Kami mengucapkan yang terbaik untuk
          karier Anda di masa depan.
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

export default PesanStatusRejected;
