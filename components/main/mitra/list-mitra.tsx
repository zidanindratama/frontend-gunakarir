"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetData } from "@/hooks/use-get-data";
import CardMitra from "./card-mitra";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { TRecruiter } from "@/types/recruiter-type";

const ListMitra = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: "10",
    search,
    status: "APPROVED",
  });

  const { data, isLoading } = useGetData({
    queryKey: ["recruiters", queryParams.toString()],
    dataProtected: `recruiters?${queryParams.toString()}`,
  });

  const recruiters: TRecruiter[] = data?.data.recruiters || [];
  const totalPages = data?.data.meta?.totalPages || 1;

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:px-10">
        <h1 className="text-center text-xl md:text-3xl font-bold mb-6">
          Daftar Mitra Perusahaan
        </h1>

        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <Input
            type="text"
            placeholder="Cari Berdasarkan Nama Perusahaan"
            className="w-full md:max-w-xl py-6"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-full border rounded-lg p-4 space-y-3 bg-white shadow-sm"
                >
                  <Skeleton className="w-[60%] h-[20px] rounded-full" />
                  <Skeleton className="w-[150px] h-[16px] rounded-full" />
                  <Skeleton className="w-[100px] h-[16px] rounded-full" />
                </div>
              ))
            : recruiters.map((recruiter) => (
                <div className="h-full" key={recruiter.id}>
                  <CardMitra recruiter={recruiter} />
                </div>
              ))}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  size="default"
                  onClick={(e) => {
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
                    onClick={(e) => {
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
                  onClick={(e) => {
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
    </section>
  );
};

export default ListMitra;
