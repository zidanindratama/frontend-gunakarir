"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetData } from "@/hooks/use-get-data";

// Definisi tipe
type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT"
  | "FREELANCE";

interface JobTypeDataItem {
  type: JobType;
  count: number;
}

interface ChartItem extends JobTypeDataItem {
  fill: string;
}

const chartConfig: ChartConfig = {
  count: {
    label: "Jumlah",
  },
  FULL_TIME: {
    label: "Penuh Waktu",
    color: "#4f46e5",
  },
  PART_TIME: {
    label: "Paruh Waktu",
    color: "#10b981",
  },
  INTERNSHIP: {
    label: "Magang",
    color: "#f59e0b",
  },
  CONTRACT: {
    label: "Kontrak",
    color: "#ec4899",
  },
  FREELANCE: {
    label: "Lepas",
    color: "#3b82f6",
  },
};

export function JobTypePieChart() {
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = String(now.getFullYear());

  const [selectedMonth, setSelectedMonth] = React.useState(currentMonth);
  const [selectedYear, setSelectedYear] = React.useState(currentYear);

  const monthYear = `${selectedMonth}/${selectedYear}`;

  const { data } = useGetData({
    queryKey: ["job-type-stats", monthYear],
    dataProtected: `dashboard/job-type-pie-stats?month=${monthYear}`,
  });

  const chartData: ChartItem[] = (data?.data || []).map(
    (item: JobTypeDataItem) => ({
      ...item,
      fill: chartConfig[item.type]?.color ?? "#ccc",
    })
  );

  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-0">
        <CardTitle>Statistik Jenis Lowongan</CardTitle>
        <CardDescription>
          Distribusi lowongan kerja berdasarkan tipe pekerjaan
        </CardDescription>

        <div className="flex items-center justify-between gap-2 mt-4">
          {/* Select Bulan */}
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ].map((label, idx) => {
                const value = String(idx + 1).padStart(2, "0");
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* Select Tahun */}
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 50 }, (_, i) => {
                const year = 2020 + i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {total > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] min-w-[200px] min-h-[200px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Lowongan
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg font-semibold">Tidak ada data</p>
            <p className="text-sm">
              Belum ada lowongan yang tersedia pada bulan ini.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Menampilkan data untuk {monthYear}
        </div>
      </CardFooter>
    </Card>
  );
}
