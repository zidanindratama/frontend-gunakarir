"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { DataTable } from "@/components/ui/datatable";
import { pekerjaanColumns } from "./kolom-pekerjaan";
import { useWilayah } from "@/hooks/useWilayah";
import { TUser } from "@/types/user-type";

const DataTablePekerjaan = () => {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });
  const user: TUser = userData?.data;
  const recruiterId = user?.recruiter?.id ?? "";

  const { page, limit, search, filters } = useDataTableQueryParams();
  const status = filters.status || "";
  const provinceId = filters.province_id || "";

  const wilayah = useWilayah({});

  const { data, isLoading } = useGetData({
    queryKey: [
      "jobs",
      `${page}-${limit}-${search}-${status}-${provinceId}-${recruiterId}`,
    ],
    dataProtected:
      `jobs?page=${page}&limit=${limit}` +
      (search ? `&search=${search}` : "") +
      (status ? `&status=${status}` : "") +
      (provinceId ? `&province_id=${provinceId}` : "") +
      (recruiterId ? `&recruiterId=${recruiterId}` : ""),
  });

  const jobs = data?.data?.jobs ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <DataTable
      columns={pekerjaanColumns}
      data={jobs}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari lowongan pekerjaan"
      filterOptions={{
        status: [
          { label: "ACTIVE", value: "ACTIVE" },
          { label: "INACTIVE", value: "INACTIVE" },
          { label: "CLOSED", value: "CLOSED" },
        ],
        province_id: wilayah.provinceOptions.map((prov) => ({
          label: prov.name,
          value: prov.id,
        })),
      }}
    />
  );
};

export default DataTablePekerjaan;
