import { Metadata } from "next";
import { Button } from "components/ui/button"
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


export const metadata: Metadata = {
  title: "Developer",
  description: "Developer tools",
};


export default function DevelopersTools() {
  const dropOptions = ["Contact us", "Share feedback", "Resolve a complain"]

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
      <div className="w-full flex flex-col items-center gap-4">
        <ApiConfiguration />
        <MerchantCredentials />
        <WebHook />
        <Button
          className="mb-20 rounded-[8px] w-[40%] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
        >
          Save changes
        </Button>
      </div>
    </ScrollArea>

  </main>;
}
