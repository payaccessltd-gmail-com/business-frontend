"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";
import StandardRecipt from "./standard-form-recipt";
import ReviewPopup from "./review-popup";
import { useMutation } from "@tanstack/react-query";
import { standardInvoice } from "../../../../api/invoice";



let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""


if (
  typeof window !== "undefined" &&
  typeof window.localStorage !== "undefined"
) {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}




const StandardSchema = z.object({
  customerName: z
    .string()
    .min(2, "first name must contain more than 2 characters"),
  email1: z.string().email(),
  email2: z.string().email().optional(),
  email3: z.string().email().optional(),
  invoiceItem1: z.string(),
  qty1: z.number(),
  costPerUnit1: z.number(),
  invoiceItem2: z.string(),
  qty2: z.number(),
  costPerUnit2: z.number(),
  invoiceItem3: z.string(),
  qty3: z.number(),
  costPerUnit3: z.number(),
  amount: z.number().optional(),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
  invoiceNote: z.string().optional(),
  // logo: z.string().optional(),
  discountType: z.string().optional(),
  taxPercent: z.number().optional(),
  discountAmount: z.number().optional(),
  shipping: z.number().optional(),
});

export default function StandardForm() {
  const [receipt, setReceipt] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState<any[]>([
    { label: "Customer Email" },
  ]);
  const [invoiceItem, setInvoiceItem] = useState<any[]>([""]);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/get-started";
  const [isInputFocused, setInputFocused] = useState(false);
  const [date, setDate] = useState<Date>();
  const [modalData, setModalData] = useState<any>("");




  const standardForm = useForm<z.infer<typeof StandardSchema>>({
    resolver: zodResolver(StandardSchema),
    defaultValues: {
      customerName: "",
      email1: "example@gmail.com",
      email2: "example@gmail.com",
      email3: "example@gmail.com",
      invoiceItem1: "",
      qty1: 0,
      costPerUnit1: 0,
      invoiceItem2: "",
      qty2: 0,
      costPerUnit2: 0,
      invoiceItem3: "",
      qty3: 0,
      costPerUnit3: 0,
      dueDate: undefined,
      amount: 0,
      invoiceNote: "",
      // logo: "",
      taxPercent: 0,
      discountType: "PERCENTAGE",
      discountAmount: 0,
      shipping: 0,
    },
  });


  const handleModal = (e: any) => {
    e.preventDefault();
    standardForm.clearErrors()
    setModalData(standardForm?.getValues())
    if (standardForm?.getValues()?.customerName?.length == 0) {
      standardForm.setError("customerName", {
        type: "manual",
        message: "Customer name required",
      })
      return
    }
    if (standardForm?.getValues()?.email1?.length == 0) {
      standardForm.setError("email1", {
        type: "manual",
        message: "Email required",
      })
      return
    }
    if (!standardForm?.getValues()?.dueDate) {
      standardForm.setError("dueDate", {
        type: "manual",
        message: "Due date required",
      })
      return
    }
    setReceipt((value) => !value);
  };

  const addEmail = () => {
    if (inputField.length === 3) {
      return;
    }
    setInputField([...inputField, { label: "" }]);
  };
  const addInvoiceItem = () => {
    if (invoiceItem.length === 3) {
      return;
    }
    setInvoiceItem([...invoiceItem, ""]);
  };

  const standardFormMutation = useMutation({
    mutationFn: standardInvoice,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse =
        (await data.json()) as API.InvoiceStatusReponse;

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: "Error Creating Invoice",
        });
      }

      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: "Invoice Created",
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });

        standardForm.reset();
        if (typeof window) {
          router.push(`/invoice`);
        }
      }
    },

    onError: (e) => {
      console.log(e);
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof StandardSchema>) {
    let newValues = {
      ...values,
      dueDate: values?.dueDate?.toISOString().split("T")[0],
      token: token,
      subject: subject,
      merchantId: merchantId,
      additionalCustomerEmailAddress: [
        values?.email1,
        values?.email2,
        values?.email3,
      ]?.toString(),
      invoiceStatus: "PENDING",
      invoiceBreakdownList: [
        {
          invoiceItem: values?.invoiceItem1,
          quantity: values?.qty1,
          costPerUnit: values?.costPerUnit1,
        },
        {
          invoiceItem: values?.invoiceItem2,
          quantity: values?.qty2,
          costPerUnit: values?.costPerUnit2,
        },
        {
          invoiceItem: values?.invoiceItem3,
          quantity: values?.qty3,
          costPerUnit: values?.costPerUnit3,
        },
      ],
    };
    console.log(newValues);
    standardFormMutation.mutate(newValues as any);
  }



  const handleDraftSubmit = (e: any) => {
    e.preventDefault();
    let values = standardForm.getValues()
    let newValues = {
      ...values,
      dueDate: values?.dueDate?.toISOString().split("T")[0],
      token: token,
      subject: subject,
      merchantId: merchantId,
      additionalCustomerEmailAddress: [
        values?.email1,
        values?.email2,
        values?.email3,
      ]?.toString(),
      invoiceStatus: "DRAFT",
      invoiceBreakdownList: [
        {
          invoiceItem: values?.invoiceItem1,
          quantity: values?.qty1,
          costPerUnit: values?.costPerUnit1,
        },
        {
          invoiceItem: values?.invoiceItem2,
          quantity: values?.qty2,
          costPerUnit: values?.costPerUnit2,
        },
        {
          invoiceItem: values?.invoiceItem3,
          quantity: values?.qty3,
          costPerUnit: values?.costPerUnit3,
        },
      ],
    };
    // console.log(newValues);
    standardFormMutation.mutate(newValues as any);
  }


  const modalRef2 = useRef<any>();
  const modalRef3 = useRef<any>();
  const handleModalSubmit = () => {
    modalRef2.current.click()
  }
  const handleModalSubmitDraft = () => {
    modalRef3.current.click()
  }
  const amountValue =
    (standardForm.getValues("qty1") * standardForm.getValues("costPerUnit1")) +
    (standardForm.getValues("qty2") * standardForm.getValues("costPerUnit2")) +
    (standardForm.getValues("qty3") * standardForm.getValues("costPerUnit3"))
  const discount = ((standardForm.getValues("discountAmount") || 0) / 100) * amountValue
  const subTotal = amountValue - discount
  const tax = subTotal * ((standardForm.getValues("taxPercent") || 0) / 100)
  const grandTotal = subTotal - tax + (standardForm.getValues("shipping") || 0)
  return (
    <Form {...standardForm}>
      <form
        onSubmit={standardForm.handleSubmit(onSubmit)}
        className="w-full rounded-lg pb-[50px] space-y-6 flex flex-col items-center"
      >
        <FormField
          control={standardForm.control}
          name="customerName"
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
              control={standardForm.control}
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
                      onChange={(event) => {
                        field.onChange(event);
                      }}
                    // value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <p
          onClick={() => addEmail()}
          className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]"
        >
          <FiPlus className="text-[#1D8EBB] text-[24px]" />
          Add additional email address
        </p>

        {invoiceItem.map((value, id) => {
          let invoiceItemNameString: any = `invoiceItem${id + 1}`;
          let qtyNameString: any = `qty${id + 1}`;
          let costPerUnitNameString: any = `costPerUnit${id + 1}`;
          return (
            <div
              key={id}
              className="flex flex-row items-start w-full gap-[13px]"
            >
              <FormField
                control={standardForm.control}
                name={invoiceItemNameString}
                render={({ field }) => (
                  <FormItem className="w-[40%] ">
                    <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                      Invoice item
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                        placeholder="Product or service name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={standardForm.control}
                name={qtyNameString}
                render={({ field }) => (
                  <FormItem className="w-[20%] ">
                    <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                      Qty
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                        placeholder="0"
                        {...field}
                        onFocusCapture={(e) => e.target.value === '0' && (e.target.value = '')}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={standardForm.control}
                name={costPerUnitNameString}
                render={({ field }) => (
                  <FormItem className="w-[40%] ">
                    <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                      Invoice item
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                        placeholder="0.00"
                        {...field}
                        onFocusCapture={(e) => e.target.value === '0' && (e.target.value = '')}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}

        <p
          onClick={() => addInvoiceItem()}
          className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]"
        >
          <FiPlus className="text-[#1D8EBB] text-[24px]" />
          Add additional items
        </p>

        <FormField
          control={standardForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                Amount (optional)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                  placeholder="0.00"
                  {...field}
                  onFocusCapture={(e) => e.target.value === '0' && (e.target.value = '')}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={standardForm.control}
          name="dueDate"
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
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={standardForm.control}
          name="invoiceNote"
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
        {/*
                <FormField
                    control={standardForm.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormDescription className="text-[#0C394B] text-[16px] leading-normal font-[400]">Business Logo (optional)</FormDescription>
                            <FormLabel className="bg-[white] border-[#115570] rounded-[10px] flex h-[77px] w-full cursor-pointer flex-row items-center justify-center gap-3 border-[2px] border-dotted">
                                <HiOutlineCloudUpload className="text-[20px] text-[#9CA3AF]" />
                                <p className="text-center text-[14px] font-normal leading-5 text-[#9CA3AF] ">
                                    Drag file here to upload document or <span className="text-[#CA6B1B]">choose file</span>
                                </p>
                            </FormLabel>
                            <FormControl>
                                <Input className="hidden" placeholder="Enter identification number" {...field} type="file" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex flex-col items-start w-full">
            <p className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]">
              <FiPlus className="text-[#1D8EBB] text-[24px]" />
              Add Tax & Discount
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start w-full gap-6">
            <FormField
              control={standardForm.control}
              name="taxPercent"
              render={({ field }) => (
                <FormItem className="mt-[31px] w-full">
                  <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                    Tax payment(%)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                      placeholder="0"
                      {...field}
                      onFocusCapture={(e) => e.target.value === '0' && (e.target.value = '')}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-end w-full gap-6">
              <FormField
                control={standardForm.control}
                name="discountType"
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
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        <SelectItem value="percentage2">Percentage</SelectItem>
                        <SelectItem value="percentage3">Percentage</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={standardForm.control}
                name="discountAmount"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    {/* <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Qty</FormLabel> */}
                    <FormControl>
                      <Input
                        type="number"
                        className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                        placeholder="0.00"
                        {...field}
                        onFocusCapture={(e) => e.target.value === '0' && (e.target.value = '')}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex flex-col items-start w-full">
            <p className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]">
              <FiPlus className="text-[#1D8EBB] text-[24px]" />
              Add Shipping Fee
            </p>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start w-full gap-6">
            <FormField
              control={standardForm.control}
              name="shipping"
              render={({ field }) => (
                <FormItem className="mt-[31px] w-full">
                  <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">
                    Shipping fee (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                      placeholder="0.00"
                      {...field}
                      onFocusCapture={(e) => e.target.value === '0' && (e.target.value = '')}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
            Subtotal
          </p>
          <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
            {subTotal}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
            Grand Total
          </p>
          <p className="text-[#07222D] text-[16px] leading-normal font-[700]">
            {grandTotal}
          </p>
        </div>

        <Button
          disabled={loading}
          className="mt-[32px] min-h-[48px] font-[700] w-[335px] hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          type="submit"
          onClick={(e) => handleModal(e)}
        >
          Preview
        </Button>
        <Button
          disabled={loading}
          className="hidden"
          type="submit"
          ref={modalRef2}
        >
          Preview
        </Button>
        <Button
          disabled={loading}
          className="hidden"
          type="submit"
          onClick={(e) => handleDraftSubmit(e)}
          ref={modalRef3}
        >
          Preview
        </Button>
        {/* <Button

                    variant={"outline"}
                    disabled={loading}
                    className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
                    type="submit"
                >
                    Save as Draft
                </Button> */}
      </form>
      {receipt ? (
        <StandardRecipt
          receipt={receipt}
          setReceipt={setReceipt}
          setPopup={setPopup}
          modalData={{ ...modalData, grandTotal, tax, subTotal, discount, amountValue }}
          handleModalSubmitDraft={handleModalSubmitDraft}
        />
      ) : (
        ""
      )}
      {popup ? <ReviewPopup
        value={`NGN ${standardForm?.getValues("amount")?.toLocaleString()}`}
        setPopup={setPopup}
        handleSubmit={handleModalSubmit}
        modalData={modalData}
      /> : ""}
    </Form>
  );
}


