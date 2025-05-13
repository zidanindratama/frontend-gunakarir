"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SelectWilayah } from "@/components/ui/select-wilayah";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useWilayah } from "@/hooks/useWilayah";
import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { TJob } from "@/types/job-type";
import CardPekerjaan from "../pekerjaan/card-pekerjaan";
import NotFoundContent from "../not-found-content";

type Props = {
  recruiterId: string;
};

const ListPekerjaanMitra = ({ recruiterId }: Props) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const wilayah = useWilayah({ provinceId: selectedProvinceId });

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: "10",
    search: searchQuery,
    province_id: selectedProvinceId,
    recruiter_id: recruiterId,
    type: selectedJobType,
    status: "true",
  });

  const { data: recruiterData } = useGetData({
    queryKey: ["recruiter", recruiterId],
    dataProtected: `recruiters/${recruiterId}`,
  });

  const { data: jobsData, isLoading } = useGetData({
    queryKey: ["jobs-mitra", queryParams.toString()],
    dataProtected: `jobs?${queryParams.toString()}`,
  });

  const jobs: TJob[] = jobsData?.data.jobs || [];
  const totalPages = jobsData?.data.meta?.totalPages || 1;

  const handleResetFilters = () => {
    setSelectedProvinceId("");
    setSelectedJobType("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-24 md:px-10">
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Lowongan Pekerjaan oleh{" "}
          {recruiterData?.data?.company_name || "Perusahaan Ini"}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Cari Berdasarkan Lowongan"
            className="w-full md:max-w-xl py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              <label className="text-sm font-medium">Tipe Pekerjaan</label>
              <Select
                value={selectedJobType}
                onValueChange={setSelectedJobType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Tipe" />
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
            <div className="grid md:grid-cols-2 gap-4">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
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
              ) : jobs.length > 0 ? (
                jobs.map((job) => <CardPekerjaan key={job.id} job={job} />)
              ) : (
                <div className="col-span-2">
                  <NotFoundContent message="Lowongan pekerjaan tidak ditemukan." />
                </div>
              )}
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

export default ListPekerjaanMitra;
