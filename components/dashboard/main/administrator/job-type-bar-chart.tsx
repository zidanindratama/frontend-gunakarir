"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useGetData } from "@/hooks/use-get-data";

// Definisi tipe data job type
type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT"
  | "FREELANCE";

// Tipe untuk satu item chart
interface JobTypeChartItem {
  type: JobType;
  count: number;
}

// Konfigurasi label dan warna chart
const chartConfig: ChartConfig = {
  FULL_TIME: { label: "Penuh Waktu", color: "#4f46e5" },
  PART_TIME: { label: "Paruh Waktu", color: "#10b981" },
  INTERNSHIP: { label: "Magang", color: "#f59e0b" },
  CONTRACT: { label: "Kontrak", color: "#ec4899" },
  FREELANCE: { label: "Lepas", color: "#3b82f6" },
};

export function JobTypeBarChart() {
  const { data: response } = useGetData({
    queryKey: ["job-type-bar"],
    dataProtected: "dashboard/job-type-bar-stats",
  });

  const rawData: JobTypeChartItem[] = Array.isArray(response?.data)
    ? response.data
    : [];

  const chartData = rawData.map((item) => ({
    type: item.type,
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Bar Tipe Pekerjaan</CardTitle>
        <CardDescription>
          Jumlah total lowongan aktif berdasarkan jenis pekerjaan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 10, bottom: 10, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="type"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) =>
                chartConfig[value as JobType]?.label || value
              }
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Data diperbarui real-time <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total lowongan berdasarkan tipe pekerjaan
        </div>
      </CardFooter>
    </Card>
  );
}
