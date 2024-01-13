"use client"


import React, { useState } from 'react'
import { IoMdCheckmark } from "react-icons/io"
import { LuChevronsRight } from "react-icons/lu"
import { SlOptions } from "react-icons/sl"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "components/ui/button"
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { deleteInvoice } from "api/invoice";



import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import { ScrollArea } from 'components/ui/scroll-area'
import { RiArrowDropDownFill } from "react-icons/ri"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"


let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""


if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
) {
    token = window.localStorage.getItem("token") as any
    subject = window.localStorage.getItem("subject") as any
    merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
    merchantId = merchantList[0].id ? merchantList[0]?.id : null
}


const POSTable = ({ terminalTableData, row, setRow, setPage, page }: any) => {

    console.log("rowperpage: ", row)
    console.log("page: ", page)
    console.log("available row per page: ", terminalTableData?.list?.length)
    console.log("POS data: ", terminalTableData?.list)
    // console.log(terminalTableData)

    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState<string | undefined | null>("")
    const [deletePopup, setPopup] = useState<boolean>(false)
    const heading = ["Merchant Name", "Terminal Brand", "Terminal Type", "Status", "Quantity"]

    const router = useRouter();


    const handlePageNumber = (option: any) => {
        if (option === "next") {
            if (page < Math.ceil(terminalTableData?.totalCount / row) - 1) {
                // console.log("next: ", page)
                setPage(Number(page) + 1)
            } else {
                return;
            }
        }
        else if (option === "prev") {
            if (page > 0) {
                // console.log("prev: ", page)
                setPage(Number(page) - 1)
            } else {
                return;
            }

        }
    }
    // console.log("terminalTableData", terminalTableData)

    return (
        <div className='flex flex-col items-center relative'>
            <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                {
                    heading.map((value, id) => {
                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                    })

                }
            </div>
            <ScrollArea className='w-full h-[400px]'>
                <div className='flex flex-col items-center gap-6 w-full mb-6'>
                    {terminalTableData?.list?.map(({ id, quantity, terminalBrand, terminalRequestStatus, terminalType, customerName }: any, idx: React.Key | null | undefined) => {
                        return (
                            <div key={idx} className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center w-full h-[44px]'>
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] w-[20%] text-center font-raleway'>Tunde</p>
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{terminalBrand}</p>
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{terminalType}</p>
                                <div className='w-[20%] flex flex-col items-center'>
                                    {terminalRequestStatus === "PENDING" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                        {"Pending"}
                                        <IoMdCheckmark className="text-[16px]" />
                                    </p>}
                                    {terminalRequestStatus === "DRAFT" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#115570] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                        {"Draft"}
                                        <LuChevronsRight className="text-[16px]" />
                                    </p>}
                                    {terminalRequestStatus === "APPROVED" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                        {"Approved"}
                                        <IoMdCheckmark className="text-[16px]" />
                                    </p>}
                                    {terminalRequestStatus === "NOTPAID" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                        {"Not paid"}
                                        <IoMdCheckmark className="text-[16px]" />
                                    </p>}
                                    {terminalRequestStatus === "DELETED" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                        {"Deleted"}
                                        <IoMdCheckmark className="text-[16px]" />
                                    </p>}
                                </div>
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{quantity}</p>


                            </div>
                        )
                    })}
                </div>
            </ScrollArea>

            <div className='w-full h-10 mb-6 flex flex-row items-center gap-12 justify-end bg-white pr-[20px]'>

                <div className='flex flex-row items-center w-[155px]'>
                    <span className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-full flex flex-row items-center'>{`Rows per page: ${row}`}</span>
                    <Select
                        onValueChange={(value) => setRow(value)}
                        value={row}
                    >
                        <SelectTrigger className='w-fit border-none shadow-none' >
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-[70px] flex flex-row items-center'>
                    {`${(((Number(page) + 1) - 1) * Number(row)) + 1}-${(Number(page) + 1) * Number(terminalTableData?.list?.length)} of ${terminalTableData?.totalCount}`}
                </p>
                <div className='flex flex-row items-center gap-12 w-[90px]'>
                    <LuChevronLeft onClick={() => handlePageNumber("prev")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                    <LuChevronRight onClick={() => handlePageNumber("next")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                </div>


            </div>



        </div>
    )
}

export default POSTable





// < div className = 'w-[20%] flex flex-row items-center justify-end gap-[20px]' >
//                             <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center font-raleway'>{dueDate}</p>
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="ghost" className='outline-none border-none'>
//                                         <SlOptions className="text-[#666666] cursor-pointer text-[16px]" />
//                                     </Button>

//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
//                                     <div className='w-full flex flex-col items-center gap-2'>
//                                         {invoiceStatus === "DELETED" ? "" : <p onClick={() => handleView(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
//                                             View
//                                         </p>}
//                                         {/* <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
//                                             Download
//                                         </p> */}
//                                         {invoiceStatus === "DELETED" ? "" : <p onClick={() => handleDeletePopup(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
//                                             Delete
//                                         </p>}
//                                         {invoiceStatus === "DELETED" ? "" : <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
//                                             Revoke
//                                         </p>}
//                                     </div>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>

//                         </div >











