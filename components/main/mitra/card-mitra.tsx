"use client";

import { TRecruiter } from "@/types/recruiter-type";
import Image from "next/image";
import { useWilayah } from "@/hooks/useWilayah";
import { HiOutlineMapPin } from "react-icons/hi2";
import Link from "next/link";

type Props = {
  recruiter: TRecruiter;
};

const CardMitra = ({ recruiter }: Props) => {
  const wilayah = useWilayah({});
  const provinceName =
    wilayah.provinceOptions.find((prov) => prov.id === recruiter.province_id)
      ?.name ?? "-";

  return (
    <Link href={`/mitra/${recruiter.id}`}>
      <div className="border rounded-lg p-6 space-y-4 bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow-sm h-full">
        <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
          <Image
            src={recruiter.company_logo}
            alt={recruiter.company_name}
            width={100}
            height={100}
            className="object-contain rounded"
          />
          <h3 className="font-semibold text-lg text-black dark:text-white">
            {recruiter.company_name}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HiOutlineMapPin className="w-4 h-4" />
            <span>{provinceName}</span>
          </div>
          <p className="text-muted-foreground line-clamp-2">
            {recruiter.company_description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardMitra;
