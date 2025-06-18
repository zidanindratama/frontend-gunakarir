import React from "react";
import RecruiterStatusCard from "./reecuiter-status-card";
import { JobTypePieChart } from "./job-type-pie-chart";
import DasboardDataTablePekerjaan from "./dashboard-data-table-pekerjaan";
import { SectionCards } from "./section-cards";
import { JobTypeLineChart } from "./job-type-line-chart";

const DashboardRecruiter = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <RecruiterStatusCard />
      <SectionCards />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 items-stretch">
        <div className="md:col-span-2 h-fit">
          <JobTypePieChart />
        </div>
        <div className="md:col-span-3 h-fit">
          <DasboardDataTablePekerjaan />
        </div>
        <div className="md:col-span-5 h-full">
          <JobTypeLineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardRecruiter;
