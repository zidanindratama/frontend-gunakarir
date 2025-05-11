import { TApplication } from "@/types/application-type";
import PesanStatusSubmitted from "./pesan-status-submitted";
import PesanStatusInterview from "./pesan-status-interview";
import PesanStatusAccepted from "./pesan-status-accepted";
import PesanStatusRejected from "./pesan-status-rejected";
import PesanStatusUnderReview from "./pesan-status-under-review";
import PesanStatusPassedScreening from "./pesan-status-passed-screening";
import React from "react";

type Props = {
  application: TApplication;
};

const PesanStatus = ({ application }: Props) => {
  switch (application.status) {
    case "SUBMITTED":
      return <PesanStatusSubmitted application={application} />;
    case "UNDER_REVIEW":
      return <PesanStatusUnderReview application={application} />;
    case "PASSED_SCREENING":
      return <PesanStatusPassedScreening application={application} />;
    case "INTERVIEW_INVITED":
    case "CONFIRMED_INTERVIEW":
      return <PesanStatusInterview application={application} />;
    case "ACCEPTED":
      return <PesanStatusAccepted application={application} />;
    case "REJECTED":
    case "FAILED_SCREENING":
      return <PesanStatusRejected application={application} />;
    default:
      return null;
  }
};

export default PesanStatus;
