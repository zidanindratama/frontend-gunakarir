"use client";

import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "@/components/ui/datatable";
import { TApplication } from "@/types/application-type";
import { kandidatLolosColumns } from "./kandidat-lolos-columns";

interface Props {
  pekerjaanId: string;
}

const KandidatLolosTable = ({ pekerjaanId }: Props) => {
  const { page, limit, search } = useDataTableQueryParams();

  const { data, isLoading } = useGetData({
    queryKey: [
      "applications-accepted",
      `${page}-${limit}-${search}-${pekerjaanId}`,
    ],
    dataProtected:
      `applications/stages/${pekerjaanId}?page=${page}&limit=${limit}&status=ACCEPTED` +
      (search ? `&search=${search}` : ""),
  });

  const applications: TApplication[] = data?.data?.data ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <DataTable
      columns={kandidatLolosColumns}
      data={applications}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari Nama Mahasiswa"
    />
  );
};

export default KandidatLolosTable;
