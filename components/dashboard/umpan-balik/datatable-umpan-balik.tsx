"use client";

import { useGetData } from "@/hooks/use-get-data";
import { useDataTableQueryParams } from "@/hooks/use-data-table-query-params";
import { DataTable } from "@/components/ui/datatable";
import { umpanBalikColumns } from "./kolom-umpan-balik";
import { TFeedback } from "@/types/feedback-type";

const DataTableUmpanBalik = () => {
  const { page, limit, search, filters } = useDataTableQueryParams();
  const rating = filters.rating || "";

  const filterOptions = {
    rating: {
      placeholder: "Pilih Rating",
      options: [
        { label: "5 Bintang", value: "5" },
        { label: "4 Bintang", value: "4" },
        { label: "3 Bintang", value: "3" },
        { label: "2 Bintang", value: "2" },
        { label: "1 Bintang", value: "1" },
      ],
    },
  };

  const { data, isLoading } = useGetData({
    queryKey: ["feedbacks", `${page}-${limit}-${search}-${rating}`],
    dataProtected:
      `feedbacks?page=${page}&limit=${limit}` +
      (search ? `&search=${search}` : "") +
      (rating ? `&rating=${rating}` : ""),
  });

  const feedbacks: TFeedback[] = data?.data?.feedbacks ?? [];
  const meta = data?.data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <DataTable
      columns={umpanBalikColumns}
      data={feedbacks}
      meta={meta}
      isLoading={isLoading}
      searchPlaceholder="Cari pesan atau pengguna"
      filterOptions={filterOptions}
    />
  );
};

export default DataTableUmpanBalik;
