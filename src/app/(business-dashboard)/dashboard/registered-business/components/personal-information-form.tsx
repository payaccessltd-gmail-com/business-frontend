"use client";

import { DevTool } from "@hookform/devtools";
// import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { LuCalendar } from "react-icons/lu";
import * as zod from "zod";

// import { updateMerchantBioData } from "api/registration";
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
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Typography } from "components/ui/Typography";
import { useToast } from "components/ui/use-toast";
import { cn } from "lib/utils";

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
});

export default function PersonalInformationForm() {
  const { toast } = useToast();
  const personalInfoForm = useForm<zod.infer<typeof personalInfoFormSchema>>({
    // resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      // emailAddress: localStorage.getItem("email") || (localStorage.getItem("email") as string),
      emailAddress: "user.user@gmail.com",
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
            className="space-y-2 border-gray-10 w-full"
          >
            <FormField
              name="identificationDocumentPath"
              control={personalInfoForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    Goverment approved document.
                  </FormDescription>
                  <FormLabel className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                    <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                    <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">
                      Drag file here to upload document or{" "}
                      <span className="text-[#6B7280]">choose file</span>
                    </Typography>
                    <FormControl>
                      <Input
                        className="hidden"
                        placeholder="Enter identification number"
                        {...field}
                        type="file"
                      />
                    </FormControl>
                  </FormLabel>
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
                    Proof of identity and address for directors of goodness oil&gas.
                  </FormDescription>
                  <FormLabel className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                    <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                    <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">
                      Drag file here to upload document or{" "}
                      <span className="text-[#6B7280]">choose file</span>
                    </Typography>
                    <FormControl>
                      <Input
                        className="hidden"
                        placeholder="Enter identification number"
                        {...field}
                        type="file"
                      />
                    </FormControl>
                  </FormLabel>
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
                    Document showing business owners.
                  </FormDescription>
                  <FormLabel className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                    <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                    <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">
                      Drag file here to upload document or{" "}
                      <span className="text-[#6B7280]">choose file</span>
                    </Typography>
                    <FormControl>
                      <Input
                        className="hidden"
                        placeholder="Enter identification number"
                        {...field}
                        type="file"
                      />
                    </FormControl>
                  </FormLabel>
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
                  Proof of identity and address for shareholders that own up to 51% of goodness oil&gas.
                  </FormDescription>
                  <FormLabel className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-[5px] border-[1px] border-dotted border-[#777777]">
                    <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                    <Typography className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF]">
                      Drag file here to upload document or{" "}
                      <span className="text-[#6B7280]">choose file</span>
                    </Typography>
                    <FormControl>
                      <Input
                        className="hidden"
                        placeholder="Enter identification number"
                        {...field}
                        type="file"
                      />
                    </FormControl>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
      


            <div className="flex items-center py-5 justify-center ">
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
          <DevTool control={personalInfoForm.control} />
        </Form>
  );
}
