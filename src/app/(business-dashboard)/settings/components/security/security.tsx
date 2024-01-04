"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useQuery } from "@tanstack/react-query"
import { updateSecurity } from "api/settings"
import { getUserInfo } from "api/settings"
import { useMutation } from "@tanstack/react-query"

import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "components/ui/form"
import { useToast } from "components/ui/use-toast"

let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""

if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}

const FormSchema = z.object({
  option1: z.boolean(),
  option2: z.boolean(),
})

export default function Security({ data, security, setSecurity }: any) {
  const { toast } = useToast()

  const getParameters = {
    token,
    merchantCode: merchantList[0]?.merchantCode,
  }
  const data2: any = useQuery(["getUserInfo", token], () => getUserInfo(token))

  // console.log(data2?.data?.responseObject?.twoFactorAuthForLogin)
  console.log(data2?.data?.responseObject, "data2 security")

  // console.log(data?.twoFactorAuthForPaymentAndTransfer)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      option1: data2?.data?.responseObject?.twoFactorAuthForLogin,
      option2: data?.twoFactorAuthForPaymentAndTransfer,
    },
  })

  const securityUpdateMutation = useMutation({
    mutationFn: updateSecurity,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse = (await data.json()) as API.InvoiceStatusReponse
      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: "Error updating security",
        })
      }
      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: "Security settings updated",
          className: "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        })
      }
    },
    onError: (e) => {
      console.log(e)
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      })
    },
  })

  const handleUpdate = () => {
    // console.log(form.getValues())
    let newValues = {
      twoFactorAuthForPaymentAndTransfer: form.getValues("option2"),
      twoFactorAuthForLogin: form.getValues("option1"),
      token: token,
      merchantId: merchantId,
    }
    // console.log(newValues);
    securityUpdateMutation.mutate(newValues as any)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="w-[60%] mb-5 p-[24px] rounded-[10px] flex flex-col gap-[14px] items-start bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
      >
        {data2?.data?.responseObject?.twoFactorAuthForLogin ? (
          <FormField
            control={form.control}
            name="option1"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    defaultChecked={data2?.data?.responseObject?.twoFactorAuthForLogin}
                    checked={field.value}
                    onCheckedChange={field.onChange as any}
                    onClick={() => {
                      handleUpdate()
                    }}
                    className="w-[20px] h-[20px]"
                  />
                </FormControl>
                <div className="flex flex-col items-start ">
                  <div className="flex flex-col items-start gap-1">
                    <FormLabel className="text-[14px] font-[600]">Two factor authentication for login</FormLabel>
                    <FormDescription className="text-[14px] text-[#555555] font-[400]">
                      Requires two factor authtication anything you log in
                    </FormDescription>
                  </div>
                </div>
              </FormItem>
            )}
          />
        ) : (
          ""
        )}
        <FormField
          control={form.control}
          name="option2"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange as any}
                  onClick={() => {
                    handleUpdate()
                  }}
                  className="w-[20px] h-[20px]"
                />
              </FormControl>
              <div className="flex flex-col items-start ">
                <div className="flex flex-col items-start gap-1">
                  <FormLabel className="text-[14px] font-[600]">Two factor authentication for payment and transfer</FormLabel>
                  <FormDescription className="text-[14px] text-[#555555] font-[400]">Email my customers for every transactions</FormDescription>
                </div>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
