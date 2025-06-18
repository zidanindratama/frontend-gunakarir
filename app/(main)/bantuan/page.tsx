import { FAQ } from "@/components/main/bantuan/faq";
import FormBantuan from "@/components/main/bantuan/form-bantuan";
import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import React from "react";

const BantuanPage = () => {
  return (
    <>
      <div className="p-6">
        <Navbar />
        <div className="my-10 md:my-20">
          <FAQ />
          <FormBantuan />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BantuanPage;
