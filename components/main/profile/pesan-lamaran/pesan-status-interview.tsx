"use client";

import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { ApplicationStatusEnum, TApplication } from "@/types/application-type";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form } from "@/components/ui/form";
import { usePatchData } from "@/hooks/use-patch-data";
import React from "react";
import { LamaranStatusBadge } from "../lamaran-status";
import {
  ApplicationUpdateFormData,
  ApplicationUpdateSchema,
} from "@/schema/application-status-update-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  application: TApplication;
  onCloseDrawer: () => void;
};

const PesanStatusInterview = ({ application, onCloseDrawer }: Props) => {
  const studentName = application.student?.fullname ?? "Pelamar";
  const jobTitle = application.job?.title ?? "Posisi yang dilamar";
  const interview = application.interviews?.[0];
  const recruiter = application.job?.recruiter;

  const companyName = recruiter?.company_name ?? "Perusahaan";
  const recruiterName = recruiter?.user?.username ?? "Tim Rekrutmen";
  const recruiterEmail = recruiter?.user?.email;

  const isResponded =
    application.status === ApplicationStatusEnum.CONFIRMED_INTERVIEW ||
    application.status === ApplicationStatusEnum.DECLINED_INTERVIEW;
  const now = new Date();
  const isExpired = interview?.confirm_deadline
    ? new Date(interview.confirm_deadline) < now
    : false;

  console.log(application);

  const form = useForm<ApplicationUpdateFormData>({
    resolver: zodResolver(ApplicationUpdateSchema),
    defaultValues: {
      status: undefined,
    },
  });

  const { mutate: applicationStatusUpdate, isPending } = usePatchData({
    queryKey: "my-applications",
    dataProtected: `applications/${application.id}`,
    successMessage: "Status kehadiran interview berhasil diperbarui",
    backUrl: "/profile",
  });

  const onSubmit = (values: ApplicationUpdateFormData) => {
    applicationStatusUpdate(values, {
      onSuccess: () => {
        onCloseDrawer();
      },
    });
  };

  const handleConfirmInterview = () => {
    form.setValue("status", ApplicationStatusEnum.CONFIRMED_INTERVIEW);
    form.handleSubmit(onSubmit)();
  };

  const handleDeclineInterview = () => {
    form.setValue("status", ApplicationStatusEnum.DECLINED_INTERVIEW);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-muted-foreground mb-1">Status</h4>
            <LamaranStatusBadge
              type={getLamaranStatusKey(application.status)}
            />
          </div>

          <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4">
            <p>
              Dear <strong>{studentName}</strong>,
            </p>

            <p>
              Terima kasih telah melamar posisi <strong>{jobTitle}</strong> di{" "}
              <strong>{companyName}</strong>. Kami dengan senang hati
              menginformasikan bahwa berdasarkan evaluasi awal dari CV dan surat
              lamaran Anda, kami ingin mengundang Anda untuk mengikuti
              wawancara.
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
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pelaksanaan</TableCell>
                  <TableCell>{interview?.method ?? "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Batas Konfirmasi
                  </TableCell>
                  <TableCell>
                    {interview?.confirm_deadline
                      ? new Date(interview.confirm_deadline).toLocaleString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "-"}
                  </TableCell>
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
            <Button
              type="button"
              variant="outline"
              onClick={handleDeclineInterview}
              disabled={isPending || isResponded || isExpired}
            >
              Tidak Hadir
            </Button>
            <Button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleConfirmInterview}
              disabled={isPending || isResponded || isExpired}
            >
              Hadir
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PesanStatusInterview;
