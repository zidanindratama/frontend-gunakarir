"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";
import DataTablePekerjaan from "../../pekerjaan/datatable-pekerjaan";

const DasboardDataTablePekerjaan = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Daftar Lowongan Pekerjaan</CardTitle>
        <CardDescription>
          Berikut adalah data lowongan pekerjaan yang telah dibuat oleh Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense>
          <DataTablePekerjaan />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default DasboardDataTablePekerjaan;
