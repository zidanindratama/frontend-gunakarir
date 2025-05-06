"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { DataTable } from "@/components/ui/datatable";
import { recruiterColumns } from "./kolom-rekruter";

const DataTableRekruter = () => {
  const { page, limit, search, filters } = useDataTableQueryParams();
  const status = filters.status || "";

  const filterOptions = {
    status: {
      placeholder: "Pilih Status Rekruter",
      options: [
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" },
        { label: "PENDING", value: "PENDING" },
      ],
    },
  };

  const { data, isLoading } = useGetData({
    queryKey: ["recruiters", `${page}-${limit}-${status}-${search}`],
    dataProtected:
      `recruiters?page=${page}&limit=${limit}` +
      (status ? `&status=${status}` : "") +
      (search ? `&search=${search}` : ""),
  });

  const recruiters = data?.data?.recruiters ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <DataTable
      columns={recruiterColumns}
      data={recruiters}
      meta={meta}
      isLoading={isLoading}
      filterOptions={filterOptions}
      searchPlaceholder="Cari rekruter"
    />
  );
};

export default DataTableRekruter;
