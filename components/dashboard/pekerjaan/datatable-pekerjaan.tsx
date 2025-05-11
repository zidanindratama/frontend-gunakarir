"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { DataTable } from "@/components/ui/datatable";
import { useWilayah } from "@/hooks/useWilayah";
import { TUser } from "@/types/user-type";
import { pekerjaanColumns } from "./kolom-pekerjaan";

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
  const type = filters.type || "";

  const wilayah = useWilayah({});

  const filterOptions = {
    status: {
      placeholder: "Pilih Status Pekerjaan",
      options: [
        { label: "Dibuka", value: "true" },
        { label: "Ditutup", value: "false" },
      ],
    },
    province_id: {
      placeholder: "Pilih Provinsi",
      options: wilayah.provinceOptions.map((prov) => ({
        label: prov.name,
        value: prov.id,
      })),
    },
    type: {
      placeholder: "Pilih Tipe Pekerjaan",
      options: [
        { label: "Penuh Waktu", value: "FULL_TIME" },
        { label: "Paruh Waktu", value: "PART_TIME" },
        { label: "Magang", value: "INTERNSHIP" },
        { label: "Kontrak", value: "CONTRACT" },
        { label: "Freelance", value: "FREELANCE" },
        { label: "Sementara", value: "TEMPORARY" },
      ],
    },
  };

  const { data, isLoading } = useGetData({
    queryKey: [
      "jobs",
      `${page}-${limit}-${search}-${status}-${provinceId}-${type}-${recruiterId}`,
    ],
    dataProtected:
      `jobs?page=${page}&limit=${limit}` +
      (search ? `&search=${search}` : "") +
      (status ? `&status=${status}` : "") +
      (provinceId ? `&province_id=${provinceId}` : "") +
      (type ? `&type=${type}` : "") +
      (recruiterId ? `&recruiter_id=${recruiterId}` : ""),
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
      searchPlaceholder="Cari Lowongan Pekerjaan"
      filterOptions={filterOptions}
    />
  );
};

export default DataTablePekerjaan;
