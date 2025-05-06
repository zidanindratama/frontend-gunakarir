import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import ListPekerjaan from "@/components/main/pekerjaan/list-pekerjaan";
import React from "react";

const PekerjaanPage = () => {
  return (
    <>
      <div className="p-6">
        <Navbar />
        <ListPekerjaan />
      </div>
      <Footer />
    </>
  );
};

export default PekerjaanPage;
