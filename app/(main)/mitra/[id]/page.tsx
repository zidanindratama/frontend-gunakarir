"use client";

import Footer from "@/components/main/footer";
import ListPekerjaanMitra from "@/components/main/mitra/list-pekerjaan-mitra";
import { Navbar } from "@/components/main/navbar";
import { useParams } from "next/navigation";
import React from "react";

const PekerjaanMitraPage = () => {
  const params = useParams();
  const recruiterId = params.id as string;

  return (
    <>
      <div className="p-6">
        <Navbar />
        <ListPekerjaanMitra recruiterId={recruiterId} />
      </div>
      <Footer />
    </>
  );
};

export default PekerjaanMitraPage;
