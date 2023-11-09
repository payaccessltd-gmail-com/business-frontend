"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { Label } from "components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "components/ui/form"
import { toast } from "components/ui/use-toast"

const FormSchema = z.object({
    bankAccount: z.string(),
    wallet: z.string()
})

export function EarningNotification({ data, Notification, setNotification }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bankAccount: "BANK_ACCOUNT",
            wallet: "PAYACCESS_WALLET",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

    }
    // console.log(data)

    const handleSubmit = (e: any) => {
        e.preventDefault;
        if (e.target.value === "PAYACCESS_WALLET") {
            setNotification({
                ...Notification,
                merchantReceiveEarningsOption: "PAYACCESS_WALLET"
            })
        } else if (e.target.value === "BANK_ACCOUNT") {
            setNotification({
                ...Notification,
                merchantReceiveEarningsOption: "BANK_ACCOUNT"
            })
        }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[60%] mb-5 p-[24px] rounded-[10px] flex flex-col gap-8 items-start bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]">
                <RadioGroup defaultValue={data?.merchantReceiveEarningsOption}>
                    <FormField
                        control={form.control}
                        name="bankAccount"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                <FormControl>
                                    <RadioGroupItem onClick={(e) => handleSubmit(e)} value={field.value} id="r1" />
                                </FormControl>
                                <FormLabel>
                                    <Label className="text-[14px] font-[400]" htmlFor="r1">Send to my bank account</Label>
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="wallet"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                <FormControl>
                                    <RadioGroupItem onClick={(e) => handleSubmit(e)} value={field.value} id="r2" />
                                </FormControl>
                                <FormLabel>
                                    <Label className="text-[14px] font-[400]" htmlFor="r2">Send to my Payaccess wallet</Label>
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </RadioGroup>

            </form>
        </Form>

    )
}











// export function RadioGroupDemo() {
//     return (
//         <RadioGroup defaultValue="comfortable">
//             <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="default" id="r1" />
//                 <Label htmlFor="r1">Default</Label>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="comfortable" id="r2" />
//                 <Label htmlFor="r2">Comfortable</Label>
//             </div>
//             <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="compact" id="r3" />
//                 <Label htmlFor="r3">Compact</Label>
//             </div>
//         </RadioGroup>
//     )
// }
