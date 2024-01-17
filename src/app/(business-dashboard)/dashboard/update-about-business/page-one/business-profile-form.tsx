"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as zod from "zod"

// import { Button } from "components/ui/Button/Button"
import { Button } from "components/ui/button"
import { Checkbox } from "components/ui/checkbox"
import { getMerchantByMerchantCode, updateAboutBusiness } from "api/merchant-management"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"

import { useToast } from "components/ui/use-toast"
import { useHydrateStore, useMerchantStore } from "store"
import { useState } from "react"

// export const metadata: Metadata = {
//   title: "Business",
//   description: "Business page as it should be",
// }

const businessProfileFormSchema = zod.object({
  businessCategory: zod.string(),
 
  businessType: zod.string(),
  softwareDeveloper: zod.string(), 
  merchantId: zod.number(),
  // mobileNumber: zod.string(),
  policy: zod.boolean().refine(value => value === true, {
    message: "You must consent to the policy.",
  }),
})

export default function BusinessProfileUpdate() {
  let token = "" 
  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    token = localStorage.getItem("token") as string
  }
  const router = useRouter()
  const { toast } = useToast()
  const currentMerchant = useHydrateStore(useMerchantStore, (state) => state.currentMerchant) 
  //@ts-expect-error
  const currentMerchantDetails = useHydrateStore(useMerchantStore, (state) => state.user)
  const { setCurrentMerchantDetails } = useMerchantStore();
console.log(currentMerchantDetails,'jk'); 

  const businessProfileForm = useForm<zod.infer<typeof businessProfileFormSchema>>({
    defaultValues: {
      merchantId: 0,
      policy: false,
    },
    resolver: zodResolver(businessProfileFormSchema),
  })
 

  const businessProfileMutation = useMutation({
    mutationFn: (values: API.UpdateAboutBusinessDTO) => updateAboutBusiness(values, token),
    onSuccess: async (data) => {
      const responseData: API.StatusReponse = (await data.json()) as API.StatusReponse
      console.log("data", data);

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      } else if (responseData?.statusCode === "0" && typeof window) {
 
        if (businessProfileForm.getValues('businessType') === 'REGISTERED_BUSINESS' || businessProfileForm.getValues('businessType') === 'NGO_BUSINESS') {
          router.push("/dashboard/registered-business")
          businessProfileForm.reset()
          return
        }
      //  router.push("/dashboard/update-about-business/page-three")
 
        // useQuery({
        //   queryKey: ["merchant-details", currentMerchant?.merchantCode],
        //   queryFn: () =>
        //     getMerchantByMerchantCode(currentMerchant?.merchantCode as string, token),
        //   enabled: currentMerchant?.merchantCode ? true : false,
        //   onSuccess: async (data) => {
        //     const res = (await data.json()) as API.GetMerchantByMerchantCodeDTO;
        //     console.log(res, 'Youz');

        //     if (res.statusCode === "0") {
        //       setCurrentMerchantDetails(res.responseObject[0]);
        //       if (businessProfileForm.getValues('businessType') === 'REGISTERED_BUSINESS' || businessProfileForm.getValues('businessType') === 'NGO_BUSINESS') {
          
        //         router.push("/dashboard/registered-business")
        //         businessProfileForm.reset()
        //         return
        //       }
        //     }
        //   },
        // });
       
        businessProfileForm.reset()
        router.push("/dashboard/registered-business")

        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
        })
      } else {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      }
    },

    onError: (e: any) => {
      toast({
        variant: "destructive",
        title: "",
        description: e,
      })
    },
  })

  function onSubmit(values: zod.infer<typeof businessProfileFormSchema>) {

    let data: API.UpdateAboutBusinessRequest = {
      ...values,
          
    }
    console.log('data', data);
    
    businessProfileMutation.mutate(data)
  }


  return (
    <main className="flex flex-col items-center justify-center bg-transparent">
      <div className="flex w-[550px] flex-col items-center justify-center  bg-transparent ">
   
        <Form {...businessProfileForm}>
          <form onSubmit={businessProfileForm.handleSubmit(onSubmit)} className="space-y-12 bg-white">
            <div className="space-y-8">
              
              <FormField
                name="businessCategory"
                control={businessProfileForm.control}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-sm font-normal text-gray-50">Business category</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)
                        businessProfileForm.setValue("merchantId", currentMerchant?.id as number, { shouldDirty: true })
                      }}
                    >
                      <FormControl className="px-3 py-3 mt-20 shadow-none border-gray-20">
                        <SelectTrigger>
                          <SelectValue placeholder="Select business category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className="py-3 " value="TRANSPORTATION">
                          Transportation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
 
              {/* <Label className="text-sm font-normal text-gray-50">Phone Number</Label>

              <PatternFormat
                format="+234 (####) ###-####"
                className="w-full p-3 border mb-5 border-blue-400 rounded-[5px] focus-visible:border-blue-400"
                valueIsNumericString={true}
              /> */}
              {/* <div className="mb-6">
                <div>
                  <label className="">Phone Number</label>
                </div>
                <PatternFormat
                  onChange={(event) => setPhoneNumber(event as any)}
                  format="+234 (####) ###-####"
                  className="w-full p-3 border mt-3 mb-5 border-blue-400 rounded-[5px] focus-visible:border-blue-400"
                  isNumericString={true}
                />
              </div> */}

              {/* <FormField
                control={businessProfileForm.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-normal text-gray-50">Business Name</FormLabel>
                    <FormControl>
                      <Input type="text" icon="show" className="min-h-[48px]" placeholder="Enter business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
 
              <FormField
                control={businessProfileForm.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-normal text-gray-50">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="number" icon="show" className="min-h-[48px]" placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessProfileForm.control}
                name="merchantId"
                defaultValue={currentMerchant?.id}
                render={({ field }) => (
                  <FormItem className="hidden w-full">
                    <FormLabel className="text-sm font-normal text-gray-50">Merchant ID</FormLabel>
                    <FormControl>
                      <Input type="number" icon="show" className="min-h-[48px]" placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="businessType"
                control={businessProfileForm.control}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-sm font-normal text-gray-50 ">What kind of business do you own</FormLabel>

                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                        <FormItem className="flex items-baseline space-x-4 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="INDIVIDUAL" />
                          </FormControl>
                          <div className="space-y-2">
                            <FormLabel className="text-sm font-normal text-gray-80">Starter/individaul business</FormLabel>
                            <FormDescription>
                              I am testing my ideas with real customers, and preparing to <br /> register my company
                            </FormDescription>
                          </div>
                        </FormItem>

                        <FormItem className="flex items-baseline space-x-4 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="NGO_BUSINESS" />
                          </FormControl>
                          <div className="space-y-2">
                            <FormLabel className="text-sm font-normal text-gray-80">NGO Business</FormLabel>
                            <FormDescription>
                              I'm testing my ideas with real customers, and preparing to <br /> register my company
                            </FormDescription>
                          </div>
                        </FormItem>

                        <FormItem className="flex items-baseline space-x-4 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="REGISTERED_BUSINESS" />
                          </FormControl>
                          <div className="space-y-2">
                            <FormLabel className="text-sm font-normal text-gray-80">Registered business</FormLabel>
                            <FormDescription>
                              My business has the approval, documentation, and <br />
                              licences required to operate legally
                            </FormDescription>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessProfileForm.control}
                name="softwareDeveloper"
                render={({ field }) => (
                  <FormItem className="space-y-7">
                    <FormLabel className="text-sm font-normal text-gray-50">Are you a software developer?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-6">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"true"} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-gray-80">Yes i am</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={"false"} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-gray-80">No I am not</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={businessProfileForm.control}
                name="policy"
                render={({ field }) => (
                  <>
                    <FormItem className="flex flex-row items-start space-x-4 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange as any} />
                      </FormControl>
                      <div className=" leading-none">
                        <FormDescription className="text-sm font-normal text-gray-50 ">
                          I consent to the collection and processing of my personal data in line with data regulations as described in{" "}
                          <Link href="/examples/forms" className="text-base font-bold underline active:text-secondary-60 text-primary-50">
                            Pay Access Policy
                          </Link>
                        </FormDescription>
                      </div>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />
            </div>

            <Button disabled={businessProfileMutation.isLoading} className="flex self-center w-56 mx-auto font-bold" type="submit" size="lg">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}