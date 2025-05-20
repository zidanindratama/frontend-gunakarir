"use client";

import Footer from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import InterviewQuestions from "@/components/main/profile/interview/interview-questions";
import { useParams } from "next/navigation";
import React from "react";

const InterviewPage = () => {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const applicationId = params.applicationId as string;

  return (
    <>
      <div className="p-6">
        <Navbar />
        <InterviewQuestions
          applicationId={applicationId}
          interviewId={interviewId}
        />
      </div>
      <Footer />
    </>
  );
};

export default InterviewPage;
