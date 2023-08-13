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

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/get-started"
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true)

      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl,
      })

      setLoading(false)

      if (!res?.error) {
        router.push(callbackUrl)
      } else {
        toast({
          variant: "destructive",
          title: "invalid email or password",
          description: "Please confirm if user is registered",
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: error,
        description: error,
      })
    }
  }

  return (
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
        <Button
          disabled={loading}
          className="mt-[42px] min-h-[48px] w-full hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
