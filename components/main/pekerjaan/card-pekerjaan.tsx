"use client";

import { getJobTypeLabel } from "@/helpers/get-job-type-label";
import { getTruncatedText } from "@/helpers/get-truncated-text";
import { TJob } from "@/types/job-type";
import { useWilayah } from "@/hooks/useWilayah";
import { HiOutlineMapPin } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

type Props = {
  job: TJob;
};

const CardPekerjaan = ({ job }: Props) => {
  const wilayah = useWilayah({});
  const getProvinceName = (id: string) => {
    return wilayah.provinceOptions.find((prov) => prov.id === id)?.name ?? "-";
  };

  return (
    <Link href={`/pekerjaan/${job.id}`}>
      <div className="border rounded-lg p-4 space-y-2 bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200">
        <div className="flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-center">
          <span className="text-sm font-medium text-muted-foreground order-1 sm:order-none">
            {job.salary
              ? `Gaji: ${Number(job.salary).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}`
              : "-"}
          </span>
          <h3
            className="font-semibold text-lg text-black dark:text-white order-2 sm:order-none"
            title={job.title}
          >
            {getTruncatedText(job.title)}
          </h3>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-2 py-1 rounded font-semibold">
            {getJobTypeLabel(job.type)}
          </span>
        </div>

        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Batas Pendaftaran:{" "}
          {new Date(job.application_end).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="flex items-center gap-5">
          {job.recruiter?.company_logo && (
            <Image
              src={job.recruiter.company_logo}
              alt={job.recruiter.company_name}
              width={100}
              height={100}
              className="object-contain"
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
      </div>
    </Link>
  );
};

export default CardPekerjaan;
