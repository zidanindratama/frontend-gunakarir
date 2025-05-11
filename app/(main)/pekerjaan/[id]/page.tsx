"use client";

import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import DetailPekerjaan from "@/components/main/pekerjaan/detail-pekerjaan";
import { useParams } from "next/navigation";
import React from "react";

const PekerjaanDetailPage = () => {
  const params = useParams();
  const jobId = params.id as string;

  return (
    <>
      <div className="p-6">
        <Navbar />
        <DetailPekerjaan jobId={jobId} />
      </div>
      <Footer />
    </>
  );
};

export default PekerjaanDetailPage;
