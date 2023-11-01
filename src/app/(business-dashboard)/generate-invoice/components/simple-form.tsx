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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { useToast } from "components/ui/use-toast";
import { Checkbox } from "components/ui/checkbox";
import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";
import { format } from "date-fns";
import { cn } from "lib/utils";
import { Calendar } from "components/ui/calendar";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Textarea } from "components/ui/textarea";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// }

const SimpleSchema = z.object({
  CustomerName: z
    .string()
    .min(2, "first name must contain more than 2 characters"),
  email1: z.string().email(),
  email2: z.string().email().optional(),
  email3: z.string().email().optional(),
  date: z.date({
    required_error: "Due date is required.",
  }),
  amount: z.string().optional(),
  note: z.string().optional(),
  logo: z.string().optional(),
});

export default function SimpleForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState<any[]>([
    { label: "Customer Email" },
  ]);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/get-started";
  const [isInputFocused, setInputFocused] = useState(false);
  const [date, setDate] = useState<Date>();
  const SimpleForm = useForm<z.infer<typeof SimpleSchema>>({
    resolver: zodResolver(SimpleSchema),
    defaultValues: {
      CustomerName: "",
      email1: "",
      email2: "example@gmail.com",
      email3: "example@gmail.com",
      date: undefined,
      amount: "",
      note: "",
      logo: "",
    },
  });
  const addInputField = () => {
    if (inputField.length === 3) {
      return;
    }
    setInputField([...inputField, { label: "" }]);
  };

  async function onSubmit(values: z.infer<typeof SimpleSchema>) {
    console.log(values);
    // try {
    //   setLoading(true)

    //   const res = await signIn("credentials", {
    //     redirect: false,
    //     email: values.email,
    //     callbackUrl,
    //   })

    //   setLoading(false)

    //   if (!res?.error) {
    //     router.push(callbackUrl)
    //   } else {
    //     toast({
    //       variant: "destructive",
    //       title: "invalid email or password",
    //       description: "Please confirm if user is registered",
    //     })
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //   setLoading(false)
    //   toast({
    //     variant: "destructive",
    //     title: error,
    //     description: error,
    //   })
    // }
  }

  return (
    <Form {...SimpleForm}>
      <form
        onSubmit={SimpleForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg pb-[50px] space-y-6 flex flex-col items-center"
      >
        <FormField
          control={SimpleForm.control}
          name="CustomerName"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                Customer Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                  placeholder="Enter customer name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {inputField.map(({ label }, id) => {
          const nameString: any = `email${id + 1}`;
          return (
            <FormField
              key={id}
              control={SimpleForm.control}
              name={nameString}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                    {label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                      placeholder="Enter customer Email address"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <p
          onClick={() => addInputField()}
          className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]"
        >
          <FiPlus className="text-[#1D8EBB] text-[24px]" />
          Add additional email address
        </p>

        <FormField
          control={SimpleForm.control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                Due Date
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "border-[#A1CBDE] min-h-[48px] bg-transparent w-full flex flex-row items-center justify-between font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <LuChevronDown className="text-[24px] text-[#2F3437]" />
                    </Button>
                  </PopoverTrigger>
                </FormControl>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={SimpleForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                Amount (optional)
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={SimpleForm.control}
          name="note"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                Invoice note (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Say something about the invoice"
                  className="resize-none border-[#A1CBDE] min-h-[82px] bg-transparent"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* ----------input type: file/// */}
        <FormField
          control={SimpleForm.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormDescription className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                Business Logo (optional)
              </FormDescription>
              <FormLabel className="bg-[white] border-[#115570] rounded-[10px] flex h-[77px] w-full cursor-pointer flex-row items-center justify-center gap-3 border-[2px] border-dotted">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <p className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or{" "}
                  <span className="text-[#CA6B1B]">choose file</span>
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  placeholder="Enter identification number"
                  {...field}
                  type="file"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          className="mt-[32px] min-h-[48px] font-[700] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
        >
          Preview
        </Button>
        <Button
          variant={"outline"}
          disabled={loading}
          className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
          type="submit"
        >
          Save as Draft
        </Button>
      </form>
    </Form>
  );
}
