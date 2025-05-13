import Footer from "@/components/main/footer";
import ListMitra from "@/components/main/mitra/list-mitra";
import { Navbar } from "@/components/main/navbar";
import React from "react";

const MitraPage = () => {
  return (
    <>
      <div className="p-6">
        <Navbar />
        <ListMitra />
      </div>
      <Footer />
    </>
  );
};

export default MitraPage;
