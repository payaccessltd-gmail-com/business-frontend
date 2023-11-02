"use client";

import { DevTool } from "@hookform/devtools";
// import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { LuCalendar } from "react-icons/lu";
import * as zod from "zod";

// import { } from "api/merchant-management";
import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
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

import { Typography } from "components/ui/Typography";
import { useToast } from "components/ui/use-toast";

const personalInfoFormSchema = zod.object({
  governmentApprovedDocument: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  proofOfIdentity: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  businessOwner: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  proofOfIdentityShareHolder: zod.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  identificationDocumentPath: zod.string(),
});

export default function BusinessRegistrationKYCForm() {
  const { toast } = useToast();
  const personalInfoForm = useForm<zod.infer<typeof personalInfoFormSchema>>({
    // resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      // emailAddress: localStorage.getItem("email") || (localStorage.getItem("email") as string),
    },
  });

  // const updateMerchantBioDataMutation = useMutation({
  //   mutationFn: updateMerchantBioData,
  //   onSuccess: async (data) => {
  //     const res: { statusCode: string; message: string } =
  //       (await data.json()) as {
  //         statusCode: string;
  //         message: string;
  //       };

  //     if (res.statusCode === "403") {
  //       toast({
  //         variant: "destructive",
  //         title: res.statusCode,
  //         description: res.message,
  //       });
  //     }
  //   },

  //   onError: (error, variables, context) => {
  //     console.log({ error, variables, context });
  //   },
  //   onMutate: () => {
  //     return null;
  //   },
  // });

  const onSubmit = (values: zod.infer<typeof personalInfoFormSchema>) => {
    // const emailAddress =
    //   localStorage.getItem("email") ||
    //   (localStorage.getItem("email") as string);
    const emailAddress = "user.user@gmail.com";
    const updatedData = { ...values, emailAddress: emailAddress };
    // updateMerchantBioDataMutation.mutate(updatedData);
  };

  return (
    <Form {...personalInfoForm}>
      <form
        id="personalInformation"
        onSubmit={personalInfoForm.handleSubmit(onSubmit)}
        className="space-y-8 border-gray-10"
      >
        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>Government approved Document</FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or{" "}
                  <span className="text-[#6B7280]">choose file</span>
                </Typography>
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

        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Proof of Identity and Address for Directors of Goodness oil &
                gas
              </FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or{" "}
                  <span className="text-[#6B7280]">choose file</span>
                </Typography>
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

        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Document showing business owners
              </FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or{" "}
                  <span className="text-[#6B7280]">choose file</span>
                </Typography>
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

        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Proof of Identity and Address for Shareholders that own up to
                51% of Goodness oil & gas
              </FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or{" "}
                  <span className="text-[#6B7280]">choose file</span>
                </Typography>
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

        <FormField
          name="identificationDocumentPath"
          control={personalInfoForm.control}
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Please upload identification document.
              </FormDescription>
              <FormLabel className="flex h-[67px] w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                  Drag file here to upload document or{" "}
                  <span className="text-[#6B7280]">choose file</span>
                </Typography>
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
          // disabled={updateMerchantBioDataMutation.isLoading}
          className="h-[48px] w-[70%] self-center"
          type="submit"
          size="default"
        >
          Save and Continue
        </Button>
      </form>
      <DevTool control={personalInfoForm.control} />
    </Form>
  );
}
