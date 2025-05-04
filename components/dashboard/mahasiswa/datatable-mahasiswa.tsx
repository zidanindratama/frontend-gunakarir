"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { DataTable } from "@/components/ui/datatable";
import { mahasiswaColumns } from "./kolom-mahasiswa";

const DataTableMahasiswa = () => {
  const { page, limit, search } = useDataTableQueryParams();

  const { data, isLoading } = useGetData({
    queryKey: ["students", `${page}-${limit}-${search}`],
    dataProtected:
      `students?page=${page}&limit=${limit}` +
      (search ? `&search=${search}` : ""),
  });

  const students = data?.data?.students ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <DataTable
      columns={mahasiswaColumns}
      data={students}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari mahasiswa"
    />
  );
};

export default DataTableMahasiswa;
