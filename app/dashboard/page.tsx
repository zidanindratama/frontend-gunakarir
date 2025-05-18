"use client";

import DasboardDataTablePekerjaan from "@/components/dashboard/main/recruiter/dashboard-data-table-pekerjaan";
import { JobTypePieChart } from "@/components/dashboard/main/recruiter/job-type-pie-chart";
import RecruiterStatusCard from "@/components/dashboard/main/recruiter/reecuiter-status-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";

export default function DashboardMainPage() {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const user: TUser = userData?.data;

  return (
    <section>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Beranda</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {user?.role === "RECRUITER" && (
          <div className="grid grid-cols-1 gap-6">
            <RecruiterStatusCard />
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 items-stretch">
              <div className="md:col-span-2 h-full">
                <JobTypePieChart />
              </div>
              <div className="md:col-span-3 h-full">
                <DasboardDataTablePekerjaan />
              </div>
            </div>
          </div>
        )}
        {user?.role === "ADMIN" && (
          <div className="">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
              <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        )}
      </div>
    </section>
  );
}
