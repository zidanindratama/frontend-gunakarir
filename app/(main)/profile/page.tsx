import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import MainProfile from "@/components/main/profile/main-profile";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="p-6">
      <Navbar />
      <MainProfile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
