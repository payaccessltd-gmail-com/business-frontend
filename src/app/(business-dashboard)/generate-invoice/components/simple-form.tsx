"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { Checkbox } from "components/ui/checkbox"
import Link from "next/link"


// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const SimpleSchema = z.object({
    FirstName: z.string().min(2, "first name must contain more than 2 characters"),
    LastName: z.string().min(2, "last name must contain more than 2 characters"),
    EmailAddress: z.string().email(),
    BusinessName: z.string().min(2, "business name must contain more than 2 characters"),
    password: z.string().min(2, "Password must contain more than 2 characters").max(8, "Password must not be above 8 characters"),
    agreement: z.boolean().default(false).optional(),
})

export default function SimpleForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/get-started"
    const [isInputFocused, setInputFocused] = useState(false);

    const SimpleForm = useForm<z.infer<typeof SimpleSchema>>({
        resolver: zodResolver(SimpleSchema),
        defaultValues: {
            password: "",
            agreement: false
        },


    })
    const { formState } = useForm();
    const { isValid, } = formState;


    async function onSubmit(values: z.infer<typeof SimpleSchema>) {
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
        <Form {...SimpleForm}>
            <form
                onSubmit={SimpleForm.handleSubmit(onSubmit)}
                className="w-full rounded-lg pb-[50px] space-y-6 flex flex-col items-center"
            >

                <FormField
                    control={SimpleForm.control}
                    name="FirstName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#777777]">First Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="min-h-[48px]" placeholder="Enter first name" {...field} />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={SimpleForm.control}
                    name="LastName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#777777]">Last Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="min-h-[48px]" placeholder="Enter last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
{/* -----------------date///// */}
           
                <FormField
                    control={SimpleForm.control}
                    name="BusinessName"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-[#777777]">Business name</FormLabel>
                            <FormControl>
                                <Input type="text" className="min-h-[48px]" placeholder="eg oil&gas" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
        {/* ----------text area/// */}
        {/* ----------input type: file/// */}


                <Button
                    disabled={loading}
                    className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    type="submit"
                >
                    Create account
                </Button>
                <Button
                variant={"outline"}
                    disabled={loading}
                    className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
                    type="submit"
                >
                    Create account
                </Button>

            </form>
        </Form>
    )
}

