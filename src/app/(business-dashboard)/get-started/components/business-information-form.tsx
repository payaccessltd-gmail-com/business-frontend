"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"

import { createMerchant } from "api/registration"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Textarea } from "components/ui/textarea"

const accInfoFormSchema = zod.object({
  businessName: zod.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),

  primaryMobile: zod.string(),
  supportContact: zod.string(),

  businessState: zod.string(),
  businessCity: zod.string(),
  businessEmail: zod.string().email(),
  businessWebsite: zod.string().url(),
  businessLogo: zod.string(),
  businessCertificate: zod.string(),
  businessDescription: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
})

export default function BusinessInformationForm() {
  const acctInfoForm = useForm<zod.infer<typeof accInfoFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(accInfoFormSchema),
  })

  const onSubmit = (values: zod.infer<typeof accInfoFormSchema>) => {
    // merchantRegMutation.mutate(values)
    console.log(values)
  }

  return (
    <Form {...acctInfoForm}>
      <form onSubmit={acctInfoForm.handleSubmit(onSubmit)} className="space-y-8 border-gray-10 p-8">
        <FormField
          name="businessName"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Business name</FormLabel>
              <FormControl>
                <Input placeholder="Enter business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={acctInfoForm.control}
          name="businessDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us a little bit about yourself" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessEmail"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business email</FormLabel>
              <FormControl>
                <Input placeholder="Enter business email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center gap-4">
          <FormField
            name="primaryMobile"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Business mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter businesss mobile number" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="supportContact"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Support</FormLabel>
                <FormControl>
                  <Input placeholder="Enter support number/email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <FormField
            name="businessCity"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="businessState"
            control={acctInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="ABUJA">Abuja</SelectItem>
                    <SelectItem value="LAGOS">Lagos</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="businessWebsite"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business website</FormLabel>
              <FormControl>
                <Input placeholder="Business website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessLogo"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business logo (optional)</FormDescription>
              <FormControl>
                <Input placeholder="Drag file here to upload document or choose file" {...field} type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessCertificate"
          control={acctInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business Certificate</FormDescription>
              <FormControl>
                <Input placeholder="Drag file here to upload document or choose file" {...field} type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" size="default">
          Save
        </Button>
      </form>
    </Form>
  )
}
