"use client";

import {
  IconBriefcase,
  IconCheck,
  IconMailFilled,
  IconCalendar,
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
    queryKey: ["recruiter-dashboard"],
    dataProtected: "dashboard/recruiter",
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

  const {
    totalApplications,
    activeJobs,
    endingSoonJobs,
    passedCandidates,
    thisWeekInterviews,
    applicationsGrowth,
    interviewGrowth,
  } = data?.data || {};

  const formatGrowth = (growth: number) => {
    if (growth === 0) return "Stabil";
    if (growth > 0) return `+${growth}%`;
    return `${growth}%`;
  };

  const formatGrowthDesc = (growth: number) => {
    if (growth === 0) return "Tidak ada perubahan";
    if (growth > 50) return "Naik pesat minggu ini";
    if (growth < -50) return "Turun drastis minggu ini";
    return growth > 0 ? "Meningkat minggu ini" : "Menurun minggu ini";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Total Lamaran Masuk */}
      <Card>
        <CardHeader>
          <CardDescription>Total Lamaran Masuk</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalApplications}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconMailFilled className="mr-1 size-4" />
              {formatGrowth(applicationsGrowth)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {formatGrowthDesc(applicationsGrowth)}
          </div>
          <div className="text-muted-foreground">Dibandingkan minggu lalu</div>
        </CardFooter>
      </Card>

      {/* Lowongan Aktif */}
      <Card>
        <CardHeader>
          <CardDescription>Lowongan Aktif</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activeJobs}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconBriefcase className="mr-1 size-4" />
              {endingSoonJobs} akan berakhir
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Periksa lowongan yang segera ditutup
          </div>
          <div className="text-muted-foreground">
            Kelola di halaman Pekerjaan
          </div>
        </CardFooter>
      </Card>

      {/* Kandidat Lolos */}
      <Card>
        <CardHeader>
          <CardDescription>Kandidat Lolos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {passedCandidates}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCheck className="mr-1 size-4" />
              +5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Kandidat melewati tahapan screening
          </div>
          <div className="text-muted-foreground">
            Termasuk yang siap di-interview
          </div>
        </CardFooter>
      </Card>

      {/* Interview Minggu Ini */}
      <Card>
        <CardHeader>
          <CardDescription>Interview Minggu Ini</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {thisWeekInterviews}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar className="mr-1 size-4" />
              {formatGrowth(interviewGrowth)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {formatGrowthDesc(interviewGrowth)}
          </div>
          <div className="text-muted-foreground">Dibandingkan minggu lalu</div>
        </CardFooter>
      </Card>
    </div>
  );
}
