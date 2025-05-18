"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import { TrendingUp } from "lucide-react";

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

// Chart Data: Jumlah lowongan per jenis pekerjaan
const chartData = [
  { type: "FULL_TIME", count: 40, fill: "#4f46e5" },
  { type: "PART_TIME", count: 20, fill: "#10b981" },
  { type: "INTERNSHIP", count: 30, fill: "#f59e0b" },
  { type: "CONTRACT", count: 10, fill: "#ec4899" },
  { type: "FREELANCE", count: 15, fill: "#3b82f6" },
  { type: "TEMPORARY", count: 5, fill: "#8b5cf6" },
];

// Chart Config: Label dan warna untuk tooltip
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
  TEMPORARY: {
    label: "Sementara",
    color: "#8b5cf6",
  },
};

export function JobTypePieChart() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Statistik Jenis Lowongan</CardTitle>
        <CardDescription>
          Menampilkan distribusi lowongan kerja berdasarkan tipe pekerjaan
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending naik 8.3% bulan ini <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan data untuk 05/2025
        </div>
      </CardFooter>
    </Card>
  );
}
