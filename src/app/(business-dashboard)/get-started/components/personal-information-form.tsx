"use client"

import { DevTool } from "@hookform/devtools"
// import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { LuCalendar } from "react-icons/lu"
import * as zod from "zod"

import { updateMerchantBioData } from "api/registration"
import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Typography } from "components/ui/Typography"
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
                <FormLabel className="text-[#555555]">First name</FormLabel>
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
                <FormLabel className="text-[#555555]">Last name</FormLabel>
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
                <FormLabel className="text-[#555555]">Gender</FormLabel>
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
                <FormLabel className="w-full text-[#555555]">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex flex-row items-center justify-start font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <LuCalendar className="mr-2" />
                        {field.value ? format(field.value, "PPP") : <span>DD/MM/YY</span>}
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
              <FormLabel className="text-[#555555]">Identification Document</FormLabel>
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
              <FormLabel className="text-[#555555]">Identification Number</FormLabel>
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
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography level="p" className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                </Typography>
              </FormLabel>
              <FormControl>
                <Input className="hidden" placeholder="Enter identification number" {...field} type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={updateMerchantBioDataMutation.isLoading}
          className="h-[48px] w-[70%] self-center"
          type="submit"
          size="default"
        >
          Save
        </Button>
      </form>
      <DevTool control={personalInfoForm.control} />
    </Form>
  )
}
