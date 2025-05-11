import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { TApplication } from "@/types/application-type";
import React from "react";
import { LamaranStatusBadge } from "../lamaran-status";

type Props = { application: TApplication };

const PesanStatusPassedScreening = ({ application }: Props) => {
  const studentName = application.student?.fullname ?? "Pelamar";
  const jobTitle = application.job?.title ?? "Posisi yang dilamar";
  const recruiter = application.job?.recruiter;

  const companyName = recruiter?.company_name ?? "Perusahaan";
  const recruiterName = recruiter?.user?.username ?? "Tim Rekrutmen";
  const recruiterEmail = recruiter?.user?.email;

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
          Selamat! Anda telah berhasil melewati tahap screening awal untuk
          posisi <strong>{jobTitle}</strong> di <strong>{companyName}</strong>.
        </p>

        <p>
          Kami sangat menghargai usaha Anda sejauh ini. Selanjutnya, tim kami
          akan menghubungi Anda untuk proses seleksi lanjutan.
        </p>

        <p>
          Mohon untuk memantau email Anda secara berkala agar tidak terlewat
          informasi penting terkait tahap selanjutnya.
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

export default PesanStatusPassedScreening;
