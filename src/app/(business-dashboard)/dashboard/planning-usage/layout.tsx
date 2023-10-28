import { Metadata } from "next";
import Image from "next/image";
import { LuChevronLeft } from "react-icons/lu";

import Logo from "assets/img/payaccess-logo.png";
import { Button } from "components/ui/button";
import { Typography } from "components/ui/Typography";

export const metadata: Metadata = {
  title: "Registeration",
  description: "Register",
};

export default function SelectBusinessProfileLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col w-screen h-screen bg-white">
      <div className="w-full max-w-screen-xl px-10 py-10 mx-auto">
        <div className="w-full space-y-10 mb-14">
          <Image className="inline-block" src={Logo} alt={"logo"} />
          <div className="flex flex-row items-center justify-between">
            <span className="flex cursor-pointer flex-row items-center gap-[7px] text-[14px] font-[400] leading-[145%] text-black">
              <LuChevronLeft className="text-[24px] text-black" />
              Back
            </span>

            <Button
              variant="ghost"
              className="inline-block text-base font-bold leading-5 text-primary-70"
            >
              Skip
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12 space-y-2">
          <Typography
            level="h3"
            className="font-CenturyGothic text-[32px] font-bold text-primary-70"
          >
            How are you planning to use Payaccess
          </Typography>

          <Typography className="text-sm font-normal text-primary-90" level="p">
            Please provide the information to access your dashboard.
          </Typography>
        </div>

        {children}
      </div>
    </div>
  );
}
