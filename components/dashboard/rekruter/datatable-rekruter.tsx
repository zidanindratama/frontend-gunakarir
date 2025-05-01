"use client";

import { useGetData } from "@/hooks/use-get-data";
import { DataTable } from "@/components/ui/datatable";
import { recruiterColumns } from "@/app/dashboard/rekruter/recruiter-column";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";

const DataTableRekruter = () => {
  const { page, limit, search, filters, updateQuery, resetFilters } =
    useDataTableQueryParams();

  const status = filters.status || "";

  const { data, isLoading, refetch } = useGetData({
    queryKey: ["recruiter", `${page}-${limit}-${status}-${search}`],
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
      refetch={refetch}
      page={page}
      onPageChange={(newPage) => updateQuery("page", String(newPage))}
      onSearchChange={(val) => updateQuery("search", val)}
      onFilterChange={(key, val) => updateQuery(key, val)}
      searchValue={search}
      filterValues={filters}
      filterOptions={{
        status: [
          { label: "APPROVED", value: "APPROVED" },
          { label: "REJECTED", value: "REJECTED" },
          { label: "PENDING", value: "PENDING" },
        ],
      }}
      resetFilters={resetFilters}
      searchPlaceholder="Cari rekruter"
    />
  );
};

export default DataTableRekruter;
