import { LuChevronLeft } from "react-icons/lu";

import { ScrollArea } from "components/ui/scroll-area";
import { Typography } from "components/ui/Typography";
import BusinessLocationForm from "./business-location-form";

export default function SelectBusinessProfilePage() {
  return (
    <ScrollArea className="relative w-full h-full lg:w-3/5">
      <div className="flex flex-col px-10 py-10 bg-white">
        <div className="mb-7">
          <span className="flex cursor-pointer flex-row items-center gap-[7px] text-[14px] font-[400] leading-[145%] text-black">
            <LuChevronLeft className="text-[24px] text-black" />
            Back
          </span>
        </div>

        <div className="flex flex-col items-center mb-20 space-y-4">
          <Typography
            level="h3"
            className="font-CenturyGothic text-[32px] font-bold text-primary-70"
          >
            Please provide your location
          </Typography>

          <Typography className="text-sm font-normal text-gray-40" level="p">
            You can add another account letter own too.
          </Typography>
        </div>

        <BusinessLocationForm />
      </div>
    </ScrollArea>
  );
}
