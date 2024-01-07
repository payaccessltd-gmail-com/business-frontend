"use client"

import { Button } from "components/ui/button"
import { useEffect, useState } from "react"
import { MdContactSupport } from "react-icons/md"
import { LuChevronDown } from "react-icons/lu"
import { IoSearchSharp } from "react-icons/io5"
import { useToast } from "components/ui/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

import { Label } from "components/ui/label"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { addDays, format } from "date-fns"
import { cn } from "lib/utils"
import { Calendar } from "components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/ui/popover"
import InvoiceTable from "../generate-invoice/components/table"
import { getAllInvoice } from "../../../api/invoice"
import { getMerchantSetting } from "../../../api/settings"
import { useQuery } from "@tanstack/react-query"
import { ScrollArea } from "components/ui/scroll-area"
import PersonalForm from "./components/profile/personal-info-form"
import PasswordForm from "./components/profile/password"
import BusinessType from "./components/business-type/business"
import BusinessInfoForm from "./components/business-profile/business-info-form"
import AccountInfoForm from "./components/business-profile/account-info"
import { TransactionNotification } from "./components/notification/transaction"
import { TransferNotification } from "./components/notification/transfer"
import { EarningNotification } from "./components/notification/earning"
import { EnableNotification } from "./components/notification/enable"
import { useMutation } from "@tanstack/react-query";
import { updateNotification } from "../../../api/settings";
import VerifyModal from "./components/email-verification-modal/modal"
import Security from "./components/security/security"
import Payment from "./components/security/payment"









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



export default function Settings() {

  const { toast } = useToast();

  // const [data, setData] = useState<any>(null)
  const [date, setDate] = useState<Date>()
  const [date1, setDate1] = useState<Date>()
  const [tab, setTab] = useState<number>(0)
  const dropOptions = ["Contact us", "Share feedback", "Resolve a complain"]


  const GetParameters = { merchantId, token }
  const data: any = useQuery(['getMerchantSetting', GetParameters], () => getMerchantSetting(GetParameters));

  // console.log(data?.data?.responseObject)
  // console.log(Notification)
  const [Notification, setNotification] = useState<any>({


  })
  const [email, setEmail] = useState<any>("")
  const [isModalOpen, setVerifyModal] = useState<boolean>(false)



  const settingsMutation = useMutation({
    mutationFn: updateNotification,
    onSuccess: async (data) => {
      const responseData: API.InvoiceStatusReponse =
        (await data.json()) as API.InvoiceStatusReponse;

      if (responseData?.statusCode === "1") {
        toast({
          variant: "destructive",
          title: "",
          description: "Error updating notification settings",
        });
      }

      if (responseData?.statusCode === "0") {
        toast({
          variant: "default",
          title: "",
          description: "Notification Settings updated",
          className:
            "bg-[#BEF2B9] border-[#519E47] text-[#197624] text-[14px] font-[400]",
        });


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


  const handleNotificationUpdate = () => {
    const values = {
      transactionNotificationByEmail: Notification.transactionNotificationByEmail || true,
      customerNotificationByEmail: Notification.customerNotificationByEmail || true,
      transferNotificationByEmailForCredit: Notification.transferNotificationByEmailForCredit || true,
      transferNotificationByEmailForDebit: Notification.transferNotificationByEmailForDebit || true,
      merchantReceiveEarningsOption: Notification.merchantReceiveEarningsOption || "BANK_ACCOUNT",
      enableNotificationForTransfer: Notification.enableNotificationForTransfer || true,
      enableNotificationForInvoicing: Notification.enableNotificationForInvoicing || true,
      enableNotificationForPaymentLink: Notification.enableNotificationForPaymentLink || true,
      enableNotificationForSettlement: Notification.enableNotificationForSettlement || true,
      merchantId: merchantId,
      token: token,
    }
    settingsMutation.mutate(values as any)
  }

  return (
    <div className="relative w-full h-full flex flex-col">


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="fixed z-50 right-[72px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal"
          >
            <MdContactSupport className="text-[24px] text-[#fff]" />
            Support
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
          <div className='w-full flex flex-col items-center gap-2'>
            {
              dropOptions.map((value, id) => {
                return <p key={id} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                  {value}
                </p>
              })
            }
          </div>
        </DropdownMenuContent>
      </DropdownMenu>


      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Setting</p>
      <div className="flex flex-row items-end">
        <p onClick={() => setTab(0)} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${tab === 0 ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
          Profile
        </p>
        <p onClick={() => setTab(1)} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${tab === 1 ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
          Business Profile
        </p>
        <p onClick={() => setTab(2)} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${tab === 2 ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
          Business Type
        </p>
        <p onClick={() => setTab(3)} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${tab === 3 ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
          Security
        </p>
        <p onClick={() => setTab(4)} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${tab === 4 ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
          Notification
        </p>
        <p onClick={() => setTab(5)} className={`flex flex-row items-center px-4 h-11 border-b-[2px] border-b-solid cursor-pointer ${tab === 5 ? "text-[#23AAE1] text-[16px] font-[600] leading-6 border-[#23AAE1] bg-[#F2FBFF]" : "text-[#6B7280] text-[16px] font-[400] leading-6 border-[#E6E7E8]"}`}>
          Device
        </p>

      </div>
      <ScrollArea className="pt-11 h-[650px] w-full">
        {
          tab === 0 ?         //----------------------Profile
            <div className="flex flex-col items-center w-full gap-12 px-8">
              <div className="flex flex-col items-center gap-4">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Personal Information</p>
                <PersonalForm setVerifyModal={setVerifyModal} setEmail={setEmail} email={email} />
              </div>
              <div className="flex flex-col items-center gap-4 mb-12">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Password</p>
                <PasswordForm />
              </div>

            </div> : ""
        }
        {
          tab === 1 ?         //----------------------Business Profile
            <div className="flex flex-col items-start w-full pl-8">
              <div className="flex flex-row items-center justify-between w-full gap-1 pr-8">
                <p className="text-[#115570] text-[20px] leading-[125%] font-[600]">
                  {`Business profile for ${merchantList[0]?.businessName ? merchantList[0]?.businessName : ""}`}
                </p>
                <Button
                  asChild
                  className="rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
                >
                  <Link href={"/dashboard/update-about-business/page-one"}>Add new business</Link>
                </Button>
              </div>
              <div className="self-center flex flex-col items-center gap-4 mt-[45px] w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Business information</p>
                <BusinessInfoForm />
              </div>
              <div className="self-center flex flex-col items-center gap-4 mt-[51px] w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Account information</p>
                <AccountInfoForm />
              </div>
            </div> : ""
        }
        {
          tab === 2 ?         //----------------------Business type 
            <div className="flex flex-col items-center w-full px-8">
              <BusinessType />
            </div> : ""
        }
        {
          tab === 3 ?         //----------------------Security 
            <div className="flex flex-col items-start w-full gap-8 pl-8">
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Security</p>
                <Security data={data?.data?.responseObject} />
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Payment</p>
                <Payment data={data?.data?.responseObject} />
              </div>

            </div> : ""
        }
        {
          tab === 4 ?         //----------------------Notification
            <div className="flex flex-col items-center w-full gap-8 pl-8">
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                  Transaction Notification
                </p>
                <TransactionNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                  Transfer Notification
                </p>
                <TransferNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                  How do you want to get your earnings.
                </p>
                <EarningNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                  Enable Notifications
                </p>
                <EnableNotification Notification={Notification} setNotification={setNotification} data={data?.data?.responseObject} />
              </div>
              <Button
                onClick={() => handleNotificationUpdate()}
                className="mb-10 rounded-[8px] w-[225px] h-[48px] bg-[#48B8E6] text-[14px] font-bold text-white leading-normal"
              >
                Update
              </Button>

            </div> : ""
        }
        {
          tab === 5 ?         //----------------------Device
            <div className="flex flex-col items-start w-full gap-8">
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">
                  Comming Soon!
                </p>

              </div>

            </div> : ""
        }
      </ScrollArea>

      {isModalOpen ?
        < VerifyModal email={email} setVerifyModal={setVerifyModal} /> : ""
      }
    </div>)
}








