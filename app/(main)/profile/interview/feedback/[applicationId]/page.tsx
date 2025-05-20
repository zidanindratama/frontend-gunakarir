"use client";

import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import InterviewFeedback from "@/components/main/profile/interview/interview-feedback";
import { useParams } from "next/navigation";
import React from "react";

const InterviewFeedbackPage = () => {
  const params = useParams();
  const applicationId = params.applicationId as string;

  return (
    <>
      <div className="p-6">
        <Navbar />
        <InterviewFeedback applicationId={applicationId} />
      </div>
      <Footer />
    </>
  );
};

export default InterviewFeedbackPage;
