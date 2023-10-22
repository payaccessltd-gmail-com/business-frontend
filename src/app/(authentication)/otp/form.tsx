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

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const ForgetPasswordSchema = z.object({
  otp: z.number()
})

export default function OTPForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/get-started"
  const [otp, setOtp] = useState(Array(4).fill(""));



  const handleChange = (index: any, event: any) => {
    const value = event.target.value;
    if (isNaN(value)) {
      // Only allow numbers
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to the next input field
    if (index < 3 && value) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    // field.onChange
  };

  const handlePaste = (event: any) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    if (pasteData.length === 4 && !isNaN(pasteData)) {
      setOtp(pasteData.split(""));
    }
  };

  const otpForm = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      otp: undefined,
    },

  })
  console.log(otp)

  async function onSubmit(values: z.infer<typeof ForgetPasswordSchema>) {
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
    <Form {...otpForm}>
      <form
        onSubmit={otpForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[24px] flex flex-col items-center"
      >
        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col items-center">
              <FormLabel className="text-[#0C394B] mb-4 text-[14px] text-center font-[700] leading-normal">Enter OTP code</FormLabel>
              <FormControl>
                {/* <Input className="min-h-[48px]" placeholder="Enter your email address" {...field} /> */}
                <div className="flex flex-row items-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={
                        (event) => handleChange(index, event)
                      }
                      onPaste={(event) => handlePaste(event)}
                      className="bg-[#FFFFFF] border text-center border-[#D3EEF9] border-solid h-12 w-12"
                    // {...field}
                    />
                  ))}</div>

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
