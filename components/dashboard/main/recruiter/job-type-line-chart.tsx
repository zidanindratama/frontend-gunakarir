"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

// Tipe konfigurasi chart
const chartConfig: ChartConfig = {
  FULL_TIME: { label: "Penuh Waktu", color: "#4f46e5" },
  PART_TIME: { label: "Paruh Waktu", color: "#10b981" },
  INTERNSHIP: { label: "Magang", color: "#f59e0b" },
  CONTRACT: { label: "Kontrak", color: "#ec4899" },
  FREELANCE: { label: "Lepas", color: "#3b82f6" },
};

// Interface untuk tipe data yang diterima dari backend
interface JobTypeLineDataItem {
  type: keyof typeof chartConfig;
  count: number;
}

export function JobTypeLineChart() {
  const { data: response } = useGetData({
    queryKey: ["job-type-line"],
    dataProtected: "dashboard/job-type-ine-stats",
  });

  const rawData: JobTypeLineDataItem[] = Array.isArray(response?.data?.data)
    ? response.data.data
    : [];

  const chartData: JobTypeLineDataItem[] = rawData.map(
    (item: JobTypeLineDataItem) => ({
      type: item.type,
      count: item.count,
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Total Lowongan per Tipe</CardTitle>
        <CardDescription>
          Menampilkan total lowongan aktif berdasarkan jenis pekerjaan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={chartData} margin={{ top: 10, bottom: 10 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="type"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              padding={{ left: 5, right: 5 }}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />
            <YAxis allowDecimals={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={false} />}
            />
            <Line
              dataKey="count"
              type="monotone"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ fill: "#4f46e5" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Data diperbarui secara real-time dari server
        </div>
      </CardFooter>
    </Card>
  );
}
