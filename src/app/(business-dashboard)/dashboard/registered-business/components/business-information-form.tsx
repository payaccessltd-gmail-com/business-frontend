"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { updateMerchantBusinessData } from "api/merchant-management";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Textarea } from "components/ui/textarea";

const businessInfoFormSchema = zod.object({
  merchantId: zod.number(),
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
});

export default function BusinessInformationForm() {
  let token = "";
  const businessInfoForm = useForm<zod.infer<typeof businessInfoFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(businessInfoFormSchema),
  });

  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    token = localStorage.getItem("token") as string;
  }

  const updateMerchantBusinessDataMutation = useMutation({
    mutationFn: (values: API.UpdateMerchantBusinessDataDTO) =>
      updateMerchantBusinessData(values, token),
    onSuccess: () => {
      return null;
    },
    onMutate: () => {
      return null;
    },
  });

  const onSubmit = (values: zod.infer<typeof businessInfoFormSchema>) => {
    // const emailAddress = localStorage.getItem("emailAddress") as string
    const emailAddress = "user.user@gmail.com";

    const updatedValue = { emailAddress, ...values };
    updateMerchantBusinessDataMutation.mutate(updatedValue as any);
  };

  return (
    <Form {...businessInfoForm} >
      <form
        onSubmit={businessInfoForm.handleSubmit(onSubmit)}
        className="space-y-2 border-gray-10 w-full"
      >
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
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  {...field}
                />
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
                  <Input
                    placeholder="Enter businesss mobile number"
                    {...field}
                    type="number"
                  />
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
            name="businessState"
            control={businessInfoForm.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    <SelectItem value="ABUJA">Nigeria</SelectItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          name="businessWebsite"
          control={businessInfoForm.control}
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
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business logo (optional)</FormDescription>
              <FormControl>
                <Input
                  placeholder="Drag file here to upload document or choose file"
                  {...field}
                  type="file"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="businessCertificate"
          control={businessInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Business Certificate</FormDescription>
              <FormControl>
                <Input
                  placeholder="Drag file here to upload document or choose file"
                  {...field}
                  type="file"
                />
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
  );
}
