"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useWilayah } from "@/hooks/useWilayah";
import { useInfiniteFetcher } from "@/hooks/use-get-infinite-data";
import { useGetData } from "@/hooks/use-get-data";
import { TJob } from "@/types/user-type";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { HiOutlineMapPin } from "react-icons/hi2";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SelectWilayah } from "@/components/ui/select-wilayah";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import Link from "next/link";

const ListPekerjaan = () => {
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedRecruiterId, setSelectedRecruiterId] = useState<string | null>(
    null
  );
  const [selectedJobType, setSelectedJobType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const wilayah = useWilayah({ provinceId: selectedProvinceId });

  const {
    data: recruiterData,
    fetchNextPage,
    hasNextPage: hasMore,
  } = useInfiniteFetcher({
    endpoint: "/recruiters",
    queryKey: "recruiters",
    searchParam: "search",
    initialParams: { limit: 10 },
  });

  const recruiterOptions =
    recruiterData?.pages.flatMap((page) => page.recruiters) || [];

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: "10",
    search: searchQuery,
    province_id: selectedProvinceId,
    recruiter_id: selectedRecruiterId || "",
    type: selectedJobType,
  });

  const { data: jobsData, isLoading } = useGetData({
    queryKey: ["jobs", queryParams.toString()],
    dataProtected: `jobs?${queryParams.toString()}`,
  });

  const jobs: TJob[] = jobsData?.data.jobs || [];
  const totalPages = jobsData?.data.meta?.totalPages || 1;

  const getJobTypeLabel = (type: string) => {
    const mapping: Record<string, string> = {
      FULL_TIME: "Penuh Waktu",
      PART_TIME: "Paruh Waktu",
      INTERNSHIP: "Magang",
      CONTRACT: "Kontrak",
      FREELANCE: "Lepas",
      TEMPORARY: "Sementara",
    };
    return mapping[type] || type;
  };

  const getProvinceName = (id: string) => {
    return wilayah.provinceOptions.find((prov) => prov.id === id)?.name ?? "-";
  };

  const handleResetFilters = () => {
    setSelectedProvinceId("");
    setSelectedRecruiterId(null);
    setSelectedJobType("");
    setSearchQuery("");
    setCompanySearch("");
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:px-10">
        <h1 className="text-center text-xl md:text-3xl font-bold mb-6">
          Temukan Lowongan Pekerjaan
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Cari Berdasarkan Lowongan"
            className="w-full md:max-w-xl py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-fit">
            <Button
              className="bg-blue-500 py-6"
              onClick={() => setCurrentPage(1)}
            >
              Cari Pekerjaan
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Filter</h2>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Provinsi</label>
              <SelectWilayah
                value={selectedProvinceId}
                onChange={(val) => {
                  setSelectedProvinceId(val);
                  wilayah.fetchCities(val);
                }}
                placeholder="Pilih Provinsi"
                options={wilayah.provinceOptions}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Perusahaan</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between font-normal text-muted-foreground"
                  >
                    {selectedRecruiterId
                      ? recruiterOptions.find(
                          (r) => r.id === selectedRecruiterId
                        )?.company_name || "Cari Perusahaan"
                      : "Cari Perusahaan"}
                    <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 max-h-72">
                  <Command>
                    <CommandInput
                      placeholder="Cari Perusahaan"
                      value={companySearch}
                      onValueChange={setCompanySearch}
                    />
                    <CommandList
                      className="max-h-60 overflow-y-auto"
                      onScroll={(e) => {
                        const bottom =
                          Math.abs(
                            e.currentTarget.scrollHeight -
                              e.currentTarget.scrollTop -
                              e.currentTarget.clientHeight
                          ) < 1;
                        if (bottom && hasMore) fetchNextPage?.();
                      }}
                    >
                      <CommandEmpty className="p-6">
                        Tidak ada perusahaan ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {recruiterOptions.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.company_name}
                            onSelect={() => {
                              setSelectedRecruiterId(item.id);
                              setOpen(false);
                            }}
                          >
                            {item.company_name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedRecruiterId === item.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tipe</label>
              <Select
                value={selectedJobType}
                onValueChange={setSelectedJobType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Cari Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL_TIME">Penuh Waktu</SelectItem>
                  <SelectItem value="PART_TIME">Paruh Waktu</SelectItem>
                  <SelectItem value="INTERNSHIP">Magang</SelectItem>
                  <SelectItem value="CONTRACT">Kontrak</SelectItem>
                  <SelectItem value="FREELANCE">Lepas</SelectItem>
                  <SelectItem value="TEMPORARY">Sementara</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="py-6 w-full"
              onClick={handleResetFilters}
            >
              Reset Filter
            </Button>
          </div>
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Daftar Lowongan</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {isLoading
                ? [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 space-y-3 bg-white shadow-sm"
                    >
                      <Skeleton className="w-[60%] h-[20px] rounded-full" />
                      <Skeleton className="w-[100px] h-[16px] rounded-full" />
                      <Skeleton className="w-[150px] h-[16px] rounded-full" />
                      <Skeleton className="w-[100px] h-[16px] rounded-full" />
                      <Skeleton className="w-[120px] h-[16px] rounded-full" />
                    </div>
                  ))
                : jobs.map((job) => (
                    <Link
                      href={`/pekerjaan/${job.id}`}
                      key={job.id}
                      className="border rounded-lg p-4 space-y-2 bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-black dark:text-white">
                          {job.title}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground">
                          {job.salary
                            ? `Gaji: ${Number(job.salary).toLocaleString(
                                "id-ID",
                                {
                                  style: "currency",
                                  currency: "IDR",
                                }
                              )}`
                            : "-"}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold">
                          {getJobTypeLabel(job.type)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        Batas Pendaftaran:{" "}
                        {new Date(job.application_end).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        {job.recruiter?.company_logo && (
                          <Image
                            src={job.recruiter.company_logo}
                            alt={job.recruiter.company_name}
                            width={100}
                            height={100}
                          />
                        )}
                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-neutral-800 dark:text-white">
                            {job.recruiter?.company_name}
                          </p>
                          <div className="flex flex-row gap-2 items-center">
                            <HiOutlineMapPin className="w-5 h-5 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {getProvinceName(job.province_id)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
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
    </section>
  );
};

export default ListPekerjaan;
