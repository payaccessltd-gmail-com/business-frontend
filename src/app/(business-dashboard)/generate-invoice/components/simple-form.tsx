"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useToast } from "components/ui/use-toast"
import { LuChevronDown } from "react-icons/lu"
import { format } from "date-fns"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import { HiOutlineCloudUpload } from "react-icons/hi"
import { FiMinus, FiPlus } from "react-icons/fi"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Textarea } from "components/ui/textarea"
import SimpleRecipt from "./simple-form-recipt"
import ReviewPopup from "./review-popup"
import { useMutation } from "@tanstack/react-query"
import { simpleInvoice } from "../../../../api/invoice"

let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""

if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  token = window.localStorage.getItem("token") as any
  subject = window.localStorage.getItem("subject") as any
  merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
  merchantId = merchantList[0].id ? merchantList[0]?.id : null
}

const SimpleSchema = z.object({
  customerName: z.string().min(2, "first name must contain more than 2 characters"),
  email1: z.string().email(),
  email2: z.string().email().optional(),
  email3: z.string().email().optional(),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
  amount: z.number().optional(),
  invoiceNote: z.string().optional(),
  // businessLogo: z.instanceof(File).optional(),
  // businessLogo: z.any().optional(),
  businessLogo: z.custom<File>().optional(),
})
export default function SimpleForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [receipt, setReceipt] = useState(false)
  const [popup, setPopup] = useState(false)
  const [modalData, setModalData] = useState<any>("")
  // const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState<any[] | undefined>([{ label: "Customer Email" }])
  const [minusField, setMinusField] = useState<any[] | undefined>()

  useEffect(() => {
    if (minusField === undefined || minusField.length < 1) {
      console.log("blocked at use effect")
      return
    } else {
      setInputField(minusField)
      console.log(inputField)
    }
  }, [minusField])

  let simpleForm = useForm<z.infer<typeof SimpleSchema>>({
    resolver: zodResolver(SimpleSchema),
    defaultValues: {
      customerName: "",
      email1: "",
      email2: "example@gmail.com",
      email3: "example@gmail.com",
      dueDate: undefined,
      amount: 0,
      invoiceNote: "",
      // businessLogo: new File([], ""),
    },
  })
  const handleModal = (e: any) => {
    e.preventDefault()
    simpleForm.clearErrors()

    setModalData(simpleForm?.getValues())
    if (simpleForm?.getValues()?.customerName?.length == 0) {
      simpleForm.setError("customerName", {
        type: "manual",
        message: "Customer name required",
      })
      return
    }
    if (simpleForm?.getValues()?.email1?.length == 0) {
      simpleForm.setError("email1", {
        type: "manual",
        message: "Email required",
      })
      return
    }
    if (!simpleForm?.getValues()?.dueDate) {
      simpleForm.setError("dueDate", {
        type: "manual",
        message: "Due date required",
      })
      return
    }

    setReceipt((value) => !value)
  }
  const addInputField = () => {
    if (inputField?.length === 3) {
      return
    }
    setInputField([...(inputField as any), { label: "" }])
  }
  const subtractInputField = () => {
    if (inputField?.length === 1) {
      console.log("blocked")
      return
    }
    const newfieldValues = inputField
    console.log(newfieldValues?.slice(0, -1))
    setMinusField(newfieldValues?.slice(0, -1))
  }
  const simpleFormMutation = useMutation({
    mutationFn: simpleInvoice,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse = (await data.json()) as API.InvoiceStatusReponse
      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: "Error Creating Invoice",
        })
      }
      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: "Invoice Created",
          className: "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        })
        simpleForm.reset()
        if (typeof window) {
          router.push(`/invoice`)
        }
      }
    },
    onError: (e) => {
      console.log(e)
      toast({
        variant: "destructive",
        title: `${e}`,
        description: "error",
      })
    },
  })

  async function onSubmit(values: z.infer<typeof SimpleSchema>) {
    console.log(values)
    let newValues = {
      ...values,
      amount: values?.amount?.toString(),
      dueDate: values?.dueDate?.toISOString().split("T")[0],
      additionalCustomerEmailAddress: [values?.email1, values?.email2, values?.email3]?.toString(),
      token: token,
      subject: subject,
      merchantId: merchantId,
      invoiceStatus: "PENDING",
    }
    console.log(newValues)
    simpleFormMutation.mutate(newValues as any)
  }

  const handleDraft = (e: any) => {
    e.preventDefault()
    if (simpleForm.getValues("dueDate") === undefined) {
      toast({
        variant: "destructive",
        title: "Due Date required",
        description: "Provide a due date",
      })
      return
    }
    const values = simpleForm.getValues()
    let newValues = {
      ...values,
      amount: values?.amount?.toString(),
      dueDate: values?.dueDate?.toISOString().split("T")[0],
      additionalCustomerEmailAddress: [values?.email1, values?.email2, values?.email3]?.toString(),
      token: token,
      subject: subject,
      merchantId: merchantId,
      invoiceStatus: "DRAFT",
    }
    // console.log(newValues);
    simpleFormMutation.mutate(newValues as any)
  }

  const modalRef = useRef<any>()
  const modalRef4 = useRef<any>()
  const handleModalSubmit = () => {
    modalRef.current.click()
  }
  const handleModalDraftSubmit = () => {
    modalRef4.current.click()
  }

  return (
    <Form {...simpleForm}>
      <form onSubmit={simpleForm.handleSubmit(onSubmit)} className="w-full rounded-lg pb-[50px] space-y-6 flex flex-col items-center">
        <FormField
          control={simpleForm.control}
          name="customerName"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Customer Name</FormLabel>
              <FormControl>
                <Input type="text" className="border-[#A1CBDE] min-h-[48px] bg-transparent" placeholder="Enter customer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {inputField?.map(({ label }, id) => {
          const nameString: any = `email${id + 1}`
          return (
            <FormField
              key={id}
              control={simpleForm.control}
              name={nameString}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">{label}</FormLabel>
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
          )
        })}
        <div className="flex flex-row items-center justify-between w-full">
          <p
            onClick={() => addInputField()}
            className="self-start cursor-pointer text-[#1D8EBB] text-[16px] leading-normal font-[400] flex flex-row items-center gap-[6px]"
          >
            <FiPlus className="text-[#1D8EBB] text-[24px]" />
            Add additional email address
          </p>

          {inputField?.length === 1 ? (
            ""
          ) : (
            <FiMinus onClick={() => subtractInputField()} className="text-[#1D8EBB] text-[24px] cursor-pointer mr-2" />
          )}
        </div>

        <FormField
          control={simpleForm.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Due Date</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "border-[#A1CBDE] min-h-[48px] bg-transparent w-full flex flex-row items-center justify-between font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <LuChevronDown className="text-[24px] text-[#2F3437]" />
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange as any}
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
          control={simpleForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Amount (optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="border-[#A1CBDE] min-h-[48px] bg-transparent"
                  placeholder="0.00"
                  {...field}
                  onFocusCapture={(e) => e.target.value === "0" && (e.target.value = "")}
                  onChange={(event) => field.onChange(Number(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={simpleForm.control}
          name="invoiceNote"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-[#0C394B] text-[16px] leading-normal font-[400]">Invoice note (optional)</FormLabel>
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
          control={simpleForm.control}
          name="businessLogo"
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
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .gif"
                  type="file"
                  className="hidden"
                  placeholder="Enter identification number"
                  // {...field}
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : (null as any))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          // disabled={loading}
          className="mt-[32px] min-h-[48px] font-[700] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4]"
          onClick={(e) => handleModal(e)}
        >
          Preview
        </Button>
        <Button
          variant={"outline"}
          // disabled={loading}
          className="mt-[32px] min-h-[48px] w-1/2 hover:bg-[#1D8EBB] hover:opacity-[0.4] text-[#48B8E6] text-[14px] leading-normal font-[700]"
          type="submit"
          onClick={(e) => handleDraft(e)}
        >
          Save as Draft
        </Button>
        <Button variant={"outline"} className="hidden" type="submit" ref={modalRef}></Button>
        <Button variant={"outline"} className="hidden" type="submit" onClick={(e) => handleDraft(e)} ref={modalRef4}></Button>
      </form>
      {receipt ? (
        <SimpleRecipt
          receipt={receipt}
          setReceipt={setReceipt}
          setPopup={setPopup}
          modalData={modalData}
          handleModalDraftSubmit={handleModalDraftSubmit}
        />
      ) : null}
      {popup ? <ReviewPopup value={"open"} setPopup={setPopup} handleSubmit={handleModalSubmit} modalData={modalData} /> : null}
    </Form>
  )
}
