"use client";

import { useGetData } from "@/hooks/use-get-data";
import { TJob } from "@/types/job-type";
import CardPekerjaan from "./card-pekerjaan";
import { Skeleton } from "@/components/ui/skeleton";
import NotFoundContent from "../not-found-content";

type Props = {
  majorId: string;
};

const RekomendasiPekerjaan = ({ majorId }: Props) => {
  const { data, isLoading } = useGetData({
    queryKey: ["recommended-jobs", majorId],
    dataProtected: `jobs?majorId=${majorId}&status=true&limit=4&page=1`,
  });

  const jobs: TJob[] = data?.data?.jobs || [];

  return (
    <section className="w-full bg-white dark:bg-neutral-950 py-20">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Rekomendasi Lowongan untuk Anda
        </h2>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
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
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <CardPekerjaan key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <NotFoundContent message="Belum ada lowongan yang cocok untuk jurusan Anda." />
        )}
      </div>
    </section>
  );
};

export default RekomendasiPekerjaan;
