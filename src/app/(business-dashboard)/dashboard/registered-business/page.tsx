import React from "react";
import { Typography } from "components/ui/Typography";
import StepperForm from "./components/stepper-form";

function page() {
  return (
    <div className="pb-5">
      <div className="mb-10 space-y-2">
        <Typography
          level="h3"
          className="font-CenturyGothic font-bold text-[40] text-gray-80"
        >
          Business profile
        </Typography>

        <div className="mb-10 flex w-full max-w-[650px] flex-col space-y-2">
          <Typography className="font-CenturyGothic font-bold leading-8 text-primary-110">
            Welcome to your dashboard
          </Typography>
          <Typography level="NP">
            Your account is currently in test mode, so there are a few more
            things to do before you can go live and start receiving
            payments.Follow the steps below to get activated.
          </Typography>
        </div>
      </div>
      <div>
        <StepperForm />
      </div>
    </div>
  );
}

export default page;
