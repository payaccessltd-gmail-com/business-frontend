"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import * as zod from "zod"
import { useForm } from "react-hook-form"

import { updateBusinessBankData } from "api/registration"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"

const accInfoFormSchema = zod.object({
  merchantId: zod.number(),
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
  const acctInfoForm = useForm<zod.infer<typeof accInfoFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(accInfoFormSchema),
  })

  const updateBusinessBankDataMutation = useMutation({
    mutationFn: updateBusinessBankData,
    onSuccess: () => {
      return null
    },
    onMutate: () => {
      return null
    },
  })

  const onSubmit = (values: zod.infer<typeof accInfoFormSchema>) => {
    updateBusinessBankDataMutation.mutate(values)
  }

  return (
    <Form {...acctInfoForm}>
      <form onSubmit={acctInfoForm.handleSubmit(onSubmit)} className="space-y-8 border-gray-10 p-8 shadow-form">
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

        <div className="flex flex-row">
          <FormField
            name="businessBankName"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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

        <Button className="w-[380]" type="submit" size="default">
          Save
        </Button>
      </form>
    </Form>
  )
}
