"use client";

import { BadgeCheck, Clock4, ShieldX } from "lucide-react";
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

  const status = data?.data?.recruiter?.status ?? "PENDING";
  const reason = data?.data?.recruiter?.rejection_reason ?? "";

  const { icon, title, description } =
    statusList[status as keyof typeof statusList];

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
        <Button variant="outline" className="w-full" disabled>
          Status: {status}
        </Button>
      </CardFooter>
    </Card>
  );
}
