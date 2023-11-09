"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
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
    debitMail: z.boolean().default(false).optional(),
    creditMail: z.boolean().default(false).optional(),
})

export function TransferNotification({ data, Notification, setNotification }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            creditMail: data?.transferNotificationByEmailForCredit,
            debitMail: data?.transferNotificationByEmailForDebit,
        },
    })
    // console.log(data)
    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }
    const handleUpdate = () => {
        setNotification({ ...Notification, transferNotificationByEmailForCredit: form.getValues("creditMail"), transferNotificationByEmailForDebit: form.getValues("debitMail") })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[60%] mb-5 p-[24px] rounded-[10px] flex flex-col gap-[14px] items-start bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]">
                <FormField
                    control={form.control}
                    name="debitMail"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    onClick={() => { handleUpdate() }}
                                    className="w-[20px] h-[20px]"
                                />
                            </FormControl>
                            <div className="flex flex-col items-start ">
                                <div className="flex flex-col items-start gap-1">
                                    <FormLabel className="text-[14px] font-[600]">
                                        Debit mail
                                    </FormLabel>
                                    <FormDescription className="text-[14px] text-[#555555] font-[400]">
                                        Send all transaction notification to my mails
                                    </FormDescription>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="creditMail"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-2 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    onClick={() => { handleUpdate() }}
                                    className="w-[20px] h-[20px]"
                                />
                            </FormControl>
                            <div className="flex flex-col items-start ">
                                <div className="flex flex-col items-start gap-1">
                                    <FormLabel className="text-[14px] font-[600]">
                                        Credit mail
                                    </FormLabel>
                                    <FormDescription className="text-[14px] text-[#555555] font-[400]">
                                        Email my customers for every transactions
                                    </FormDescription>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>

    )
}











