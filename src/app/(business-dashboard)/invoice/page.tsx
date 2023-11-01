"use client"

import { Button } from "components/ui/button"
import { useState } from "react"
import { MdContactSupport } from "react-icons/md"
import { LuChevronDown } from "react-icons/lu"
import { IoSearchSharp } from "react-icons/io5"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { Label } from "components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { addDays, format } from "date-fns"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover"
import EmptyState from "./components/empty-state"
import InvoiceTable from "../generate-invoice/components/table"




export default function GetStarted() {
  const [data, setData] = useState(0)
  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  return <div className="relative w-full h-full flex flex-col">
    <Button
      className="absolute z-[1px] right-[42px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal"
    >
      <MdContactSupport className="text-[24px] text-[#fff]" />
      Support
    </Button>
    <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[40px]">Invoice</p>
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-[18px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="outline-[#D3EEF9] border border-[#D3EEF9] border-solid h-[45px] flex flex-row items-center gap-[10px] text-[14px] font-bold text-[#666666] leading-[150%]">
              Filter
              <LuChevronDown className="mt-[2px] text-[24px] text-[#666666]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[298px] p-[22px]">
            <form className="w-full flex flex-col">

              <div className="flex flex-col space-y-1.5 mb-[24px]">
                <Label htmlFor="status" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">Invoice Status</Label>
                <Select>
                  <SelectTrigger id="status" className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]">
                    <SelectValue placeholder="Show all" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="w-[101px] p-[6px]">
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Not paid">Not paid</SelectItem>
                    <SelectItem value="Revoke">Revoke</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col items-start mb-[24px]">
                <label htmlFor="email" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">Email Address</label>
                <input placeholder="Amount" id="email" type="email" className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]" />
              </div>
              <div className="flex flex-col items-start gap-[8px] w-full">
                <label htmlFor="date" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">Time range</label>
                <div id="date" className="flex flex-row items-center gap-[3px] w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "px-4 py-2 outline-[#A1CBDE] rounded-[8px] border border-[#A1CBDE] border-solid h-[45px] w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >

                        {date ? format(date, "PPP") : <span className="text-[#000000] text-[16px] leading-normal font-[400]">Start Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                      <div className="rounded-md border">
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "px-4 py-2 outline-[#A1CBDE] rounded-[8px] border border-[#A1CBDE] border-solid h-[45px] w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >

                        {date1 ? format(date1, "PPP") : <span className="text-[#000000] text-[16px] leading-normal font-[400]">End Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                      <div className="rounded-md border">
                        <Calendar mode="single" selected={date1} onSelect={setDate1} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

              </div>
              <Button
                className="mt-[27px] self-center rounded-[8px] w-[85%] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
              >
                Filter
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="p-1 rounded-[8px] border border-solid border-[#D6F5FFD9] bg-[#F3FCFF] w-[450px] h-[45px] relative">
          <input type="text" placeholder="Search Invoice ID, customer email or name" className="placeholder:text-[#49454F] placeholder:text-[16px] placeholder:leading-[24px] placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent" />
          <IoSearchSharp className="absolute right-[23px] top-[8.75px] cursor-pointer text-[26px] text-[#49454F]" />
        </div>
      </div>
      {
        data ? <Button
          className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
        >
          Generate  Invoice
        </Button> : ""
      }

    </div>
    <div className="w-[602px] mt-[132px] self-center">
      <EmptyState />
    </div>
    {/* <div className="w-full mt-[35px] self-center">
      <InvoiceTable />
    </div> */}
  </div>
}








