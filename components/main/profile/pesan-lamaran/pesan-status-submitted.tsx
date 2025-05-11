import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { TApplication } from "@/types/application-type";
import React from "react";
import { LamaranStatusBadge } from "../lamaran-status";

type Props = { application: TApplication };

const PesanStatusSubmitted = ({ application }: Props) => {
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
          Terima kasih telah mengajukan lamaran untuk posisi{" "}
          <strong>{jobTitle}</strong> di <strong>{companyName}</strong>. Kami
          telah menerima aplikasi Anda dan sangat menghargai minat Anda untuk
          bergabung dengan tim kami.
        </p>

        <p>
          Saat ini kami sedang meninjau semua aplikasi yang masuk untuk posisi
          tersebut. Kami akan melakukan evaluasi secara menyeluruh terhadap
          pengalaman dan kualifikasi Anda, serta mencocokkannya dengan kebutuhan
          dan persyaratan kami.
        </p>

        <p>
          Apabila profil Anda sesuai dengan kriteria kami, kami akan menghubungi
          Anda dalam 2–3 minggu ke depan untuk proses seleksi lanjutan. Jika
          dalam waktu tersebut Anda belum menerima kabar dari kami, besar
          kemungkinan kami telah melanjutkan proses rekrutmen dengan kandidat
          lain.
        </p>

        <p>
          Kami sangat menghargai waktu dan usaha yang telah Anda berikan. Semoga
          sukses dalam pencarian karier Anda, dan terima kasih sekali lagi atas
          ketertarikan Anda terhadap <strong>{companyName}</strong>.
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

export default PesanStatusSubmitted;
