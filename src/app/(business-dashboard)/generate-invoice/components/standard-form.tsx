"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "components/ui/select"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { Checkbox } from "components/ui/checkbox"
import Link from "next/link"
import { LuChevronDown } from "react-icons/lu"
import { format } from "date-fns"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { FiPlus } from "react-icons/fi"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "components/ui/popover"
import { Textarea } from "components/ui/textarea"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "components/ui/collapsible"
import StandardRecipt from "./standard-form-recipt"
import ReviewPopup from "./review-popup"




const StandardSchema = z.object({
    CustomerName: z.string().min(2, "first name must contain more than 2 characters"),
    email1: z.string().email(),
    email2: z.string().email().optional(),
    email3: z.string().email().optional(),
    invoiceItem1: z.string(),
    qty1: z.number(),
    costPerUnit1: z.number(),
    invoiceItem2: z.string(),
    qty2: z.number(),
    costPerUnit2: z.number(),
    invoiceItem3: z.string(),
    qty3: z.number(),
    costPerUnit3: z.number(),
    amount: z.number().optional(),
    date: z.date({
        required_error: "Due date is required.",
    }),
    note: z.string().optional(),
    logo: z.string().optional(),
    discountType: z.string().optional(),
    tax: z.number().optional(),
    discount: z.number().optional(),
    shipping: z.number().optional(),

})


export default function StandardForm() {
    const [receipt, setReceipt] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const [popup, setPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputField, setInputField] = useState<any[]>([{ label: "Customer Email" }])
    const [invoiceItem, setInvoiceItem] = useState<any[]>([""])
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/get-started"
    const [isInputFocused, setInputFocused] = useState(false);
    const [date, setDate] = useState<Date>()
    const handleModal = (e: any) => {
        e.preventDefault()
        setReceipt((value) => !value)
    }
    const StandardForm = useForm<z.infer<typeof StandardSchema>>({
        resolver: zodResolver(StandardSchema),
        defaultValues: {
            CustomerName: "",
            email1: "example@gmail.com",
            email2: "example@gmail.com",
            email3: "example@gmail.com",
            invoiceItem1: "",
            qty1: 0,
            costPerUnit1: 0,
            invoiceItem2: "",
            qty2: 0,
            costPerUnit2: 0,
            invoiceItem3: "",
            qty3: 0,
            costPerUnit3: 0,
            date: undefined,
            amount: 0,
            note: "",
            logo: "",
            tax: 0,
            discountType: "Percentage",
            discount: 0,
            shipping: 0

        },


    })
    const addEmail = () => {
        if (inputField.length === 3) {
            return
        }
        setInputField([...inputField, { label: "" }]);
    };
    const addInvoiceItem = () => {
        if (invoiceItem.length === 3) {
            return
        }
        setInvoiceItem([...invoiceItem, ""]);
    };

    async function onSubmit(values: z.infer<typeof StandardSchema>) {
        console.log(values)
        // try {
        //   setLoading(true)

        //   const res = await signIn("credentials", {
        //     redirect: false,
        //     email: values.email,
        //     callbackUrl,
        //   })

        //   setLoading(false)

        //   if (!res?.error) {
        //     router.push(callbackUrl)
        //   } else {
        //     toast({
        //       variant: "destructive",
        //       title: "invalid email or password",
        //       description: "Please confirm if user is registered",
        //     })
        //   }
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // } catch (error: any) {
        //   setLoading(false)
        //   toast({
        //     variant: "destructive",
        //     title: error,
        //     description: error,
        //   })
        // }
    }

    return (
        <Form {...StandardForm}>
            <form
                onSubmit={StandardForm.handleSubmit(onSubmit)}
                className="w-full rounded-lg pb-[50px] space-y-6 flex flex-col items-center"
            >

                <FormField
                    control={StandardForm.control}
                    name="CustomerName"
                    render={({ field }) => (
                        <FormItem className="w-full ">
                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Customer Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="Enter customer name" {...field} />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    inputField.map(({ label }, id) => {
                        const nameString: any = `email${id + 1}`
                        return (

                            <FormField
                                key={id}
                                control={StandardForm.control}
                                name={nameString}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">{label}</FormLabel>
                                        <FormControl>
                                            <Input type="email" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="Enter customer Email address" {...field}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                }}
                                            // value={field.value ?? ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        )


                    })
                }
                <p onClick={() => addEmail()} className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]">
                    <FiPlus className="text-[#1D8EBB] text-[24px]" />
                    Add additional email address
                </p>

                {
                    invoiceItem.map((value, id) => {

                        let invoiceItemNameString: any = `invoiceItem${id + 1}`
                        let qtyNameString: any = `qty${id + 1}`
                        let costPerUnitNameString: any = `costPerUnit${id + 1}`
                        return (
                            <div key={id} className="flex flex-row items-start w-full gap-[13px]">
                                <FormField
                                    control={StandardForm.control}
                                    name={invoiceItemNameString}
                                    render={({ field }) => (
                                        <FormItem className="w-[40%] ">
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Invoice item</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="Product or service name" {...field} />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={StandardForm.control}
                                    name={qtyNameString}
                                    render={({ field }) => (
                                        <FormItem className="w-[20%] ">
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Qty</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="" {...field} onChange={event => field.onChange(Number(event.target.value))} />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={StandardForm.control}
                                    name={costPerUnitNameString}
                                    render={({ field }) => (
                                        <FormItem className="w-[40%] ">
                                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Invoice item</FormLabel>
                                            <FormControl>
                                                <Input type="number" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="" {...field} onChange={event => field.onChange(Number(event.target.value))} />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                        )


                    })
                }

                <p onClick={() => addInvoiceItem()} className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]">
                    <FiPlus className="text-[#1D8EBB] text-[24px]" />
                    Add additional items
                </p>



                <FormField
                    control={StandardForm.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Amount (optional)</FormLabel>
                            <FormControl>
                                <Input type="number" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="0.00" {...field} onChange={event => field.onChange(Number(event.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={StandardForm.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Due Date</FormLabel>
                            <Popover>
                                <FormControl>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "border-[#A1CBDE] min-h-[48px] bg-transparent w-full flex flex-row items-center justify-between font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <LuChevronDown className="text-[24px] text-[#2F3437]" />
                                        </Button>
                                    </PopoverTrigger>
                                </FormControl>

                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={StandardForm.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Invoice note (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Say something about the invoice"
                                    className="resize-none border-[#A1CBDE] min-h-[82px] bg-transparent"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={StandardForm.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormDescription className="text-[#0C394B] text-[16px] leading-normal font-[400]">Business Logo (optional)</FormDescription>
                            <FormLabel className="bg-[white] border-[#115570] rounded-[10px] flex h-[77px] w-full cursor-pointer flex-row items-center justify-center gap-3 border-[2px] border-dotted">
                                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                                <p className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                                    Drag file here to upload document or <span className="text-[#CA6B1B]">choose file</span>
                                </p>
                            </FormLabel>
                            <FormControl>
                                <Input className="hidden" placeholder="Enter identification number" {...field} type="file" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Collapsible className="w-full">
                    <CollapsibleTrigger className="flex flex-col items-start w-full">
                        <p className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]">
                            <FiPlus className="text-[#1D8EBB] text-[24px]" />
                            Add Tax & Discount
                        </p>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col items-start w-full gap-6">
                        <FormField
                            control={StandardForm.control}
                            name="tax"
                            render={({ field }) => (
                                <FormItem className="mt-[31px] w-full">
                                    <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Tax payment(%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="0.00" {...field} onChange={event => field.onChange(Number(event.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex flex-row items-end w-full gap-6">

                            <FormField
                                control={StandardForm.control}
                                name="discountType"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Discount</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="border-[#A1CBDE] min-h-[48px] bg-transparent">
                                                    <SelectValue defaultValue={field.value} placeholder="Percentage" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="percentage1">Percentage</SelectItem>
                                                <SelectItem value="percentage2">Percentage</SelectItem>
                                                <SelectItem value="percentage3">Percentage</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={StandardForm.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem className="w-full ">
                                        {/* <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Qty</FormLabel> */}
                                        <FormControl>
                                            <Input type="number" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="" {...field} onChange={event => field.onChange(Number(event.target.value))} />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>
                    </CollapsibleContent>
                </Collapsible>




                <Collapsible className="w-full">
                    <CollapsibleTrigger className="flex flex-col items-start w-full">
                        <p className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]">
                            <FiPlus className="text-[#1D8EBB] text-[24px]" />
                            Add Shipping Fee
                        </p>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col items-start w-full gap-6">
                        <FormField
                            control={StandardForm.control}
                            name="shipping"
                            render={({ field }) => (
                                <FormItem className="mt-[31px] w-full">
                                    <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Shipping fee (optional)</FormLabel>
                                    <FormControl>
                                        <Input type="number" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="0.00" {...field} onChange={event => field.onChange(Number(event.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CollapsibleContent>
                </Collapsible>




                <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
                        Subtotal
                    </p>
                    <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
                        00.000
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
                        Grand Total
                    </p>
                    <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
                        00.000
                    </p>
                </div>

                <Button
                    disabled={loading}
                    className="mt-[32px] min-h-[48px] font-[700] w-[335px] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    type="submit"
                    onClick={(e) => handleModal(e)}
                >
                    Preview
                </Button>
                {/* <Button
                    variant={"outline"}
                    disabled={loading}
                    className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
                    type="submit"
                >
                    Save as Draft
                </Button> */}

            </form>
            {receipt ? <StandardRecipt receipt={receipt} setReceipt={setReceipt} setPopup={setPopup} /> : ""}
            {popup ? <ReviewPopup value={"NGN 20,000"} setPopup={setPopup} /> : ""}
        </Form>
    )
}





