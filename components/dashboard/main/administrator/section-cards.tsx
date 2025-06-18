"use client";

import {
  IconBriefcase,
  IconUserCheck,
  IconUser,
  IconMailFilled,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";

export function SectionCards() {
  const { data, isLoading, isSuccess } = useGetData({
    queryKey: ["admin-dashboard"],
    dataProtected: "dashboard/admin",
  });

  if (isLoading || !isSuccess) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const { totalJobs, totalRecruiters, totalStudents, totalApplications } =
    data?.data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Card>
        <CardHeader>
          <CardDescription>Total Lowongan</CardDescription>
          <CardTitle className="text-2xl font-semibold">{totalJobs}</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBriefcase className="mr-1 size-4" /> Aktif
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Dari seluruh recruiter
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Recruiter</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {totalRecruiters}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUserCheck className="mr-1 size-4" /> Terverifikasi
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Sudah disetujui admin
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Mahasiswa</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {totalStudents}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUser className="mr-1 size-4" /> Aktif
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Sudah mendaftar sistem
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Total Lamaran</CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {totalApplications}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconMailFilled className="mr-1 size-4" /> Dikirim
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Dikirim oleh mahasiswa
        </CardFooter>
      </Card>
    </div>
  );
}
