import React from "react";
import { SectionCards } from "./section-cards";
import { JobTypeBarChart } from "./job-type-bar-chart";

const DashboardAdministrator = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SectionCards />
      <JobTypeBarChart />
    </div>
  );
};

export default DashboardAdministrator;
