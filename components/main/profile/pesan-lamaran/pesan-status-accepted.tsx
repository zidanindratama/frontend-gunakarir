"use client";

import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { TApplication } from "@/types/application-type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { LamaranStatusBadge } from "../lamaran-status";

type Props = {
  application: TApplication;
};

const PesanStatusAccepted = ({ application }: Props) => {
  const studentName = application.student?.fullname ?? "Pelamar";
  const jobTitle = application.job?.title ?? "Posisi";
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
          Kami dengan senang hati menginformasikan bahwa Anda telah berhasil
          lolos seleksi untuk posisi <strong>{jobTitle}</strong> di{" "}
          <strong>{companyName}</strong>. Selamat atas pencapaian Anda!
        </p>

        <p>
          Kami sangat terkesan dengan kualifikasi, pengalaman, dan antusiasme
          yang Anda tunjukkan selama proses seleksi. Kami yakin Anda akan
          menjadi aset berharga bagi tim kami.
        </p>

        <p>
          Untuk langkah selanjutnya, kami mengundang Anda untuk menghadiri
          pertemuan akhir guna membahas penawaran kerja dan proses onboarding:
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Keterangan</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Lokasi</TableCell>
              <TableCell>{recruiter?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kontak</TableCell>
              <TableCell>{recruiter?.phone_number}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p>
          Jika Anda tidak dapat hadir pada waktu yang ditentukan, mohon
          informasikan kepada kami untuk penjadwalan ulang.
        </p>

        <p>
          Kami juga akan mengirimkan surat penawaran resmi melalui email, yang
          mencakup detail gaji, tunjangan, dan persyaratan lainnya. Harap tinjau
          dokumen tersebut sebelum pertemuan.
        </p>

        <p>
          Jika ada pertanyaan sebelum pertemuan, silakan hubungi kami di{" "}
          {recruiter?.phone_number}
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

export default PesanStatusAccepted;
