"use client"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as zod from "zod"
import { Checkbox } from "components/ui/checkbox"
import { ScrollArea } from "components/ui/scroll-area"
import { Typography } from "components/ui/Typography"

// const merchantRegFormSchema = zod.object({
//   country: zod.string(),
//   firstName: zod.string().min(2, {
//     message: "First name must be at least 2 characters.",
//   }),
//   lastName: zod.string().min(2, {
//     message: "Last name must be at least 2 characters.",
//   }),

//   emailAddress: zod.string().email({ message: "Invalid email address" }),
//   password: zod.string().min(2, {
//     message: "",
//   }),
//   businessName: zod.string(),
//   businessType: zod.string(),
//   businessCategory: zod.string(),
//   isSoftwareDeveloper: zod.string(),
// })
const TermsConditionForm = () => {
  return (
    <div className="flex flex-col items-center pb-[50px] pl-[49px] pr-[18px] pt-[21px]">
      <Typography level="p" className="mb-[12px] text-center text-[16px] font-[600] leading-6 text-[#0A0A0A] ">
        Terms and Conditions
      </Typography>
      <div className="mb-[22px] h-[328px] w-[630px] rounded-[11px] border border-solid border-[#EFEFEF] p-[10px]">
        <ScrollArea className="h-full w-full pr-4 text-justify text-[14px] font-normal leading-[187%] text-[#2A2A2A]">
          A Terms & Conditions (T&C) agreement can greatly benefit a small business by helping the business owner set
          out the rules for your products and services and help manage the expectations for you and your customers.A
          Terms & Conditions (T&C) agreement can greatly benefit a small business by helping the business owner set out
          the rules for your products and services and help manage the expectations for you and your customers . A Terms
          & Conditions (T&C) agreement can greatly benefit a small business by helping the business owner set out the
          rules for your products and services and help manage the expectations for you and your customers. A Terms &
          Conditions (T&C) agreement can greatly benefit a small business by helping the business owner set out the
          rules for your products and services and help manage the expectations for you and your customers. A Terms &
          Conditions (T&C) A Terms & Conditions (T&C) agreement can greatly benefit a small business by helping the
          business owner set out the rules for your products and services and help manage the expectations for you and
          your customers.A Terms & Conditions (T&C) agreement can greatly benefit a small business by helping the
          business owner set out the rules for your products and services and help manage the expectations for you and
          your customers . A Terms & Conditions (T&C) agreement can greatly benefit a small business by helping the
          business owner set out the rules for your products and services and help manage the expectations for you and
          your customers. A Terms & Conditions (T&C) agreement can greatly benefit a small business by helping the
          business owner set out the rules for your products and services and help manage the expectations for you and
          your customers. A Terms & Conditions (T&C){" "}
        </ScrollArea>
      </div>
      <div className="flex flex-row items-center space-x-2 self-start">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-[14px] font-normal leading-[145%] text-[#555555]">
          I accept all the teams and conduction of pay access.
        </label>
      </div>
    </div>
  )
}

export default TermsConditionForm
