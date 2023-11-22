import React from "react";

type Props = {};

export default function BusinessInformation({}: Props) {
  return (
    <div>
      <div className="flex flex-col items-start justify-start gap-6 ">
        <div className="h-px border border-zinc-400"></div>
        <div className="flex flex-col items-start justify-start gap-8 ">
          <div className="inline-flex items-start justify-start gap-6 ">
            <div className="flex items-start justify-start gap-24">
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Business Name
                </div>
                <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                  Oluwatobi groups LTM
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Support
                </div>
                <div className="w-20 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  Nill
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Business Mobile Number
                </div>
                <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                  (+234) 802 345 0003
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-start h-20 gap-6 ">
            <div className="flex items-start justify-start h-20 gap-24 ">
              <div className="flex items-start justify-end gap-4">
                <div className="self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                    Business description
                  </div>
                  <div className=" text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                    For example: Goodness ochonogor Oil &gas sells different
                    types of shoes, on Instagram and our website.
                  </div>
                </div>
                <div className="w-72 self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                    Business Email
                  </div>
                  <div className="w-72 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                    oluwatobigroups23@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-start gap-6 ">
            <div className="flex items-start justify-start gap-24">
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  State
                </div>
                <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                  Abuja
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  City
                </div>
                <div className="w-20 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  Wuse
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start self-stretch justify-start gap-24">
            <div className="inline-flex flex-col items-start justify-start gap-2">
              <div className="text-slate-500 text-sm font-normal font-['Averta']">
                Website URL
              </div>
              <div className="text-gray-700 text-base font-semibold font-['Averta'] leading-snug">
                https://www.xyzfinancebank.com
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch justify-start h-32 gap-2">
            <div className="w-20 h-6 text-slate-500 text-sm font-normal font-['Averta']">
              Uploads
            </div>
            <div className="inline-flex items-start justify-start h-36 gap-36">
              <div className="inline-flex flex-col items-start justify-start gap-2">
                <div className="inline-flex items-center justify-center gap-2 w-60">
                  <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex">
                    <div className="relative flex flex-col items-start justify-start w-5 h-5" />
                  </div>
                  <div className="w-52 text-gray-700 text-base font-semibold font-['Averta'] leading-none">
                    Business logo . png
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        I
      </div>
    </div>
  );
}
