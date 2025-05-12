"use client";

import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "@/components/ui/datatable";
import { cvScreeningColumns } from "./cv-screening-columns";
import { TApplication } from "@/types/application-type";

interface Props {
  pekerjaanId: string;
}

const CvScreeningTable = ({ pekerjaanId }: Props) => {
  const { page, limit, search, filters } = useDataTableQueryParams();
  const stageType = "CV_SCREENING";
  const status = filters.status || "";

  const { data, isLoading } = useGetData({
    queryKey: [
      "applications-cv",
      `${page}-${limit}-${search}-${status}-${stageType}-${pekerjaanId}`,
    ],
    dataProtected:
      `applications/stages/${pekerjaanId}?page=${page}&limit=${limit}` +
      (search ? `&search=${search}` : "") +
      (status ? `&status=${status}` : "") +
      (stageType ? `&stage_type=${stageType}` : ""),
  });

  const applications: TApplication[] = data?.data?.data ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  console.log(applications);

  const filterOptions = {
    status: {
      placeholder: "Pilih Status Lamaran",
      options: [
        { label: "Terkirim", value: "SUBMITTED" },
        { label: "Menunggu Tinjauan", value: "PENDING" },
        { label: "Diundang Interview", value: "INTERVIEW_INVITED" },
        { label: "Konfirmasi Hadir Interview", value: "CONFIRMED_INTERVIEW" },
        { label: "Menolak Interview", value: "DECLINED_INTERVIEW" },
        { label: "Diterima", value: "ACCEPTED" },
        { label: "Ditolak", value: "REJECTED" },
      ],
    },
  };

  return (
    <DataTable
      columns={cvScreeningColumns}
      data={applications}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari Nama Mahasiswa"
      filterOptions={filterOptions}
    />
  );
};

export default CvScreeningTable;
