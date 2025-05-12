"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobTypeLabel } from "@/helpers/get-job-type-label";
import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { useWilayah } from "@/hooks/useWilayah";
import { TJob } from "@/types/job-type";
import { TUser } from "@/types/user-type";
import Image from "next/image";
import React from "react";

type Props = {
  jobId: string;
};

const DetailPekerjaan = ({ jobId }: Props) => {
  const { data: jobData, isLoading } = useGetData({
    queryKey: ["job", jobId],
    dataProtected: `jobs/${jobId}`,
  });

  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const user: TUser = userData?.data;
  const job: TJob = jobData?.data;
  const isDisabled = !user || user.role !== "STUDENT";

  const { mutate: applyJob } = usePostData({
    queryKey: "applications",
    dataProtected: `applications/${user?.student?.id}`,
    successMessage:
      "Lamaran berhasil dikirim! Silakan cek status lamaranmu di halaman Profil.",
    backUrl: "/profile",
  });

  const wilayah = useWilayah({});
  const getProvinceName = (id: string) => {
    return wilayah.provinceOptions.find((prov) => prov.id === id)?.name ?? "-";
  };

  const onSubmit = () => {
    applyJob({
      job_id: jobId,
    });
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-4 flex flex-col gap-10">
            <div className="flex items-center gap-5">
              {isLoading ? (
                <Skeleton className="h-[100px] w-[100px] rounded-md" />
              ) : job?.recruiter?.company_logo ? (
                <Image
                  src={job.recruiter.company_logo}
                  alt={job.recruiter.company_name}
                  width={100}
                  height={100}
                />
              ) : null}

              <div className="flex flex-col gap-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-5 w-32" />
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-lg md:text-2xl">
                      {job?.title}
                    </h1>
                    <h3 className="md:text-lg">
                      {job?.recruiter?.company_name}
                    </h3>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Deskripsi Singkat:</h1>
                {isLoading ? (
                  <Skeleton className="h-24 w-full" />
                ) : (
                  <p className="text-justify">{job?.short_description}</p>
                )}
              </div>

              {isLoading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <div
                  className="rich-text-content prose text-justify"
                  dangerouslySetInnerHTML={{ __html: job?.full_description }}
                />
              )}
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col md:sticky md:top-32 self-start">
            {isLoading ? (
              <Skeleton className="h-12 w-full rounded-md" />
            ) : (
              <Button
                className="bg-blue-500 py-6"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                Melamar
              </Button>
            )}

            <div className="grid grid-cols-2 md:grid-cols-1 gap-6 mt-10">
              {/* Kategori */}
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Kategori Lowongan:</h1>
                {isLoading ? (
                  <Skeleton className="h-6 w-28 rounded" />
                ) : (
                  <h4 className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold w-fit">
                    {getJobTypeLabel(job?.type)}
                  </h4>
                )}
              </div>

              {/* Lokasi */}
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Lokasi:</h1>
                {isLoading ? (
                  <Skeleton className="h-6 w-28 rounded" />
                ) : (
                  <h4 className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold w-fit">
                    {getProvinceName(job?.province_id)}
                  </h4>
                )}
              </div>

              {/* Gaji */}
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Gaji:</h1>
                {isLoading ? (
                  <Skeleton className="h-6 w-36 rounded" />
                ) : (
                  <h4 className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold w-fit">
                    {job?.salary
                      ? `${Number(job?.salary).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}`
                      : "-"}
                  </h4>
                )}
              </div>

              {/* Kuota */}
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Kuota:</h1>
                {isLoading ? (
                  <Skeleton className="h-6 w-24 rounded" />
                ) : (
                  <h4 className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold w-fit">
                    {job?.quota ?? "-"} orang
                  </h4>
                )}
              </div>

              {/* Jumlah Pelamar */}
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Jumlah Pelamar:</h1>
                {isLoading ? (
                  <Skeleton className="h-6 w-24 rounded" />
                ) : (
                  <h4 className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold w-fit">
                    {job?.applications?.length ?? 0} orang
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPekerjaan;
