import React from "react";
import { Typography } from "components/ui/Typography";

type Props = {
  title: string;
  children: React.ReactNode;
};

const InformationFrame = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start w-full ">
      <div className="justify-start items-center gap-3.5 inline-flex  w-full">
        <Typography className=" text-lg font-bold font-['Century Gothic'] leading-relaxed">
          {props.title}
        </Typography>
        <div className="w-28 pl-1.5 py-2.5 justify-start items-center gap-1 flex">
          <div className="relative w-3 h-3">
            <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-sky-400" />
          </div>
          <div className="inline-flex flex-col items-start justify-start w-20 gap-2">
            <div className="self-stretch text-sky-400 text-xs font-normal font-['Averta']">
              Complete
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px border border-zinc-400"></div>
      {props.children}
    </div>
  );
};

export default InformationFrame;
