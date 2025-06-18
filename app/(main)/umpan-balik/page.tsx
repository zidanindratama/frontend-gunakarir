import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import ListUmpanBalik from "@/components/main/umpan-balik/list-umpan-balik";
import React from "react";

const UmpanBalikPage = () => {
  return (
    <>
      <div className="p-6">
        <Navbar />
        <ListUmpanBalik />
      </div>
      <Footer />
    </>
  );
};

export default UmpanBalikPage;
