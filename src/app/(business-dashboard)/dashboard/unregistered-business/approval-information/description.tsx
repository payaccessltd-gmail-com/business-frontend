import React, { useState } from "react"

import { Typography } from "components/ui/Typography"
import { Button } from "components/ui/button"

import { useQuery } from "@tanstack/react-query"

import ReviewDetails from "./review-details"
import InformationFrame from "../../components/information-frame"
import PersonalInformation from "../personal-information/description"
import BusinessInformation from "../business-information/description"
import AccountInformation from "../account-information/description"

import PersonalInformationForm from "../../unregistered-business/personal-information/form"
import BusinessInformationForm from "../business-information/form"
import AccountInformationForm from "../account-information/form"
import { getMerchantDetails } from "api/settings"

type ApprovalDescriptionProps = {
  prevStep?: () => void
  nextStep?: () => void
}

let merchantList: any
let token = ""
let subject = ""
let merchantId: any = ""


if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") 
{
    token = window.localStorage.getItem("token") as any
    subject = window.localStorage.getItem("subject") as any
    merchantList = JSON.parse(window.localStorage.getItem("merchantList") as any)
    merchantId = merchantList[0].id ? merchantList[0]?.id : null
}

export default function ApprovalDescription({}: ApprovalDescriptionProps) {
  
  const getParameters = {
    token,
    merchantCode: merchantList[0]?.merchantCode
}

const data: any = useQuery(['getMerchantDetails', getParameters], () => getMerchantDetails(getParameters));

  const [enableEdit, setEnableEdit] = useState<boolean>()

  console.log("personal ",JSON.stringify(data?.data?.responseObject[1]));
  const personalData = data?.data?.responseObject[1]


  console.log("businessData ",JSON.stringify(data?.data?.responseObject[0]));
  const businessData = data?.data?.responseObject[0]
  // const data: any = useQuery(['getMerchantSetting', token], () => getUserInfo(token));

  const enable = () =>{
    console.log(enableEdit);
    if(enableEdit) setEnableEdit(false); else setEnableEdit(true);
    return enableEdit 
  }
  return (
    <div className="space-y-4">
      <ReviewDetails />

      {/* form display section */}
      <div className="inline-flex flex-col items-start justify-start gap-6 px-10 pt-6 pb-10 bg-white border rounded-lg border-slate-200">
        <div className="flex flex-row items-center justify-between w-full">
          <Typography className="text-2xl font-bold leading-normal grow shrink basis-0 font-CenturyGothic text-[#212429]">
            Review Information
          </Typography>

          <Button onClick={()=> enable()} className="text-center text-white text-sm font-bold font-['Century Gothic'] self-stretch px-8 py-2.5 bg-sky-400 rounded justify-center items-center inline-flex">
            Edit records
          </Button>
        </div>
        <div className="self-stretch h-px border border-gray-200"></div>
        <div className="flex flex-col items-start justify-start space-y-3 ">
          {enableEdit}
          <InformationFrame title={"Personal Information"} setStatus={personalData?.userStatus}>
          { enableEdit === true ? 
          
           <PersonalInformation data = {personalData} />    
           :       
           <PersonalInformationForm  />
           }
          </InformationFrame>

          <InformationFrame title="Business Information" setStatus={personalData?.merchantStatus}>
          { enableEdit === true ? 
            <BusinessInformation data={businessData} setCountry = {personalData?.country} />
            :
            <BusinessInformationForm />
          }
          </InformationFrame>

          <InformationFrame title="Account Information" setStatus={personalData?.merchantStatus}>
          { enableEdit === true ? <AccountInformation  data={businessData} /> : <AccountInformationForm />}
          </InformationFrame>
        </div>
      </div>
    </div>
  )
}