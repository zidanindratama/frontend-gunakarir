import { TApplication } from "@/types/application-type";
import PesanStatusSubmitted from "./pesan-status-submitted";
import PesanStatusInterview from "./pesan-status-interview";
import PesanStatusAccepted from "./pesan-status-accepted";
import React from "react";
import PesanStatusRejected from "./pesan-status-rejected";
import PesanStatusUnderReview from "./pesan-status-under-review";

type Props = {
  application: TApplication;
  onCloseDrawer: () => void;
};

const PesanStatus = ({ application, onCloseDrawer }: Props) => {
  switch (application.status) {
    case "SUBMITTED":
      return <PesanStatusSubmitted application={application} />;
    case "PENDING":
      return <PesanStatusUnderReview application={application} />;
    case "INTERVIEW_INVITED":
    case "CONFIRMED_INTERVIEW":
    case "DECLINED_INTERVIEW":
      return (
        <PesanStatusInterview
          application={application}
          onCloseDrawer={onCloseDrawer}
        />
      );
    case "ACCEPTED":
      return <PesanStatusAccepted application={application} />;
    case "REJECTED":
      return <PesanStatusRejected application={application} />;
    default:
      return null;
  }
};

export default PesanStatus;
