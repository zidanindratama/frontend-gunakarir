"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetData } from "@/hooks/use-get-data";
import DataRow from "@/components/ui/data-row";
import { Badge } from "@/components/ui/badge";
import { useWilayah } from "@/hooks/useWilayah";
import { TJob } from "@/types/user-type";
import Image from "next/image";

type Props = {
  pekrjaanId: string;
};

const DetailPekerjaan = ({ pekrjaanId }: Props) => {
  const { data: jobData } = useGetData({
    queryKey: ["job-detail"],
    dataProtected: `jobs/${pekrjaanId}`,
  });
  const job: TJob = jobData?.data;

  const { provinceOptions, cityOptions } = useWilayah({
    provinceId: job?.province_id,
    cityId: job?.city_id,
  });

  const provinceName =
    provinceOptions.find((prov) => prov.id === job?.province_id)?.name || "-";
  const cityName =
    cityOptions.find((city) => city.id === job?.city_id)?.name || "-";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Detail Pekerjaan</CardTitle>
        <CardDescription>Informasi lengkap lowongan pekerjaan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {job?.recruiter?.company_logo && (
            <Image
              src={job.recruiter.company_logo}
              alt={job.recruiter.company_name || "Logo Perusahaan"}
              width={128}
              height={128}
              className=""
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              {job?.recruiter?.company_name}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 text-sm border border-border divide-x divide-y rounded overflow-hidden">
          <DataRow label="Judul Pekerjaan">{job?.title}</DataRow>
          <DataRow label="Gaji">
            Rp {parseInt(job?.salary || "0").toLocaleString()}
          </DataRow>
          <DataRow label="Kuota">{job?.quota}</DataRow>
          <DataRow label="Status">
            <Badge
              className={
                job?.status === "ACTIVE"
                  ? "text-green-500 border-green-500"
                  : job?.status === "INACTIVE"
                  ? "text-yellow-500 border-yellow-500"
                  : "text-red-500 border-red-500"
              }
              variant="outline"
            >
              {job?.status}
            </Badge>
          </DataRow>
          <DataRow label="Provinsi">{provinceName}</DataRow>
          <DataRow label="Kota/Kabupaten">{cityName}</DataRow>
          <DataRow label="Tanggal Mulai">
            {new Date(job?.application_start).toLocaleDateString("id-ID")}
          </DataRow>
          <DataRow label="Tanggal Berakhir">
            {new Date(job?.application_end).toLocaleDateString("id-ID")}
          </DataRow>
          <DataRow label="Deskripsi Singkat" className="md:col-span-2">
            {job?.short_description}
          </DataRow>
          <DataRow label="Deskripsi Lengkap" className="md:col-span-2">
            {job?.full_description}
          </DataRow>
          <DataRow label="Jurusan yang Dibutuhkan" className="md:col-span-2">
            {job?.jobMajors && job.jobMajors.length > 0 ? (
              <ul className="list-disc ml-5">
                {job.jobMajors.map((jm) => (
                  <li key={jm.major.id}>{jm.major.name}</li>
                ))}
              </ul>
            ) : (
              <span>Semua Jurusan</span>
            )}
          </DataRow>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailPekerjaan;
