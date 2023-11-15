
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import { LuCopy } from "react-icons/lu";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "api/login";




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

// console.log(merchantList[0]?.businessName)
// const businessName = merchantList[0]?.businessName

const WebHookSchema = z.object({
    webHookUrl: z.string(),
    callbackUrl: z.string(),
    // payItemId: z.string(),
});

export default function WebHook() {
    const router = useRouter();
    const { toast } = useToast();
    const webHookForm = useForm<z.infer<typeof WebHookSchema>>({
        resolver: zodResolver(WebHookSchema),
        defaultValues: {
            webHookUrl: "",
            callbackUrl: "",
            // payItemId: "",
        },
    });

    const handleCopyToClipboard = (e: any) => {
        if (e.target.id === "webHookUrl") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = webHookForm.getValues("webHookUrl");
            // Append the input element to the DOM (it doesn't need to be visible)
            document.body.appendChild(tempInput);

            // Select the text inside the input element
            tempInput.select();

            // Copy the selected text to the clipboard
            document.execCommand("copy");

            // Remove the temporary input element
            document.body.removeChild(tempInput);
            toast({
                variant: "default",
                title: "Copied",
                description: `${webHookForm.getValues("webHookUrl")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        } else if (e.target.id === "callbackUrl") {
            // Create a temporary input element
            const tempInput = document.createElement("input");
            tempInput.value = webHookForm.getValues("callbackUrl");

            // Append the input element to the DOM (it doesn't need to be visible)
            document.body.appendChild(tempInput);

            // Select the text inside the input element
            tempInput.select();

            // Copy the selected text to the clipboard
            document.execCommand("copy");

            // Remove the temporary input element
            document.body.removeChild(tempInput);
            toast({
                variant: "default",
                title: "Copied",
                description: `${webHookForm.getValues("callbackUrl")}`,
                className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
            });
        }

        // else if (e.target.id === "payItemId") {
        //     // Create a temporary input element
        //     const tempInput = document.createElement("input");
        //     tempInput.value = webHookForm.getValues("payItemId");

        //     // Append the input element to the DOM (it doesn't need to be visible)
        //     document.body.appendChild(tempInput);

        //     // Select the text inside the input element
        //     tempInput.select();

        //     // Copy the selected text to the clipboard
        //     document.execCommand("copy");

        //     // Remove the temporary input element
        //     document.body.removeChild(tempInput);
        //     toast({
        //         variant: "default",
        //         title: "Copied",
        //         description: `${webHookForm.getValues("payItemId")}`,
        //         className: "bg-[#BEF2B9] border-[#519E47] w-fit h-fit p-[12px]",
        //     });
        // }

    };

    // const loginMutation = useMutation({
    //     mutationFn:,
    //     onSuccess: async (data) => {
    //         const responseData: API.LoginResponse =
    //             (await data.json()) as API.LoginResponse;

    //         if (!responseData?.subject && !responseData?.token) {
    //             setLoading(false)
    //             toast({
    //                 variant: "destructive",
    //                 title: "",
    //                 description: "Error Signin in",
    //             });
    //         } else if (responseData?.token && responseData?.token) {
    //             setLoading(false)

    //             toast({
    //                 variant: "default",
    //                 title: "",
    //                 description: "Signin successful",
    //                 className:
    //                     "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
    //             });

    //             localStorage.setItem("subject", responseData?.subject as string);
    //             localStorage.setItem(
    //                 "merchantList",
    //                 JSON.stringify(responseData?.merchantList),
    //             );
    //             localStorage.setItem("token", responseData?.token as string);

    //             if (typeof window) {
    //                 router.push(`/dashboard`);
    //             }
    //             webHookForm.reset();
    //         } else {
    //             setLoading(false)

    //             toast({
    //                 variant: "destructive",
    //                 title: "",
    //                 description: "Error Signin in",
    //             });
    //         }
    //     },

    //     onError: (e) => {
    //         setLoading(false)

    //         toast({
    //             variant: "destructive",
    //             title: `${e}`,
    //             description: "error",
    //         });
    //     },
    // });

    async function onSubmit(values: z.infer<typeof WebHookSchema>) {
        // setLoading(true)
        // loginMutation.mutate(values);
    }

    return (
        <Form {...webHookForm}>
            <form
                onSubmit={webHookForm.handleSubmit(onSubmit)}
                className="w-[55%] rounded-[20px] bg-white border-[2px] py-[30px] p-[20px] border-[#EEF8FF] flex flex-col items-center"
            >

                <div className=" w-full flex flex-col items-center gap-2 mb-6">
                    <p className="text-[#0C394B] text-[16px] font-[700] leading-6">
                        Wed hook for Goodness oil & Gas
                    </p>
                        {/* {`Web hook for ${businessName ? businessName : ""}`} */}
                    
                    <p className="text-[#0C394B] text-[14px] font-[400] leading-5">
                        Add a web hook endpoint
                    </p>

                </div>

                <FormField
                    control={webHookForm.control}
                    name="webHookUrl"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5">Test webhook URL</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="webHookUrl"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={webHookForm.control}
                    name="callbackUrl"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[24px]">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5 ">Test Callback URL</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="callbackUrl"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={webHookForm.control}
                    name="payItemId"
                    render={({ field }) => (
                        <FormItem className="w-full mt-[24px]">
                            <FormLabel className="text-[#666666] text-[14px] font-[400] leading-5 ">Pay Item ID</FormLabel>
                            <FormControl className="w-full">
                                <div className="w-full p-1 rounded-[8px] border border-solid border-[#A1CBDE] h-[46px] relative">
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Copy Link"
                                        className="placeholder:text-[#555555] placeholder:text-[16px] placeholder:leading-normal placeholder:font-[400]  pl-[17px] pr-[69px] w-full h-full outline-none border-none bg-transparent"
                                    />
                                    <LuCopy
                                        id="payItemId"
                                        onClick={(e) => handleCopyToClipboard(e)}
                                        className="absolute right-[23px] top-[14.75px] cursor-pointer text-[16px] text-[#49454F]"
                                    />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

            </form>
        </Form>
    );
}
