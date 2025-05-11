import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { TApplication } from "@/types/application-type";
import { Button } from "@/components/ui/button";
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

const PesanStatusInterview = ({ application }: Props) => {
  const studentName = application.student?.fullname ?? "Pelamar";
  const jobTitle = application.job?.title ?? "Posisi yang dilamar";
  const interview = application.interviews?.[0];
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
          Terima kasih telah melamar posisi <strong>{jobTitle}</strong> di{" "}
          <strong>{companyName}</strong>. Kami dengan senang hati
          menginformasikan bahwa berdasarkan evaluasi awal dari CV dan surat
          lamaran Anda, kami ingin mengundang Anda untuk mengikuti wawancara.
        </p>

        <p>Berikut adalah undangan interview terkait rekrutmen:</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Keterangan</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Waktu</TableCell>
              <TableCell>
                {interview
                  ? new Date(interview.schedule).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pelaksanaan</TableCell>
              <TableCell>{interview?.method ?? "-"}</TableCell>
            </TableRow>
            {interview?.link && (
              <TableRow>
                <TableCell className="font-medium">Link</TableCell>
                <TableCell>
                  <a
                    href={interview.link}
                    className="underline text-blue-500 break-all"
                    target="_blank"
                  >
                    {interview.link}
                  </a>
                </TableCell>
              </TableRow>
            )}
            {interview?.notes && (
              <TableRow>
                <TableCell className="font-medium">Catatan</TableCell>
                <TableCell>{interview.notes}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

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

      <div className="flex gap-4 mt-6">
        <Button variant="outline">Tidak Hadir</Button>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Hadir
        </Button>
      </div>
    </div>
  );
};

export default PesanStatusInterview;
