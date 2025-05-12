"use client";

import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "@/components/ui/datatable";
import { TApplication } from "@/types/application-type";
import { interviewHrColumns } from "./hr-interview-columns";

interface Props {
  pekerjaanId: string;
}

const InterviewHrTable = ({ pekerjaanId }: Props) => {
  const { page, limit, search, filters } = useDataTableQueryParams();
  const stageType = "HR_INTERVIEW";
  const status = filters.status || "";

  const { data, isLoading } = useGetData({
    queryKey: [
      "applications-hr",
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

  const filterOptions = {
    status: {
      placeholder: "Pilih Status Lamaran",
      options: [
        { label: "Terkirim", value: "SUBMITTED" },
        { label: "Menunggu Tinjauan", value: "PENDING" },
        { label: "Diundang Interview", value: "INTERVIEW_INVITED" },
        { label: "Konfirmasi Hadir Interview", value: "CONFIRMED_INTERVIEW" },
        { label: "Menolak Interview", value: "DECLINED_INTERVIEW" },
        { label: "Ditolak", value: "REJECTED" },
      ],
    },
  };

  return (
    <DataTable
      columns={interviewHrColumns}
      data={applications}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari Nama Mahasiswa"
      filterOptions={filterOptions}
    />
  );
};

export default InterviewHrTable;
