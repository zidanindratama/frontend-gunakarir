"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CvScreeningTable from "./cv-screening/cv-screening-table";
import InterviewHrTable from "./interview-hr/interview-hr-table";
import InterviewManagementTable from "./interview-management/interview-management-table";
import KandidatLolosTable from "./lolos/kandidat-lolos-table";

type Props = {
  pekerjaanId: string;
};

const TahapanRekrutmen = ({ pekerjaanId }: Props) => {
  return (
    <Tabs defaultValue="CV_SCREENING">
      <ScrollArea className="w-full">
        <TabsList className="w-max">
          <TabsTrigger value="CV_SCREENING">CV Screening</TabsTrigger>
          <TabsTrigger value="HR_INTERVIEW">Interview HR</TabsTrigger>
          <TabsTrigger value="MANAGEMENT_INTERVIEW">
            Interview Manajemen
          </TabsTrigger>
          <TabsTrigger value="ACCEPTED">Kandidat Lolos</TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mt-5">
        <TabsContent value="CV_SCREENING">
          <CvScreeningTable pekerjaanId={pekerjaanId} />
        </TabsContent>
        <TabsContent value="HR_INTERVIEW">
          <InterviewHrTable pekerjaanId={pekerjaanId} />
        </TabsContent>
        <TabsContent value="MANAGEMENT_INTERVIEW">
          <InterviewManagementTable pekerjaanId={pekerjaanId} />
        </TabsContent>
        <TabsContent value="ACCEPTED">
          <KandidatLolosTable pekerjaanId={pekerjaanId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TahapanRekrutmen;
