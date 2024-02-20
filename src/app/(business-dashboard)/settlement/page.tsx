"use client"

import { Metadata } from "next"
import * as React from "react"
import { Button } from "components/ui/button"
import EmptyState from "./components/EmptyState"
import { zodResolver } from "@hookform/resolvers/zod"
import { LuChevronDown } from "react-icons/lu"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllInvoice } from "api/invoice"
import InvoiceTable from "../generate-invoice/components/table"
import SettlementsTable from "./components/settlement-table"
import { getAllSettlements } from "api/settlements"
import { formatMoneyAmount } from "utils/numberFormater"
import RunSettlementsForm from "./components/run-settlements"
import SettlementBreakdown from "./components/settlement-breakdown"
import { ScrollArea } from "components/ui/scroll-area"
import { useToast } from "components/ui/use-toast"


const dropOptions: any[] = [
  { name: "All Channels", value: "All Channels" },
  { name: "Channel 1", value: "Channel 1" },
  { name: "Channel 2", value: "Channel 2" }
]


const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
})

let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""

if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}

// export function transactionForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   })

const Settlement = () => {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  const GetParameters1 = { pageNumber: 0, rowCount: 1, token }
  const data1: any = useQuery(["getAllSettlements", GetParameters1], () => getAllSettlements(GetParameters1))


  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  const [date2, setDate2] = useState<Date>()
  const [row, setRow] = useState<string>(data1?.data?.responseObject?.totalCount?.toString() || "500")
  const [page, setPage] = useState<string>("0")
  const [popup, setPopup] = useState(false);
  const [tablepopup, setTablePopup] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [filter, setFilter] = useState<any>(null)
  const [filter1, setFilter1] = useState<any>(null)
  const [status, setStatus] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)


  const GetParameters = { pageNumber: page, rowCount: row, token }
  const data: any = useQuery(["getAllSettlements", GetParameters], () => getAllSettlements(GetParameters))
  // console.log("get settlemnts: ", data?.data?.responseObject)

  React.useEffect(() => {
    setFilter(filter1)
    // console.log(filter1)
  }, [filter1])


  const handleFilter = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    try {
      const filterData: any = await getAllSettlements({ ...GetParameters, settlementStartDate: date?.toISOString().split("T")[0], settlementStatus: status })
      setFilter1(filterData?.responseObject)
      console.log(filterData?.responseObject)
      if (filterData?.responseObject?.totalCount === 0) {
        toast({
          variant: "default",
          title: "Filter Message",
          description: "No match found",
          className: "bg-[#F2FBFF] border-[#23AAE1] text-[#23AAE1] text-[14px] font-[400]",
        })
      } else {
        toast({
          variant: "default",
          title: "Success...",
          description: "Filter Set",
          className: "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        })
      }
      setLoading(false)
      setStatus(undefined)
      setDate(undefined)
    } catch (error: any) {
      console.log(error)
      setStatus(undefined)
      setDate(undefined)
      setLoading(false)
      toast({
        variant: "destructive",
        title: `${error}`,
        description: "error",
      })
    }
    // console.log("date: ", date?.toISOString().split("T")[0])
    // console.log("status: ", status)
  }

  return (
    <div className="relative flex flex-col w-full h-full">

      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Settlement</p>

      <div className="flex flex-row items-start justify-between w-full">

        <div className="flex flex-row items-start gap-8">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="outline-[#D3EEF9] border border-[#D3EEF9] border-solid h-[45px] flex flex-row items-center gap-[10px] text-[14px] font-bold text-[#666666] leading-[150%]"
              >
                Filter
                <LuChevronDown className="mt-[2px] text-[24px] text-[#666666]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[298px] pl-[16px] pr-[6px] py-[22px]">
              <ScrollArea className="h-[28vh] pr-[22px]">
                <form className="flex flex-col w-full">
                  <div className="flex flex-col space-y-1.5 mb-[12px]">
                    <Label htmlFor="status" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                      Settlement Status
                    </Label>
                    <Select
                      onValueChange={setStatus}
                      value={status}
                    >
                      <SelectTrigger
                        id="status"
                        className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]"
                      >
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="p-[6px]">
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="Not paid">Not paid</SelectItem>
                        <SelectItem value="Revoke">Revoke</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* <div className="flex flex-col items-start mb-[24px]">
                  <label htmlFor="amount" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                    Amount
                  </label>
                  <input
                    placeholder="Amount"
                    id="amount"
                    type="amount"
                    className="px-4 py-2 outline-[#A1CBDE] w-full rounded-[8px] mt-[8px] border border-[#A1CBDE] border-solid h-[45px]"
                    onChange={(event) => formatMoneyAmount(event)}
                  />
                </div> */}
                  <div className="flex flex-col items-start gap-[8px] w-full">
                    <label htmlFor="startDate" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                      Settlement Date
                    </label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="startDate"
                          variant={"outline"}
                          className={cn(
                            "px-4 py-2 outline-[#A1CBDE] rounded-[8px] border border-[#A1CBDE] border-solid h-[45px] w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span className="text-[#000000] text-[16px] leading-normal font-[400]">Start Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-auto p-2 space-y-2">
                        <div className="border rounded-md">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </div>
                      </PopoverContent>
                    </Popover>

                  </div>


                  {/* 

                  <div className="flex flex-col items-start gap-[8px] w-full">
                    <label htmlFor="endDate" className="text-[16px] font-[400px] text-[#0C394B] leading-normal">
                      End Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="endDate"
                          variant={"outline"}
                          className={cn(
                            "px-4 py-2 outline-[#A1CBDE] rounded-[8px] border border-[#A1CBDE] border-solid h-[45px] w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date1 ? (
                            format(date1, "PPP")
                          ) : (
                            <span className="text-[#000000] text-[16px] leading-normal font-[400]">End Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-auto p-2 space-y-2">
                        <div className="border rounded-md">
                          <Calendar mode="single" selected={date1} onSelect={setDate1} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div> */}


                  <Button
                    disabled={loading}
                    onClick={(e: any) => handleFilter(e)}
                    className="mt-[27px] self-center rounded-[8px] w-full h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
                  >
                    {loading ? "Filtering..." : "Filter"}
                  </Button>
                </form>
              </ScrollArea>

            </DropdownMenuContent>
          </DropdownMenu>
          {/* {data?.data?.responseObject?.list.length ?
            <Button
              onClick={() => setPopup(true)}
              className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
            >
              Run Settlements

            </Button>
            : ""} */}
        </div>
      </div>


      {popup ?
        <RunSettlementsForm handleModalPOSpopup={setPopup} />
        :
        ""}
      {tablepopup ?
        <SettlementBreakdown modalData={modalData} handleModalPOSpopup={setTablePopup} />
        :
        ""}

      {data?.data?.responseObject?.list.length ? (
        <div className="w-full mt-[35px] self-center">
          <SettlementsTable setModalData={setModalData} setTablePopup={setTablePopup} setPage={setPage} page={page} row={row} setRow={setRow} settlementsTableData={(filter && filter?.totalCount !== 0) ? (filter) : (data?.data?.responseObject)} />
        </div>
      ) : (
        <div className="w-[602px] mt-[132px] self-center">
          <EmptyState />
        </div>
      )}
    </div>
  )
}
// "jsljdlk"
export default Settlement












