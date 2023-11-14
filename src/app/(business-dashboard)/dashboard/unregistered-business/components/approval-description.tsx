import React from "react";

import { Typography } from "components/ui/Typography";
import { Button } from "components/ui/button";
import ReviewDetails from "./review-details";

import InformationFrame from "./information-frame";
import PersonalInformation from "./personal-information";
import BusinessInformation from "./business-information";
import AccountInformation from "./account-information";

type ApprovalDescriptionProps = {
  prevStep?: () => void;
  nextStep?: () => void;
};

export default function ApprovalDescription({}: ApprovalDescriptionProps) {
  return (
    <div>
      <ReviewDetails />

      {/* form display section */}
      <div className="inline-flex flex-col items-start justify-start gap-6 px-10 pt-6 pb-10 bg-white border rounded-lg border-slate-200">
        <div className="flex flex-row items-center justify-between w-full">
          <Typography className="text-2xl font-bold leading-normal grow shrink basis-0 font-CenturyGothic">
            Review Information
          </Typography>

          <Button className="text-center text-white text-sm font-bold font-['Century Gothic'] self-stretch px-8 py-2.5 bg-sky-400 rounded justify-center items-center inline-flex">
            Edit records
          </Button>
        </div>
        <div className="self-stretch h-px border border-gray-200"></div>
        <div className="flex flex-col items-start justify-start space-y-3 ">
          <InformationFrame title="Personal Information">
            <PersonalInformation />
          </InformationFrame>

          <InformationFrame title="Business Information">
            <BusinessInformation />
          </InformationFrame>

          <InformationFrame title="Account Information">
            <AccountInformation />
          </InformationFrame>
        </div>
      </div>
    </div>
  );
}
