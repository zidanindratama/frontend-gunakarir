"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { TRecruiter } from "@/types/recruiter-type";
import Link from "next/link";
import { BadgeCheck, Clock4, ShieldX } from "lucide-react";

const statusList = {
  APPROVED: {
    icon: <BadgeCheck className="text-green-500" />,
    title: "Status Disetujui",
    description: "Selamat! Anda telah menjadi mitra resmi GunaKarir.",
  },
  REJECTED: {
    icon: <ShieldX className="text-red-500" />,
    title: "Status Ditolak",
    description: "Mohon periksa ulang dokumen atau data yang diajukan.",
  },
  PENDING: {
    icon: <Clock4 className="text-yellow-500" />,
    title: "Menunggu Persetujuan",
    description: "Data Anda sedang ditinjau oleh tim admin.",
  },
};

export default function RecruiterStatusCard() {
  const { data } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const recruiter: TRecruiter = data?.data?.recruiter;

  if (!recruiter) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Status Mitra</CardTitle>
          <CardDescription>
            Informasi status akun rekruter Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <ShieldX className="text-red-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Data Rekruter Belum Lengkap
              </p>
              <p className="text-sm text-muted-foreground">
                Silakan lengkapi data perusahaan terlebih dahulu untuk
                mengajukan sebagai mitra GunaKarir.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/profile">Lengkapi Data</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const status = recruiter.status;
  const reason = recruiter.rejection_reason ?? "";
  const { icon, title, description } =
    statusList[status as keyof typeof statusList];

  const linkHref =
    status === "APPROVED" ? "/dashboard/pekerjaan" : "/dashboard/profile";

  const linkLabel =
    status === "APPROVED" ? "Lihat Lowongan" : "Perbarui Data Rekruter";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Status Mitra</CardTitle>
        <CardDescription>Informasi status akun rekruter Anda.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          {icon}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-sm text-muted-foreground">
              {status === "REJECTED" && reason ? reason : description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={linkHref}>{linkLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
