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
import { useWilayah } from "@/hooks/useWilayah";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ListEducation from "@/components/main/profile/ubah/list-education";
import ListOrganizationalExperience from "@/components/main/profile/ubah/list-organizational-experience";
import ListWorkExperience from "@/components/main/profile/ubah/list-work-experience";
import { TStudent } from "@/types/student-type";
import Link from "next/link";

type Props = {
  mahasiswaId: string;
};

const MahasiswaDetail = ({ mahasiswaId }: Props) => {
  const { data: mahasiswaData } = useGetData({
    queryKey: ["mahasiswa-detail"],
    dataProtected: `students/${mahasiswaId}`,
  });
  const student: TStudent = mahasiswaData?.data;

  const { provinceOptions, cityOptions, districtOptions, villageOptions } =
    useWilayah({
      provinceId: student?.province_id,
      cityId: student?.city_id,
      districtId: student?.district_id,
    });

  const provinceName =
    provinceOptions.find((prov) => prov.id === student?.province_id)?.name ||
    "-";
  const cityName =
    cityOptions.find((city) => city.id === student?.city_id)?.name || "-";
  const districtName =
    districtOptions.find((dist) => dist.id === student?.district_id)?.name ||
    "-";
  const villageName =
    villageOptions.find((vill) => vill.id === student?.village_id)?.name || "-";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Informasi Mahasiswa</CardTitle>
        <CardDescription>Detail terkait mahasiswa</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 aspect-square">
            <AvatarImage
              src={student?.user.image_url}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="text-xl">GN</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
              {student?.user.username}
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              {student?.user.email}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 text-sm border border-border divide-x divide-y rounded overflow-hidden">
          <DataRow label="Nama Lengkap">{student?.fullname}</DataRow>
          <DataRow label="NPM">{student?.NPM}</DataRow>
          <DataRow label="Telepon">{student?.phone_number}</DataRow>
          <DataRow label="Status">
            <Badge
              className={
                student?.status === "APPROVED"
                  ? "text-green-500 border-green-500"
                  : student?.status === "REJECTED"
                  ? "text-red-500 border-red-500"
                  : "text-yellow-500 border-yellow-500"
              }
              variant="outline"
            >
              {student?.status}
            </Badge>
          </DataRow>
          <DataRow label="Provinsi">{provinceName}</DataRow>
          <DataRow label="Kota/Kabupaten">{cityName}</DataRow>
          <DataRow label="Kecamatan">{districtName}</DataRow>
          <DataRow label="Kelurahan">{villageName}</DataRow>
          <DataRow label="Instagram">{student?.instagram_url || "-"}</DataRow>
          <DataRow label="LinkedIn">{student?.linkedin_url || "-"}</DataRow>
          <DataRow label="CV" className="md:col-span-2">
            {student?.CV_file ? (
              <Link
                href={student.CV_file}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat CV
              </Link>
            ) : (
              <span className="text-muted-foreground">Belum ada file</span>
            )}
          </DataRow>
          <DataRow label="KTM" className="md:col-span-2">
            {student?.KTM_file ? (
              <Link
                href={student.KTM_file}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat KTM
              </Link>
            ) : (
              <span className="text-muted-foreground">Belum ada file</span>
            )}
          </DataRow>
          <DataRow label="Alamat" className="md:col-span-2">
            {student?.address}
          </DataRow>
          <DataRow label="Bio" className="md:col-span-2">
            {student?.bio}
          </DataRow>
        </div>
        {student?.educations && student.educations.length > 0 && (
          <ListEducation
            data={
              student?.educations.map((edu) => ({
                ...edu,
                end_year: edu.end_year ?? undefined,
              })) ?? []
            }
            withAction={false}
          />
        )}
        {student?.workExperiences && student.workExperiences.length > 0 && (
          <ListWorkExperience
            data={student.workExperiences.map((exp) => ({
              ...exp,
              start_date: new Date(exp.start_date),
              end_date: exp.end_date ? new Date(exp.end_date) : undefined,
            }))}
            withAction={false}
          />
        )}
        {student?.organizationalExperiences &&
          student.organizationalExperiences.length > 0 && (
            <ListOrganizationalExperience
              data={student.organizationalExperiences.map((exp) => ({
                ...exp,
                start_date: new Date(exp.start_date),
                end_date: exp.end_date ? new Date(exp.end_date) : undefined,
              }))}
              withAction={false}
            />
          )}
      </CardContent>
    </Card>
  );
};

export default MahasiswaDetail;
