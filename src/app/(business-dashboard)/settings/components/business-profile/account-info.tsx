"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { LuChevronDown } from "react-icons/lu";
import { format } from "date-fns";
import { cn } from "lib/utils";
import { Calendar } from "components/ui/calendar";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Textarea } from "components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { updateAccountData } from "api/settings"


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



const BusinessInfoSchema = z.object({
    businessBvn: z.number(),
    businessAccountNumber: z.number(),
    businessBankName: z.string(),
    businessAccountName: z.string(),


});
export default function AccountInfoForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [receipt, setReceipt] = useState(false);
    const [popup, setPopup] = useState(false);
    const [modalData, setModalData] = useState<any>("");
    // const [loading, setLoading] = useState(false);
    const [inputField, setInputField] = useState<any[]>([
        { label: "Customer Email" },
    ]);




    let businessInfoForm = useForm<z.infer<typeof BusinessInfoSchema>>({
        resolver: zodResolver(BusinessInfoSchema),
        defaultValues: {
            // businessBvn: "",
            // businessAccountNumber: "",
            businessBankName: "",
            businessAccountName: "",
        },
    });
    const handleModal = (e: any) => {

    };

    const accountInfoFormMutation = useMutation({
        mutationFn: updateAccountData,
        onSuccess: async (data) => {
            const responseData: API.InvoiceStatusReponse =
                (await data.json()) as API.InvoiceStatusReponse;
            if (responseData?.statusCode === "1") {
                toast({
                    variant: "destructive",
                    title: "",
                    description: "Error Creating Invoice",
                });
            }
            if (responseData?.statusCode === "0") {
                toast({
                    variant: "default",
                    title: "",
                    description: "Invoice Created",
                    className:
                        "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
                });
                businessInfoForm.reset();
              
            }
        },
        onError: (e) => {
            console.log(e);
            toast({
                variant: "destructive",
                title: `${e}`,
                description: "error",
            });
        },
    });

    async function onSubmit(values: z.infer<typeof BusinessInfoSchema>) {
        console.log(values);
        let newValues = {
            ...values,
            token: token,
            merchantId: merchantId
        };
        console.log(newValues);
        accountInfoFormMutation.mutate(newValues as any);
    }
    // const modalRef = useRef<any>();
    // const handleModalSubmit = () => {
    //     modalRef.current.click()
    // }


    return (
        <Form {...businessInfoForm}>
            <form
                onSubmit={businessInfoForm.handleSubmit(onSubmit)}
                className="mb-5 p-[40px] rounded-[24px] flex flex-col items-end bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
            >

                <FormField
                    control={businessInfoForm.control}
                    name="businessBvn"
                    render={({ field }) => (
                        <FormItem className="w-full flex flex-col">
                            <div className="w-full flex flex-row items-center justify-end gap-4">
                                <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">
                                    BVN
                                </FormLabel>
                                <FormControl className="w-full bg-[red]">
                                    <Input
                                        type="number"
                                        className="border-[#D6D6D6] rounded-[10px] min-h-[66px] shadow-none bg-white w-[307px] p-2 "
                                        placeholder="Enter BVN"
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(Number(event.target.value))
                                        }
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="self-end" />
                        </FormItem>
                    )}
                />



                <FormField
                    control={businessInfoForm.control}
                    name="businessAccountNumber"
                    render={({ field }) => (
                        <FormItem className="w-full mt-6 flex flex-col">
                            <div className="w-full flex flex-row items-center justify-end gap-4">
                                <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">
                                    Account Number
                                </FormLabel>
                                <FormControl className="w-full bg-[red]">
                                    <Input
                                        type="number"
                                        className="border-[#D6D6D6] rounded-[10px] min-h-[66px] shadow-none bg-white w-[307px] p-2 "
                                        placeholder="Enter account number"
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(Number(event.target.value))
                                        }
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="self-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={businessInfoForm.control}
                    name="businessBankName"
                    render={({ field }) => (
                        <FormItem className="w-full mt-6 flex flex-col">
                            <div className="w-full flex flex-row items-center justify-end gap-4">
                                <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">
                                    Bank Name
                                </FormLabel>
                                <FormControl className="w-full bg-[red]">
                                    <Input
                                        type="text"
                                        className="border-[#D6D6D6] rounded-[10px] min-h-[66px] shadow-none bg-white w-[307px] p-2 "
                                        placeholder="Enter Bank Name"
                                        {...field}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="self-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={businessInfoForm.control}
                    name="businessAccountName"
                    render={({ field }) => (
                        <FormItem className="w-full mt-6 flex flex-col">
                            <div className="w-full flex flex-row items-center justify-end gap-4">
                                <FormLabel className="text-[#2A2A2A] text-[16px] leading-[150%] font-[600]">
                                    Account Name
                                </FormLabel>
                                <FormControl className="w-full bg-[red]">
                                    <Input
                                        type="text"
                                        className="border-[#D6D6D6] rounded-[10px] min-h-[66px] shadow-none bg-white w-[307px] p-2 "
                                        placeholder="Enter Account Name"
                                        {...field}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage className="self-end" />
                        </FormItem>
                    )}
                />



                <Button
                    // disabled={loading}
                    className="mt-[32px] min-h-[48px] font-[700] w-[225px] hover:bg-[#1D8EBB] hover:opacity-[0.4] self-end"
                    type="submit"
                // onClick={(e) => handleModal(e)}
                >
                    Save Changes
                </Button>
            </form>

        </Form>
    );
}
