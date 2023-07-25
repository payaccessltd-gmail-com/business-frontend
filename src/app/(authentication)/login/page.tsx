"use client"

import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "lib/utils"
import { loginApi } from "api/login"
import { useLazyQuery } from "hooks/useLazyQuery"
import { buttonVariants } from "components/ui/button"
import { Button } from "components/ui/button"
import { Typography } from "components/ui/Typography"
import { logoPath, login, loginBackground } from "lib/constants"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useQuery } from "@tanstack/react-query"

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export default function AuthenticationPage() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
    },
  })

  const loginAuth = useQuery({
    queryKey: ["login"],
    queryFn: (body) => loginApi(body),
    enabled: false,
  })

  // const [loginAuthLazy, queryAuth] = useLazyQuery(["login"],(body) => loginApi(body))

  function onSubmit(values: z.infer<typeof loginFormSchema>) {}

  return (
    <div className="flex h-full w-full flex-row ">
      <div className="hidden h-full w-1/2 lg:flex ">
        <Image className="h-full w-full" src={login.src} alt={login.alt} />
      </div>
      <div className="relative h-full w-full lg:w-1/2">
        <Image
          className="absolute left-0 top-0 z-0 h-full w-full"
          src={loginBackground.src}
          alt={loginBackground.alt}
        />
        <div className="flex h-full w-full flex-row items-center justify-center">
          <div className="z-10 flex w-[330px] flex-col items-center sm:w-[468px]">
            <Image className="mb-8" src={logoPath.src} width={140} height={60} alt={logoPath.alt} />
            <Typography className="mb-4  inline-block bg-transparent" level="h1">
              Welcome back!
            </Typography>
            <Typography className="mb-8 inline-block text-center text-[#115570]" level="h6">
              Please provide the information to access your dashboard.
            </Typography>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="w-full rounded-lg bg-white px-[40px] py-[32px] shadow-form"
              >
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#777777]">Username</FormLabel>
                      <FormControl>
                        <Input className="min-h-[48px]" placeholder="Enter your user name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-[25px]">
                      <FormLabel className="text-[#777777]">Enter password</FormLabel>
                      <FormControl>
                        <Input className="min-h-[48px]" placeholder="Password" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-[42px] min-h-[48px] w-full hover:bg-[#1D8EBB] hover:opacity-[0.4]" type="submit">
                  Login
                </Button>
              </form>
            </Form>
            <Link href="/" className="mt-[32px] text-sm font-semibold text-primary-70">
              Forget Password
            </Link>
            <div className="mt-4 flex flex-row items-center gap-2">
              {" "}
              <Typography className=" inline-block  bg-transparent text-[#0C394B]" level="h4">
                New to pay access?
              </Typography>
              <Link href="/registration" className=" text-sm font-semibold text-primary-70">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
