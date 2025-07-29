"use client";

import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import ListPekerjaan from "@/components/main/pekerjaan/list-pekerjaan";
import RekomendasiPekerjaan from "@/components/main/pekerjaan/rekomendasi-pekerjaan";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/helpers/axios-instance";

const PekerjaanPage = () => {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const user: TUser = userData?.data;

  const [majorIds, setMajorIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchMajorIds = async () => {
      if (user?.role !== "STUDENT") return;
      const majorNames = user?.student?.educations?.map((e) => e.major) || [];

      const majorIdPromises = majorNames.map(async (name) => {
        const res = await axiosInstance.get(`/majors?search=${name}`);
        const id = res?.data?.data?.[0]?.id;
        return id;
      });

      const result = await Promise.all(majorIdPromises);
      setMajorIds(result.filter(Boolean));
    };

    fetchMajorIds();
  }, [user]);

  return (
    <>
      <div className="p-6">
        <Navbar />
        <ListPekerjaan />
        {user?.role === "STUDENT" &&
          majorIds.length > 0 &&
          majorIds.map((id) => <RekomendasiPekerjaan key={id} majorId={id} />)}
      </div>
      <Footer />
    </>
  );
};

export default PekerjaanPage;
