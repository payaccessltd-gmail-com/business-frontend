"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { Checkbox } from "components/ui/checkbox";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createNewUser } from "../../../api/registration"
// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const RegistrationSchema = z.object({
  firstName: z
    .string()
    .min(2, "first name must contain more than 2 characters"),
  lastName: z.string().min(2, "last name must contain more than 2 characters"),
  emailAddress: z.string().email(),
  businessName: z
    .string()
    .min(2, "business name must contain more than 2 characters"),
  password: z
    .string()
    .min(2, "Password must contain more than 2 characters")
    .max(8, "Password must not be above 8 characters"),
  agreement: z.boolean().default(false).optional(),
});

export default function RegistrationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/get-started";
  const [isInputFocused, setInputFocused] = useState(false);

  const registrationForm = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      password: "",
      agreement: false,
    },
  });
  const { formState } = useForm();
  const { isValid } = formState;


  const userRegMutation = useMutation({
    mutationFn: createNewUser,
    onSuccess: async (data) => {
      const responseData: API.CreateAccountResponse = (await data.json()) as API.CreateAccountResponse

      if (responseData?.statusCode === "1") {
        toast({ variant: "destructive", title: "", description: responseData?.message })
      }

      if (responseData?.statusCode === "0") {
        toast({ variant: "default", title: "", description: responseData?.message })
        if (typeof window) {
          router.push(
            `/email-verification?email=${registrationForm.getValues("emailAddress")}&verification-link=${responseData?.responseObject?.split("/").pop()}`
          )
        }

        registrationForm.reset()
      }
    },

    onError: (e) => {
      console.log(e);
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      })

    },
  })


  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    userRegMutation.mutate(values)
  }

  return (
    <Form {...registrationForm}>
      <form
        onSubmit={registrationForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[50px] space-y-6 flex flex-col items-center"
      >
        {/* <FormMessage> */}
        <div className="flex flex-row items-center w-fit h-fit">
          <div className="w-6 h-6 rounded-full bg-[#23AAE1]"></div>
          <div className={`h-[3px] w-[38px] bg-[#1D8EBB]`}></div>
          <div className={`w-6 h-6 rounded-full bg-[#D9D9D9]`}></div>
        </div>
        {/* </FormMessage> */}

        <FormField
          control={registrationForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="min-h-[48px]"
                  placeholder="Enter first name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="min-h-[48px]"
                  placeholder="Enter last name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registrationForm.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="min-h-[48px]"
                  placeholder="Enter email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="businessName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Business name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="min-h-[48px]"
                  placeholder="eg oil&gas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777]">Enter password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  icon="show"
                  className="min-h-[48px]"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registrationForm.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex flex-row items-start gap-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange as () => void}
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[14px] font-[400] leading-[145%] text-[#555]"
                  >
                    {`I consent to the collection and processing of my personal data in line with data regulations as described in `}
                    <Link
                      className="text-[#48B8E6] text-[16px] font-[600] underline"
                      href="/"
                    >
                      Pay Access Policy
                    </Link>
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          Create account
        </Button>
      </form>
    </Form>
  );
}
