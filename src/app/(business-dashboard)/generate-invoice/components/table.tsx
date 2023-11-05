"use client"


import React from 'react'
import { IoMdCheckmark } from "react-icons/io"
import { LuChevronsRight } from "react-icons/lu"
import { SlOptions } from "react-icons/sl"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { ScrollArea } from 'components/ui/scroll-area'

type Checked = DropdownMenuCheckboxItemProps["checked"]

const InvoiceTable = ({ invoiceTableData }: any) => {
    const heading = ["Amount", "Customer Name", "Invoice No.", "Status", "Date"]
    const dropOptions = ["View", "Download", "Delete", "Revoke"]
    // const demoData: any[] = [
    //     {
    //         id: 0,
    //         amount: 500,
    //         cname: "Faith Oluchi",
    //         InvoiceNo: "Pay00001",
    //         status: "not paid",
    //         Date: "may 29th, 2:40pm"

    //     },
    //     {
    //         id: 1,
    //         amount: 500,
    //         cname: "Faith Oluchi",
    //         InvoiceNo: "Pay00001",
    //         status: "paid",
    //         Date: "may 29th, 2:40pm"

    //     }
    // ]
    console.log(invoiceTableData)
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                {
                    heading.map((value, id) => {
                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                    })

                }
            </div>
            <ScrollArea className='w-full h-[400px]'>

                <div className='flex flex-col items-center gap-6 w-full mb-6'>
                    {invoiceTableData?.map(({ id, amount, customerName, InvoiceNo, invoiceStatus, dueDate }: any) => {
                        return <div className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center w-full h-[44px]'>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] w-[20%] font-raleway'>{`₦ ${amount}`}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{customerName}</p>
                            <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center w-[20%] font-raleway'>{`PAY${String(id).padStart(8, '0')}`}</p>
                            <div className='w-[20%] flex flex-col items-center'>
                                {invoiceStatus === "PENDING" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Pending"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "DRAFT" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#115570] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Draft"}
                                    <LuChevronsRight className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "PAID" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Paid"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                                {invoiceStatus === "NOTPAID" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"Not paid"}
                                    <IoMdCheckmark className="text-[16px]" />
                                </p>}
                            </div>
                            <div className='w-[20%] flex flex-row items-center justify-end gap-[20px]'>
                                <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-center font-raleway'>{dueDate}</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className='outline-none border-none'>
                                            <SlOptions className="text-[#666666] cursor-pointer text-[16px]" />
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

                            </div>

                        </div>
                    })}
                </div>
            </ScrollArea>

            <div className='w-full h-10 mb-6 flex flex-row items-center justify-end'>

            </div>

        </div>
    )
}

export default InvoiceTable















