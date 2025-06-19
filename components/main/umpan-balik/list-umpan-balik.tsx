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
import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import NotFoundContent from "../not-found-content";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { TFeedback } from "@/types/feedback-type";
import TambahUmpanBalik from "./tambah-umpan-balik";
import Image from "next/image";
import UbahUmpanBalik from "./ubah-umpan-balik";

const ListUmpanBalik = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = new URLSearchParams();
  queryParams.set("search", searchQuery);
  queryParams.set("page", currentPage.toString());
  queryParams.set("limit", "10");

  if (selectedRating !== "all") {
    queryParams.set("rating", selectedRating);
  }

  const { data: myFeedbackData } = useGetData({
    queryKey: ["my-feedback"],
    dataProtected: "feedbacks/me",
  });

  const { data, isLoading } = useGetData({
    queryKey: ["feedbacks", queryParams.toString()],
    dataProtected: `feedbacks?${queryParams.toString()}`,
  });

  const myFeedback: TFeedback = myFeedbackData?.data;
  const feedbacks: TFeedback[] = data?.data.feedbacks || [];
  const totalPages = data?.data.meta?.totalPages || 1;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRating("all");
    setCurrentPage(1);
  };

  return (
    <section className="w-full container m-auto py-12 px-4">
      <div className="flex justify-end items-center mb-6">
        {myFeedback ? (
          <UbahUmpanBalik feedback={myFeedback} />
        ) : (
          <TambahUmpanBalik />
        )}
      </div>
      <h1 className="text-center text-xl md:text-3xl font-bold mb-6">
        Temukan Umpan Balik
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <Input
          placeholder="Cari pesan atau pengguna..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-xl py-6"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-64">
          <h3 className="font-semibold mb-4">Filter</h3>
          <Select
            value={selectedRating}
            onValueChange={(val) => {
              setSelectedRating(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="5">5 Bintang</SelectItem>
              <SelectItem value="4">4 Bintang</SelectItem>
              <SelectItem value="3">3 Bintang</SelectItem>
              <SelectItem value="2">2 Bintang</SelectItem>
              <SelectItem value="1">1 Bintang</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleResetFilters}
          >
            Reset Filter
          </Button>
        </div>
        <div className="flex-1 space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-6 space-y-3 bg-white dark:bg-neutral-900 shadow-sm"
                >
                  <Skeleton className="w-[40%] h-[20px] rounded-full" />
                  <Skeleton className="w-[60%] h-[16px] rounded-full" />
                  <Skeleton className="w-[100%] h-[14px] rounded" />
                </div>
              ))}
            </div>
          ) : feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="border rounded-xl p-6 bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={fb.user?.image_url || "/placeholder.svg"}
                      alt={fb.user?.username}
                      className="w-10 h-10 rounded-full object-cover"
                      width={100}
                      height={100}
                    />
                    <div>
                      <p className="font-semibold text-base">
                        {fb.user?.username}
                      </p>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i <= fb.rating
                                ? "fill-yellow-400 stroke-yellow-400"
                                : "stroke-muted-foreground"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{fb.message}</p>
              </div>
            ))
          ) : (
            <NotFoundContent message="Belum ada umpan balik yang tersedia." />
          )}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              >
                Prev
              </Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListUmpanBalik;
