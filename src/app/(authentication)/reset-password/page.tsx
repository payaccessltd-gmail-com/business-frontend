"use client"

// import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "lib/utils"
import { buttonVariants } from "components/ui/button"
import { logoPath, login, loginBackground } from "lib/constants"
import { Typography } from "components/ui/Typography"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useForm } from "react-hook-form"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const resetPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export default function AuthenticationPage() {
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    console.log(values)
  }
  return (
    <div className="relative h-full w-full ">
      <Image className="absolute left-0 top-0 z-0 h-full w-full" src={loginBackground.src} alt={loginBackground.alt} />
      <div className="flex h-full w-full flex-row items-center justify-center">
        <div className="z-10 flex w-[330px] flex-col items-center sm:w-[468px]">
          <Image className="mb-8" src={logoPath.src} width={140} height={60} alt={logoPath.alt} />
          <Typography className="mb-4  inline-block bg-transparent" level="h1">
            Reset password
          </Typography>
          <Typography className="mb-8 inline-block text-center text-[#115570]" level="h6">
            To reset your password pls provide the following information
          </Typography>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center rounded-lg bg-white px-[40px] py-[32px] shadow-form"
            >
              <FormField
                control={resetPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#777777]">Email address</FormLabel>
                    <FormControl>
                      <Input className="min-h-[48px]" placeholder="Enter your email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mt-[24px] min-h-[48px] w-[100%] hover:bg-[#1D8EBB] hover:opacity-[0.4] sm:w-[290px]"
                type="submit"
              >
                Proceed
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
