"use client"

import { Button } from "components/ui/button"
import { getMerchantByCode } from "api/developers-tools"
import { useQuery } from "@tanstack/react-query"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { MdContactSupport } from "react-icons/md"
import { ScrollArea } from "components/ui/scroll-area";
import ApiConfiguration from "./components/api-config";
import MerchantCredentials from "./components/merchant-credentials";
import WebHook from "./components/web-hook";



let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""
let merchantCode: any = ""

if (
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined"
) {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
  merchantCode = merchantList[0]?.merchantCode
}

// console.log(merchantCode)

export default function DevelopersTools() {
  const dropOptions = ["Contact us", "Share feedback", "Resolve a complain"]
  const GetParameters = { merchantCode, token }
  const data: any = useQuery(['getMerchantByCode', GetParameters], () => getMerchantByCode(GetParameters));

  // console.log(data?.data?.responseObject[0])

  return <main className="relative w-full h-full flex flex-col">
    {/* //------------------Support button------------- */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="fixed z-50 right-[72px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal"
        >
          <MdContactSupport className="text-[24px] text-[#fff]" />
          Support
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
        <div className='w-full flex flex-col items-center gap-2'>
          {
            dropOptions.map((value, id) => {
              return <p key={id} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                {value}
              </p>
            })
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
    {/* //------------------Support button end------------- */}
    <p className="text-[#177196] text-[36px] font-[600] leading-normal mb-[40px] mt-[24px]">Developers Tools</p>
    <ScrollArea className="w-full pr-2">
      <div className="w-full flex flex-col items-center gap-4 pb-20 ">
        <ApiConfiguration />
        <MerchantCredentials data={data?.data?.responseObject[0]} />
        <WebHook data={data?.data?.responseObject[0]} />
      </div>
    </ScrollArea>

  </main>;
}
