"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { paymentSettings } from "api/settings"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "components/ui/use-toast"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { toast } from "components/ui/use-toast"

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
  enableAcceptBankTransfers: z.boolean(),
  enableAcceptPOSChannel: z.boolean(),
  enableAcceptCardPayment: z.boolean(),
  enableAcceptMobileMoneyTransfer: z.boolean(),
  enableUSSDTransfer: z.boolean(),
  defaultCurrency: z.string(),
})

export default function Payment({ data, security, setSecurity }: any) {
  console.log(data?.enableAcceptPosChannel)
  console.log(data?.enableUssdTransfer)

  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      enableAcceptBankTransfers: data?.enableAcceptBankTransfers,
      enableAcceptPOSChannel: data?.enableAcceptPosChannel,
      enableAcceptCardPayment: data?.enableAcceptCardPayment,
      enableAcceptMobileMoneyTransfer: data?.enableAcceptMobileMoneyTransfer,
      enableUSSDTransfer: data?.enableUssdTransfer,
      defaultCurrency: data?.defaultCurrency,
    },
  })

  const getParameters = {
    token,
    merchantCode: merchantList[0]?.merchantCode,
  }
  // const data: any = useQuery(['getMerchantDetails', getParameters], () => getMerchantDetails(getParameters));

  // console.log(data?.customerNotificationByEmail)

  // console.log(data)

  const paymentSettingsMutation = useMutation({
    mutationFn: paymentSettings,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse = (await data.json()) as API.InvoiceStatusReponse
      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: "Error updating payment settings",
        })
      }
      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: "Payment settings updated",
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

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values)
    let newValues = {
      ...values,
      token: token,
      merchantId: merchantId,
    }
    // console.log(newValues);
    paymentSettingsMutation.mutate(newValues as any)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[60%] mb-5 p-[24px] rounded-[10px] flex flex-col gap-[36px] items-start bg-white shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]"
      >
        <div className="flex flex-row items-start gap-[125px]">
          <p className="text-[black] text-[14] font-[400] leading-[145%]">Default currency</p>
          <FormField
            control={form.control}
            name="defaultCurrency"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-[10px] min-h-[56px] bg-[#F2FAFD] border-none w-[84px]">
                      <SelectValue defaultValue={field.value} placeholder={data?.defaultCurrency} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent defaultValue={data?.defaultCurrency}>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="+233">+233</SelectItem>
                    <SelectItem value="+212">+212</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row items-start gap-[97px]">
          <p className="text-[black] text-[14] font-[400] leading-[145%]">Accept payment via</p>
          <div className="flex flex-col items-start gap-4">
            <FormField
              control={form.control}
              name="enableAcceptBankTransfers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange as any} className="w-[20px] h-[20px]" />
                  </FormControl>
                  <div className="flex flex-col items-start ">
                    <FormLabel className="text-[14px] font-[400]">Bank account</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableAcceptPOSChannel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange as any} className="w-[20px] h-[20px]" />
                  </FormControl>
                  <div className="flex flex-col items-start ">
                    <FormLabel className="text-[14px] font-[400]">POS</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableAcceptCardPayment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange as any} className="w-[20px] h-[20px]" />
                  </FormControl>
                  <div className="flex flex-col items-start ">
                    <FormLabel className="text-[14px] font-[400]">Cards</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableAcceptMobileMoneyTransfer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange as any} className="w-[20px] h-[20px]" />
                  </FormControl>
                  <div className="flex flex-col items-start ">
                    <FormLabel className="text-[14px] font-[400]">Phone transfer</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableUSSDTransfer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange as any} className="w-[20px] h-[20px]" />
                  </FormControl>
                  <div className="flex flex-col items-start ">
                    <FormLabel className="text-[14px] font-[400]">USSD</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="self-center mb-14 rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
        >
          Update
        </Button>
      </form>
    </Form>
  )
}
