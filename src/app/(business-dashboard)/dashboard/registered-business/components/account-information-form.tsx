"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as zod from "zod"

import { updateMerchantBusinessBankAccountData } from "api/merchant-management"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"

const accInfoFormSchema = zod.object({
  merchantId: zod.number(),
  emailAddress: zod.string().email(),
  businessBvn: zod.string(),
  businessBankName: zod.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  businessAccountNumber: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  businessAccountName: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
})

export default function AccountInformationForm() {
  let token = ""
  const acctInfoForm = useForm<zod.infer<typeof accInfoFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(accInfoFormSchema),
  })

  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    token = localStorage.getItem("token") as string
  }

  const updateBusinessBankDataMutation = useMutation({
    mutationFn: (values: API.UpdateMerchantBankAccountDataDTO) => updateMerchantBusinessBankAccountData(values, token),
    onSuccess: (data, variables, context) => {
      console.log({ data, variables, context })
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context })
    },
    onMutate: () => {
      return null
    },
  })

  const onSubmit = (values: zod.infer<typeof accInfoFormSchema>) => {
    updateBusinessBankDataMutation.mutate(values as any)
  }

  return (

    <Form {...acctInfoForm}>
      <form onSubmit={acctInfoForm.handleSubmit(onSubmit)} className="space-y-2 border-gray-10 w-full">
        <FormField
          name="merchantId"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>BVN</FormLabel>
              <FormControl>
                <Input placeholder="Enter BVN" {...field} />
              </FormControl>

              <FormDescription>To get your BVN dial *565*0# on your registered mobile number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessBvn"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>BVN</FormLabel>
              <FormControl>
                <Input placeholder="Enter BVN" {...field} />
              </FormControl>

              <FormDescription>To get your BVN dial *565*0# on your registered mobile number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-row gap-[44px]">
          <FormField
            name="businessBankName"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bank name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Enter bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="firstbank">First Bank</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="businessAccountNumber"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="businessAccountName"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account name</FormLabel>
              <FormControl>
                <Input placeholder="Enter account name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center  justify-center my-20">
          <Button
            // disabled={updateMerchantBioDataMutation.isLoading}
            className="h-[48px] w-[50%]"
            type="submit"
            size="default"
          >
            Save and Continue
          </Button>
        </div>
      </form>
    </Form>

  )
}
