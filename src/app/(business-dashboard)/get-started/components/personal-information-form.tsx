"use client"

import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as zod from "zod"

import { updateMerchantBioData } from "api/registration"
import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"

import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { useToast } from "components/ui/use-toast"
import { cn } from "lib/utils"

const personalInfoFormSchema = zod.object({
  emailAddress: zod.string().email(),
  country: zod.string(),
  firstName: zod.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  gender: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  dateOfBirth: zod.date({
    required_error: "A date of birth is required.",
  }),

  identificationNumber: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  identificationDocument: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  identificationDocumentPath: zod.string(),
})

export default function PersonalInformationForm() {
  const { toast } = useToast()
  const personalInfoForm = useForm<zod.infer<typeof personalInfoFormSchema>>({
    // resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      emailAddress: localStorage.getItem("email") || (localStorage.getItem("email") as string),
    },
  })

  const updateMerchantBioDataMutation = useMutation({
    mutationFn: updateMerchantBioData,
    onSuccess: async (data) => {
      const res: { statusCode: string; message: string } = (await data.json()) as {
        statusCode: string
        message: string
      }

      if (res.statusCode === "403") {
        toast({ variant: "destructive", title: res.statusCode, description: res.message })
      }
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context })
    },
    onMutate: () => {
      return null
    },
  })

  const onSubmit = (values: zod.infer<typeof personalInfoFormSchema>) => {
    const emailAddress = localStorage.getItem("email") || (localStorage.getItem("email") as string)
    const updatedData = { ...values, emailAddress: emailAddress }
    updateMerchantBioDataMutation.mutate(updatedData)
  }

  return (
    <Form {...personalInfoForm}>
      <form
        id="personalInformation"
        onSubmit={personalInfoForm.handleSubmit(onSubmit)}
        className="space-y-8 border-gray-10 p-8"
      >
        <FormField
          name="emailAddress"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4">
          <FormField
            name="firstName"
            control={personalInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={personalInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <FormField
            name="gender"
            control={personalInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={personalInfoForm.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="w-full">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 5C4.44772 5 4 5.44772 4 6V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V6C20 5.44772 19.5523 5 19 5H5ZM2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V6Z"
                            fill="#07222D"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 1C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V2C15 1.44772 15.4477 1 16 1Z"
                            fill="#07222D"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 1C8.55228 1 9 1.44772 9 2V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V2C7 1.44772 7.44772 1 8 1Z"
                            fill="#07222D"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 10C2 9.44772 2.44772 9 3 9H21C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H3C2.44772 11 2 10.5523 2 10Z"
                            fill="#07222D"
                          />
                        </svg>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onSelect={field.onChange as any}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="identificationDocument"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identification Document</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select identification document" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="driversLicenses">Drivers lincenses</SelectItem>
                  <SelectItem value="NATIONAL_ID">National ID</SelectItem>
                  <SelectItem value="INTL_PASSPORT">International passport</SelectItem>
                  <SelectItem value="VOTERS_CARD">Voter&apos;`s card</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="identificationNumber"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identification Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter identification number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Please upload identification document.</FormDescription>
              <FormControl>
                <Input placeholder="Enter identification number" {...field} type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={updateMerchantBioDataMutation.isLoading} className="w-full" type="submit" size="default">
          Save
        </Button>
      </form>

      <DevTool control={personalInfoForm.control} />
    </Form>
  )
}
