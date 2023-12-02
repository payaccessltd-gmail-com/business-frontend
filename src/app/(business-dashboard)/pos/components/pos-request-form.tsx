"use client"

import { ScrollArea } from "components/ui/scroll-area"
import React from "react"
import { MdClose } from "react-icons/md"
// import NameValue from "./name-value-widget";
import { Button } from "components/ui/button"
import { useToast } from "components/ui/use-toast"
import { z } from "zod"
import { useForm } from "react-hook-form" 

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form" 
import { Input } from "components/ui/input" 
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"

const posSchem = z.object({
  quantity: z.number(),
  terminalBrand: z.string(),
  merchantId: z.number(),
  terminalType: z.string(),
  iAgree: z.boolean(),
})

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const POSRequestForm = ({ handleModalPOSpopup }: any) => {
  const { toast } = useToast()

  const posForm = useForm<z.infer<typeof posSchem>>({
    resolver: zodResolver(posSchem),
  })

  return (
    <div className="z-10 w-full h-full  fixed top-0 left-0 flex flex-col items-center bg-[#828B8E85] ">
      <ScrollArea className="w-full h-full ">
        <div className="flex flex-col items-center w-full  h-full pb-6 mt-[50px]">
          <div className="relative rounded-[25px] w-[550px] bg-[#fff] px-[25px] pt-[28px] pb-[119px] flex flex-col ">
            <div className="w-full mt-0">
              <div className="flex flex-col    w-full pb-6  ">
                <MdClose
                  onClick={() => handleModalPOSpopup()}
                  className="absolute top-[24px] right-[26px] text-[20px] text-[#F61212] cursor-pointer"
                />
                <div className="flex flex-col items-start w-full">
                  <p className="text-[16px] text-[#5C5F61] font-[700] leading-normal">Request POS Terminal</p>

                  <p className=" text-[#177196]    leading-normal">Complete and enter the following form below</p>
                </div>
              </div>
            </div>
            
            <div className="w-full py-1 flex flex-col relative items-center">
              <Form {...posForm}>
                <form className="w-full rounded-lg pb-[50px] space-y-3 flex flex-col items-center">
                  <FormField
                    name="merchantId"
                    control={posForm.control}
                    disabled={true}
                    // defaultValue={currentMerchant?.id}
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

   
<div className="flex flex-row items-end w-full gap-6">
              <FormField
                control={posForm.control}
                name="merchantId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                      Discount
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[#A1CBDE] min-h-[48px] bg-transparent">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Percentage"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Percentage">Percentage</SelectItem>
                        <SelectItem value="wholeValue">Value</SelectItem> 
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
</div>
                  <FormField
                    name="merchantId"
                    control={posForm.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>BVN</FormLabel>
                        <FormControl>
                          <Input title="Input is only number" pattern="[0-9]*" type="number" maxLength={11} placeholder="Enter BVN" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="merchantId"
                    control={posForm.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input type="number" pattern="[0-9]*" maxLength={11} placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="merchantId"
                    control={posForm.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input type="number" pattern="[0-9]*" maxLength={11} placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="merchantId"
                    control={posForm.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input type="number" pattern="[0-9]*" maxLength={11} placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="merchantId"
                    control={posForm.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Account name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter account name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <div className="flex flex-col items-center w-full gap-3 pt-10">
                <Button onClick={() => handleModalPOSpopup()} className="min-h-[48px] font-[700] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default POSRequestForm
