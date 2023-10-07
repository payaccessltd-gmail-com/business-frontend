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
import PasswordMustInclude from "./PasswordMustInclude"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const ResetPasswordSchema = z.object({
  password: z.string().min(2, "Password must contain more than 2 characters").max(8, "Password must not be above 8 characters"),
  confirmPassword: z.string().min(2, "Password must contain more than 2 characters").max(8, "Password must not be above 8 characters"),
}).refine((data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

export default function ResetForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/get-started"
  const [isInputFocused, setInputFocused] = useState(false);

  const resetPasswordForm = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },


  })

  const handleInputFocus = () => {
    setInputFocused(true);
  };


  type ruleDataType = {
    id: number;
    text: string;
    re: RegExp;
  }[];

  const ruleData: ruleDataType = [

    { re: /[A-Z]/, id: 2, text: 'Upper Case' },
    { re: /[a-z]/, id: 4, text: 'Lower Case' },
    { re: /[0-9]/, id: 3, text: 'Numeric' },
    { re: /[!@#$%^&*]/, id: 1, text: 'Special character' },
  ];


  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
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
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[24px] flex flex-col items-center"
      >
        <FormField
          control={resetPasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Enter password</FormLabel>
              <FormControl>
                <Input type="password" icon="show"  onFocus={handleInputFocus} className="min-h-[48px]" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isInputFocused ? <div className="w-full mt-[8px] flex flex-col items-start gap-2">
          <p className="text-[14px] font-[400] leading-[145%] text-[#777777]">Password must contain</p>
          <div
            className="flex flex-row items-center flex-wrap gap-3"
          >
            {ruleData.map(({ id, text, re }) => {
              return (
                <PasswordMustInclude
                  key={id}
                  text={text}
                  match={re.test(resetPasswordForm.watch("password"))}
                />
              );
            })}
          </div>
        </div> : null}
        <FormField
          name="confirmPassword"
          control={resetPasswordForm.control}
          render={({ field }) => (
            <FormItem className="w-full mt-6">
              <FormLabel className="text-[#777777]">Confirm password</FormLabel>
              <FormControl>
                <Input type="password" icon="show" className="min-h-[48px]" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </Form>
  )
}
