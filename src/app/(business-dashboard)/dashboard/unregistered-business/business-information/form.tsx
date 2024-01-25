"use client"

import { DevTool } from "@hookform/devtools"
import * as zod from "zod"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { useForm } from "react-hook-form"

// import {} from "api/registration";
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Typography } from "components/ui/Typography"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Textarea } from "components/ui/textarea"
import { useToast } from "components/ui/use-toast"
import { useHydrateStore, useMerchantStore } from "store"
import { updateMerchantBusinessData } from "api/merchant-management"
import { getAllState, getCountry } from "api/location"

type BusinessInfoFormProps = {
  prevStep?: () => void
  nextStep?: () => void
}



const businessInfoFormSchema = zod.object({


  merchantId: zod.number(),
  businessName: zod.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  primaryMobile: zod.string().min(1, {
    message: "feld required",
  }),
  supportContact: zod.string().min(1, {
    message: "feld required",
  }),
  businessState: zod.string(),
  businessCity: zod.string(),
  businessEmail: zod.string().email(),
  businessWebsite: zod.string(),
  businessCountry: zod.string(),
  businessAddress: zod.string(),
  businessLogoFile: zod.custom<File>().optional() || zod.string().optional(),

  businessCertificateFile: zod.custom<File>().optional() || zod.string().optional(),
  // businessCertificate: zod.string(),

  businessDescription: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
})


export default function BusinessInformationForm(props: BusinessInfoFormProps) {
  let token = ""
  const [stateData, setStateData] = useState<any>([]);

  if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
    token = localStorage.getItem("token") as string
  }

  // hideData = true;
  const { toast } = useToast()

  const currentMerchant = useHydrateStore(useMerchantStore, (state) => state.currentMerchant)

  const currentMerchantDetails = useHydrateStore(useMerchantStore, (state) => state.currentMerchantDetails)

  const dataCountry: any = useQuery(['getCountry'], () => {
    return getCountry()
  });

  const countries: API.CountryResponse = dataCountry?.data;


  console.log("dataCountry", countries?.data);


  const businessInfoForm = useForm<zod.infer<typeof businessInfoFormSchema>>({
    defaultValues: {
      ...currentMerchantDetails,
      merchantId: currentMerchant?.id,
    } as any,
    resolver: zodResolver(businessInfoFormSchema),
  })

  function allState(id: number) {
    console.log("id >> ", id);
    
    // let data = useQuery(['getMerchantDetails', id], () => getAllState(id));
    // setStateData(data);
  }

  const updateBusinessInfoMutation = useMutation({
    mutationFn: (values: API.UpdateMerchantBusinessDataDTO) => updateMerchantBusinessData(values, token),
    onSuccess: async (data) => {
      const responseData: API.StatusReponse = (await data.json()) as API.StatusReponse

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        })
      } else if (responseData?.statusCode === "0" && typeof window) {
        businessInfoForm.reset()

        //setEnableEdit(false);
        props.nextStep && props.nextStep()

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
      console.log({ e })
      // toast({
      //   variant: "destructive",
      //   title: "",
      //   description: e,
      // });
    },
  })

  const onSubmit = (values: zod.infer<typeof businessInfoFormSchema>) => {
    if (typeof values.businessLogoFile === "string") {
      values.businessLogoFile = undefined
    }

    // getAllCountry.mutate();
    updateBusinessInfoMutation.mutate(values as any);
  }

  const onErrror = (error: any) => {
    console.log(error)
  }

  useEffect(() => {
    if (currentMerchantDetails) {
      const {
        businessName,
        businessDescription,
        businessEmail,
        supportContact,
        primaryMobile,
        businessCity,
        businessState,
        businessWebsite,
        businessLogo: businessLogoFile,
      } = currentMerchantDetails as API.MerchantDetails
      return businessInfoForm.reset({
        businessName,
        businessDescription,
        businessEmail,
        supportContact,
        primaryMobile,
        businessCity,
        businessState,
        businessWebsite,
        businessLogoFile,
      } as any)
    }
  }, [currentMerchantDetails])

  useEffect(() => {
    if (currentMerchant?.id) {
      businessInfoForm.setValue("merchantId", Number(currentMerchant?.id))
    }
  }, [currentMerchant?.id, currentMerchantDetails])

  return (
    <Form {...businessInfoForm}>
      <form onSubmit={businessInfoForm.handleSubmit(onSubmit, onErrror)} className="flex flex-col space-y-8 border-gray-10">
        {/* merchant id field is hidden but it's value is sent to the api */}
        <FormField
          control={businessInfoForm.control}
          name="merchantId"
          defaultValue={currentMerchant?.id}
          render={({ field }) => (
            <FormItem className="hidden w-full">
              <FormLabel className="text-sm font-normal text-gray-50">Merchant ID</FormLabel>
              <FormControl>
                <Input type="number" icon="show" className="min-h-[48px]" placeholder="Enter phone number" {...field} value={currentMerchant?.id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessName"
          control={businessInfoForm.control}
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
          control={businessInfoForm.control}
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
          control={businessInfoForm.control}
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
            control={businessInfoForm.control}
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
            control={businessInfoForm.control}
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
            name="businessCountry"
            control={businessInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent   >
                    <SelectItem value=""></SelectItem>
                    {countries?.data.map(ctr => <SelectItem onChange={() => allState(ctr.id)} key={ctr.name} className="py-3 " value={ctr.name}>
                      {ctr.name}
                    </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            name="businessState"
            control={businessInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange}
                  defaultValue={field.value}


                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full" onSelect={(target) => { console.log("working"); }} >
                    <SelectItem value="ABUJA">Abuja</SelectItem>
                    <SelectItem value="LAGOS">Lagos</SelectItem>
                    <SelectItem value="Minna">MInna</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="businessCity"
          control={businessInfoForm.control}
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
          name="businessAddress"
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Business Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessWebsite"
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business website (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessLogoFile"
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business Logo (Optional)</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : typeof field.value === "string" ? (
                    (field.value as any)
                  ) : (
                    <>
                      Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  name={field.name}
                  className="hidden"
                  onBlur={field.onBlur}
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessCertificateFile"
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business Certificate (Optional)</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : typeof field.value === "string" ? (
                    (field.value as any)
                  ) : (
                    <>
                      Drag file here to upload document or <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  name={field.name}
                  className="hidden"
                  onBlur={field.onBlur}
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  placeholder="Please upload identification document"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          name="businessCertificate"
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business Certificate</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  {field.value?.name ? (
                    field.value?.name
                  ) : (
                    <>
                      Drag file here to upload document or{" "}
                      <span className="text-[#6B7280]">choose file</span>
                    </>
                  )}
                </Typography>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={field.ref}
                  name={field.name}
                  className="hidden"
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  placeholder="Please upload identification document"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button
          disabled={updateBusinessInfoMutation.isLoading}
          className="w-56 h-12 p-2.5 rounded-lg justify-center items-center gap-2.5 inline-flex text-white text-sm font-bold mx-auto"
          type="submit"
          size="default"
        >
          Save
        </Button>
      </form>
      <DevTool control={businessInfoForm.control} />
    </Form>
  )
}
