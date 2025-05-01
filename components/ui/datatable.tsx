"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading?: boolean;
  refetch?: () => void;
  page: number;
  onPageChange: (page: number) => void;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  onFilterChange?: (key: string, value: string) => void;
  onResetFilters?: () => void;
  filterValues?: Record<string, string>;
  filterOptions?: Record<string, { label: string; value: string }[]>;
  searchPlaceholder?: string;
  resetFilters?: () => void;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  page,
  onPageChange,
  onSearchChange,
  searchValue,
  onFilterChange,
  resetFilters,
  filterValues = {},
  filterOptions,
  searchPlaceholder = "Cari...",
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: meta.totalPages,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        {onSearchChange && (
          <Input
            placeholder={searchPlaceholder}
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        )}

        {onFilterChange &&
          filterOptions &&
          Object.entries(filterOptions).map(([key, options]) => (
            <Select
              key={key}
              value={filterValues?.[key] || ""}
              onValueChange={(val) => onFilterChange(key, val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Filter ${key}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

        {resetFilters && (
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full md:w-fit"
          >
            Reset
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-row justify-between items-center mt-5">
        <h1 className="text-sm">
          Halaman {page} dari {meta.totalPages}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === meta.totalPages}
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
