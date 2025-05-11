"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

import { TApplication } from "@/types/application-type";
import { TJob } from "@/types/job-type";
import { getJobTypeLabel } from "@/helpers/get-job-type-label";
import { getLamaranStatusKey } from "@/helpers/get-application-status-label";
import { Skeleton } from "@/components/ui/skeleton";
import { useWilayah } from "@/hooks/useWilayah";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { LamaranStatusBadge } from "./lamaran-status";
import { motion } from "framer-motion";
import CardPekerjaan from "../pekerjaan/card-pekerjaan";
import PesanStatus from "./pesan-lamaran/pesan-status";

const MainProfile = () => {
  const [selectedApplication, setSelectedApplication] =
    React.useState<TApplication | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [applicationStatus, setSelectedApplicationStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const user: TUser = userData?.data;

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: "10",
    search: searchQuery,
    status: applicationStatus || "",
  });

  const { data: myApplicationsData, isLoading } = useGetData({
    queryKey: ["my-applications", queryParams.toString()],
    dataProtected: `applications/my-applications/${
      user?.student?.id
    }?${queryParams.toString()}`,
  });

  const wilayah = useWilayah({});
  const getProvinceName = (id: string) => {
    return wilayah.provinceOptions.find((prov) => prov.id === id)?.name ?? "-";
  };

  const myApplications: TApplication[] = myApplicationsData?.data.data;
  const totalPages = myApplicationsData?.data.meta?.totalPages || 1;

  const handleResetFilters = () => {
    setSelectedApplicationStatus("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:px-10">
        <div className="bg-white dark:bg-neutral-900 border p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={user?.image_url} />
              <AvatarFallback className="text-xl">GN</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                {user?.username}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                {user?.email}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                <Button variant="outline" asChild>
                  <Link href="/profile/ubah">Ubah Profile</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile/ubah-password">Ubah Password</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-white dark:bg-neutral-900 border p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col md:flex-row justify-between w-full gap-3">
                <div className="flex gap-3 w-full">
                  <Input
                    type="text"
                    placeholder="Cari Berdasarkan Lowongan"
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-row gap-6 items-center">
                  <Select
                    value={applicationStatus}
                    onValueChange={setSelectedApplicationStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUBMITTED">Terkirim</SelectItem>
                      <SelectItem value="INTERVIEW_INVITED">
                        Undangan Interview
                      </SelectItem>
                      <SelectItem value="ACCEPTED">Diterima</SelectItem>
                      <SelectItem value="REJECTED">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {isLoading
                ? [...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="border p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm space-y-4"
                    >
                      <Skeleton className="w-3/4 h-6 rounded" />
                      <div className="flex gap-2">
                        <Skeleton className="w-24 h-5 rounded" />
                        <Skeleton className="w-32 h-5 rounded" />
                      </div>
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-16 h-16 rounded-md" />
                        <div className="space-y-2 w-full">
                          <Skeleton className="w-1/2 h-4 rounded" />
                          <Skeleton className="w-1/3 h-4 rounded" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="space-y-2">
                          <Skeleton className="w-20 h-4 rounded" />
                          <Skeleton className="w-24 h-4 rounded" />
                        </div>
                        <Skeleton className="w-32 h-10 rounded" />
                      </div>
                    </div>
                  ))
                : myApplications?.map((application, index) => {
                    return (
                      <motion.div
                        className="bg-white dark:bg-neutral-900 border p-6 rounded-2xl shadow-sm"
                        key={application.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.4,
                        }}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex-1">
                            <h2 className="text-lg md:text-xl font-semibold mb-2">
                              {application.job?.title}
                            </h2>
                            <div className="flex flex-wrap gap-3 items-center mb-4">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 text-sm rounded">
                                {getJobTypeLabel(application.job?.type ?? "")}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Gaji:{" "}
                                {application?.job?.salary
                                  ? `${Number(
                                      application?.job?.salary
                                    ).toLocaleString("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                    })}`
                                  : "-"}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              {application.job?.recruiter.company_logo && (
                                <Image
                                  src={application.job?.recruiter.company_logo}
                                  alt={application.job?.recruiter.company_name}
                                  width={64}
                                  height={64}
                                  className="rounded-md"
                                />
                              )}
                              <div>
                                <h3 className="font-medium">
                                  {application.job?.recruiter.company_name}
                                </h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                  <MapPin className="w-4 h-4" />
                                  {getProvinceName(
                                    application.job?.province_id ?? ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-1/3 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6 flex flex-col gap-3">
                            <div>
                              <h4 className="font-semibold text-muted-foreground mb-1">
                                Status
                              </h4>
                              <LamaranStatusBadge
                                type={getLamaranStatusKey(application.status)}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(
                                application.applied_at
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                setSelectedApplication(application);
                                setOpenDrawer(true);
                              }}
                            >
                              Lihat Detail
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        size="default"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          size="default"
                          isActive={currentPage === index + 1}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            setCurrentPage(index + 1);
                          }}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        size="default"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
        <SheetContent
          side="right"
          className="md:min-w-[900px] max-w-none overflow-y-auto max-h-screen"
        >
          <SheetHeader>
            <SheetTitle className="font-bold text-xl">
              Detail Lamaran
            </SheetTitle>
          </SheetHeader>
          <div className="p-6 w-full grid gap-10">
            <CardPekerjaan job={selectedApplication?.job ?? ({} as TJob)} />
            <PesanStatus application={selectedApplication!} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MainProfile;
