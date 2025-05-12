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
import { TJob } from "@/types/job-type";
import Image from "next/image";
import TahapanRekrutmen from "./tahapan/tahapan-rekrutmen";

type Props = {
  pekrjaanId: string;
};

const DetailPekerjaan = ({ pekrjaanId }: Props) => {
  const { data: jobData } = useGetData({
    queryKey: ["job-detail"],
    dataProtected: `jobs/${pekrjaanId}`,
  });
  const job: TJob = jobData?.data;

  const typeMap: Record<string, string> = {
    FULL_TIME: "Penuh Waktu",
    PART_TIME: "Paruh Waktu",
    INTERNSHIP: "Magang",
    CONTRACT: "Kontrak",
    FREELANCE: "Freelance",
    TEMPORARY: "Sementara",
  };

  const { provinceOptions, cityOptions } = useWilayah({
    provinceId: job?.province_id,
    cityId: job?.city_id,
  });

  const provinceName =
    provinceOptions.find((prov) => prov.id === job?.province_id)?.name || "-";
  const cityName =
    cityOptions.find((city) => city.id === job?.city_id)?.name || "-";

  return (
    <div className="grid grid-cols-1 gap-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detail Pekerjaan</CardTitle>
          <CardDescription>
            Informasi lengkap lowongan pekerjaan
          </CardDescription>
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
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100">
                {job?.recruiter?.company_name}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm border border-border divide-x divide-y rounded overflow-hidden">
            <DataRow label="Judul Pekerjaan">{job?.title}</DataRow>
            <DataRow label="Gaji">
              {job?.salary
                ? `${Number(job.salary).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}`
                : "-"}
            </DataRow>
            <DataRow label="Kuota">{job?.quota}</DataRow>
            <DataRow label="Status">
              <Badge
                className={
                  job?.status === true
                    ? "text-green-500 border-green-500"
                    : job?.status === false
                    ? "text-yellow-500 border-yellow-500"
                    : "text-red-500 border-red-500"
                }
                variant="outline"
              >
                {job?.status ? "Dibuka" : "Ditutup"}
              </Badge>
            </DataRow>
            <DataRow label="Provinsi">{provinceName}</DataRow>
            <DataRow label="Kota/Kabupaten">{cityName}</DataRow>
            <DataRow label="Tanggal Mulai">
              {new Date(job?.application_start).toLocaleString("id-ID", {
                dateStyle: "full",
              })}
            </DataRow>
            <DataRow label="Tanggal Berakhir">
              {new Date(job?.application_end).toLocaleString("id-ID", {
                dateStyle: "full",
              })}
            </DataRow>
            <DataRow label="Tipe" className="md:col-span-2">
              {typeMap[job?.type ?? ""] ?? job?.type}
            </DataRow>
            <DataRow label="Deskripsi Singkat" className="md:col-span-2">
              {job?.short_description}
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
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelamar</CardTitle>
          <CardDescription>
            Lihat dan kelola semua mahasiswa yang melamar pada lowongan ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TahapanRekrutmen pekerjaanId={pekrjaanId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPekerjaan;
