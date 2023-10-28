"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// import type { Metadata } from "next"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as zod from "zod";

// import { Button } from "components/ui/Button/Button"
import { createMerchant } from "api/registration";
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
import { Typography } from "components/ui/Typography";
import { useToast } from "components/ui/use-toast";

import { logoPath } from "lib/constants";

// export const metadata: Metadata = {
//   title: "Business",
//   description: "Business page as it should be",
// }

const merchantRegFormSchema = zod.object({
  country: zod.string(),
  firstName: zod.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  emailAddress: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(2, {
    message: "",
  }),
  phoneNo: zod.string(),
  businessName: zod.string(),
  businessType: zod.string(),
  businessCategory: zod.string(),
  isSoftwareDeveloper: zod.string(),
});

export default function RegistrationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const merchantRegForm = useForm<zod.infer<typeof merchantRegFormSchema>>({
    defaultValues: {},
    resolver: zodResolver(merchantRegFormSchema),
  });

  const merchantRegMutation = useMutation({
    mutationFn: createMerchant,
    onSuccess: async (data) => {
      const responseData: API.StatusReponse =
        (await data.json()) as API.StatusReponse;

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: responseData?.message,
        });
      }

      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: responseData?.message,
        });
        if (typeof window) {
          router.push(
            `/email-verification?email=${merchantRegForm.getValues(
              "emailAddress",
            )}&activationToken=${responseData?.responseObject}`,
          );
        }

        merchantRegForm.reset();
      }
    },

    onError: () => {
      return null;
    },
  });

  function onSubmit(values: zod.infer<typeof merchantRegFormSchema>) {
    merchantRegMutation.mutate(values);
  }

  return (
    <main className="flex flex-col items-center justify-center bg-transparent">
      <div className="flex w-[550px] flex-col items-center justify-center  bg-transparent ">
        <Form {...merchantRegForm}>
          <form
            onSubmit={merchantRegForm.handleSubmit(onSubmit)}
            className="w-full space-y-12"
          >
            <div className="px-6 space-y-8">
              <FormField
                name="country"
                control={merchantRegForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-gray-50">
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="px-3 py-6 mt-20 shadow-none border-gray-20">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem className="py-3 " value="AFGHANISTAN">
                          Afghanistan
                        </SelectItem>
                        <SelectItem className="py-3 " value="BELARUS">
                          Belarus
                        </SelectItem>
                        <SelectItem className="py-3 " value="SPAIN">
                          Spain
                        </SelectItem>
                        <SelectItem className="py-3 " value="NIGERIA">
                          Nigeria
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={merchantRegForm.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-normal text-gray-50">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        icon="show"
                        className="min-h-[48px]"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={merchantRegMutation.isLoading}
              className="flex self-center w-56 mx-auto font-bold"
              type="submit"
              size="lg"
            >
              Proceed
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
