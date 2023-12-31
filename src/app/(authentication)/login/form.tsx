"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
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

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "api/login";
import { useMerchantStore } from "store";

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { setCurrentMerchant, setMerchants } = useMerchantStore();

  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      const responseData: API.LoginResponse =
        (await data.json()) as API.LoginResponse;

      if (!responseData?.subject && !responseData?.token) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "",
          description: "Error Signin in",
        });
      } else if (responseData?.token && responseData?.token) {
        setLoading(false)

        toast({
          variant: "default",
          title: "",
          description: "Signin successful",
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });

        localStorage.setItem("subject", responseData?.subject as string);
        localStorage.setItem(
          "merchantList",
          JSON.stringify(responseData?.merchantList),
        );
        localStorage.setItem("token", responseData?.token as string);

        if (typeof window) {
          router.push(`/dashboard`);
          setMerchants(responseData?.merchantList as API.MerchantList);
          setCurrentMerchant(responseData.merchantList?.[0] as API.Merchant);
        }
        loginForm.reset();
      } else {
        setLoading(false)

        toast({
          variant: "destructive",
          title: "",
          description: "Error Signin in",
        });
      }
    },

    onError: (e) => {
      setLoading(false)

      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true)
    loginMutation.mutate(values);
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg bg-white pb-[40px] flex flex-col items-center"
      >
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#777777] ">Email</FormLabel>

              <FormControl>
                <Input
                  className="min-h-[48px]"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-[25px] w-full">
              <FormLabel className="text-[#777777]">Enter password</FormLabel>
              <FormControl>
                <Input
                  className="min-h-[48px]"
                  placeholder="Password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={loading}
          className="mt-[42px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
