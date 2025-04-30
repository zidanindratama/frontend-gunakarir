import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import FormUbahProfile from "@/components/main/profile/ubah/form-ubah-profile";
import React from "react";

const ChangeProfilePage = () => {
  return (
    <>
      <div className="p-6">
        <Navbar />
        <FormUbahProfile />
      </div>
      <Footer />
    </>
  );
};

export default ChangeProfilePage;
