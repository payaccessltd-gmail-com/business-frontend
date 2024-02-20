import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
// import { ScrollArea, ScrollBar } from "@radix-ui/react-scroll-area";
import { ScrollArea, ScrollBar } from "components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { deleteInvoice } from "api/invoice";
import DeletePopup from "app/(business-dashboard)/generate-invoice/components/delete-popup";
import { useToast } from "components/ui/use-toast";
//import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "components/ui/button"
import { IoMdCheckmark } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuChevronsRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";

import * as z from "zod"





const channel = [
    { label: "Processing", value: "1" },
    { label: "Processed", value: "2" },
    { label: "Pending", value: "3" },
    { label: "Failed", value: "4" },

] as const

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

if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
) {
    token = window.localStorage.getItem("token") as any
    subject = window.localStorage.getItem("subject") as any
    merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
    merchantId = merchantList[0].id ? merchantList[0]?.id : null
}


export default function SettlementsTable({ setTablePopup, setModalData, setModalOpen, settlementsTableData, row, setRow, setPage, page }: any) {

    const { toast } = useToast();

    const [deleteId, setDeleteId] = useState<string | undefined | null>("")
    const [deletePopup, setPopup] = useState<boolean>(false)
    const heading = ["Settlement Date", "Settlement Code", "Amount", "Status"]
    // const router = useRouter();
    const handlePageNumber = (option: any) => {
        if (option === "next") {
            if (page < Math.ceil(settlementsTableData?.totalCount / row) - 1) {
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
    const handleView = (id: any) => {
        if (typeof window) {
            //    router.push(`/invoice-details?id=${id}`);
        }
    }



    const deleteInvoiceMutation = useMutation({
        mutationFn: deleteInvoice,
        onSuccess: async (data: any) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;

            if (responseData?.statusCode === "1") {
                setPopup(false)
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Deleting Invoice",
                });
            }

            if (responseData?.statusCode === "0") {
                setPopup(false)
                toast({
                    variant: "default",
                    title: "",
                    description: "Invoice Deleted",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });

                if (typeof window) {
                    //  router.push(`/invoice`);
                }
            }
        },

        onError: (e) => {
            setPopup(false)
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });


    // console.log(settlementsTableData?.list)
    const handleDelete = (id: string) => {
        const requestData = {
            token,
            merchantId,
            invoiceId: id
        }
        // console.log(requestData)
        deleteInvoiceMutation.mutate(requestData as any);

    }

    const handleDeletePopup = (id: string) => {
        setDeleteId(id)
        setPopup(true)
    }

    const dateFormatter = (dateString: any) => {
        const dateObject = new Date(dateString);

        // Formatting the date as "month day"
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
        }).format(dateObject);

        // console.log(formattedDate);
        return formattedDate;

    }
    const timeFormatter = (dateString: any) => {
        console.log("dateString: ", dateString)
        const dateObject = new Date(dateString);
        // Extracting hours, minutes, and seconds
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        // Determine if it's AM or PM
        const amOrPm = hours >= 12 ? 'pm' : 'am';

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

        // Format minutes with two digits
        const formattedMinutes = minutes.toString().padStart(2, '0');

        // Creating a time string in h:mm a format
        const timeString = `${formattedHours}:${formattedMinutes}${amOrPm}`;
        console.log(timeString);
        return timeString;

    }

    const formatCode = (inputStr: string) => {
        let formattedStr = "";
        for (let i = 0; i < inputStr.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedStr += "-";
            }
            formattedStr += inputStr[i];
            if (i % 4 === 3 && i !== inputStr.length - 1) {
                formattedStr += "-";
            }
        }
        return formattedStr;
    }

    const handleModalState = (id: any, settlementCode: any, settlementDate: any) => {
        setModalData({ id, settlementCode, settlementDate })
        setTablePopup((value: any) => !value)
    }

    // console.log("settlementData: ", settlementsTableData)


    return (
        <div className='flex flex-col items-center relative bg-white'>
            <ScrollArea className="xl:w-full w-[75vw] rounded-[8px]">
                <div className="w-full flex flex-col xl:items-center items-start">
                    <div className="xl:w-full w-[1000px]">
                        <div className='flex flex-row items-center justify-between rounded-[8px] p-[10px] h-[58px] w-full bg-[#0C394B] mb-[24px]'>
                            {
                                heading.map((value, id) => {
                                    if (value === "Status") {
                                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-center w-[20%] font-raleway'>{value}</p>
                                    } else {
                                        return <p key={id} className='text-[#FFFFFF] text-[16px] font-[600] leading-[20px] text-end w-[20%] font-raleway'>{value}</p>
                                    }
                                })

                            }
                        </div>
                        {/* "Settlement Date", "Settlement Code", "Currency", "Status" */}
                        <ScrollArea className='w-full h-[400px]'>
                            <div className='flex flex-col items-center gap-6 w-full mb-6'>
                                {settlementsTableData?.list?.map(({ settlementCode, settlementAmount, settlementDate, payAccessCurrency, settlementStatus, id }: any, idx: React.Key | null | undefined) => {
                                    return <div key={idx} className='p-[10px] border-b border-b-[#BAE5F44F] flex flex-row items-center justify-between w-full h-[44px]'>

                                        <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-end w-[20%] '>{`${dateFormatter(settlementDate)}, ${settlementDate?.split("-")[0]}`}</p>
                                        <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-end w-[20%]'>{formatCode(settlementCode)}</p>
                                        <p className='text-[#666666] text-[14px] font-[600] leading-[22px] text-end w-[20%] font-raleway'>
                                            {payAccessCurrency === "NGN" ? "₦" : ""} {settlementAmount ? settlementAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, }) : '00.00'}
                                        </p>
                                        <div className='w-[20%] max-w-[20%] flex flex-row items-center justify-end gap-[20px]'>
                                            <div className='flex flex-col items-center'>
                                                {settlementStatus === "PENDING" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#D6A12E] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                    {"Pending"}
                                                    <IoMdCheckmark className="text-[16px]" />
                                                </p>}
                                                {/* {settlementStatus === "PENDING" && <p className='text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#115570] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                    {"PENDING"}
                                    <LuChevronsRight className="text-[16px]" />
                                </p>} */}
                                                {settlementStatus === "COMPLETED" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#1F932D] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                    {"Completed"}
                                                    <IoMdCheckmark className="text-[16px]" />
                                                </p>}
                                                {settlementStatus === "AWAITING_OTP_VALIDATION" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                    {"Processing"}
                                                    <IoMdCheckmark className="text-[16px]" />
                                                </p>}
                                                {settlementStatus === "DELETED" && <p className='cursor-pointer text-[#FFFFFF] text-[14px] font-[500] leading-[20px] w-fit text-center bg-[#C61010] rounded-[24px] px-[10px] py-[2px] gap-[2px] flex flex-row items-center'>
                                                    {"Deleted"}
                                                    <IoMdCheckmark className="text-[16px]" />
                                                </p>}

                                            </div>



                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className='outline-none border-none'>
                                                        <SlOptions className="text-[#666666] cursor-pointer text-[16px]" />
                                                    </Button>

                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end' className="w-[206px] p-[8px]">
                                                    <div className='w-full flex flex-col items-center'>
                                                        {
                                                            settlementStatus === "DELETED"
                                                                ?
                                                                ""
                                                                :
                                                                <p onClick={() => handleModalState(id, settlementCode, settlementDate)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                                    View
                                                                </p>
                                                        }
                                                        <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                            Download
                                                        </p>
                                                        {/*  {settlementStatus === "DELETED" ? "" : <p onClick={() => handleDeletePopup(id)} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                Delete
                                            </p>}  */}
                                                        {/* {settlementStatus === "DELETED" ? "" : <p className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                                            Raise complain / Ticket
                                                        </p>} */}
                                                    </div>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                    </div>
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </div >

                <ScrollBar orientation="horizontal" />
            </ScrollArea >

            <div className='w-full h-10 mb-6 flex flex-row items-center gap-12 justify-end bg-white pr-[20px] mt-5'>

                <div className='flex flex-row items-center w-[155px]'>
                    <span className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-full flex flex-row items-center'>{`Rows per page: ${row === "500" ? "All" : row}`}</span>
                    <Select
                        onValueChange={(value) => setRow(value)}
                        value={row}
                    >
                        <SelectTrigger className='w-fit border-none shadow-none' >
                            {/* <MdKeyboardArrowDown className={`text-[22px]`} /> */}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value={settlementsTableData?.totalCount}>All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <p className='text-[#072F40] text-[12px] font-[300] leading-[16px] w-[70px] flex flex-row items-center'>
                    {`${(((Number(page) + 1) - 1) * Number(row)) + 1}-${(Number(page) + 1) * Number(settlementsTableData?.list?.length)} of ${settlementsTableData?.totalCount}`}
                </p>
                <div className='flex flex-row items-center gap-12 w-[90px]'>
                    <LuChevronLeft onClick={() => handlePageNumber("prev")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                    <LuChevronRight onClick={() => handlePageNumber("next")} className="text-[24px] text-[#AAB7C6] cursor-pointer" />
                </div>


            </div>
            {
                deletePopup ? <DeletePopup setPopup={setPopup} deleteId={deleteId} handleDelete={handleDelete} /> : ""
            }


        </div >
    )

}








