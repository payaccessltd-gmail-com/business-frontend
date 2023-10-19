import Image from "next/image";
import Link from "next/link";
import { AiOutlineEyeInvisible } from "react-icons/ai"


import handWithWallet from "assets/img/dashboard-hero/hand-with-wallet.svg"
import { Button } from "components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"
import { Typography } from "components/ui/Typography";

import Payment from "./components/payment";
import PaymentIssues from "./components/payment-issues";
import ReportOverview from "./components/report-overview";
import TransactionSuccessRate from "./components/transaction-success-rate";



export default function Dashboard() {

  return (
    <div className="space-y-5 pb-5">
      <div className="relative flex h-full w-full flex-col space-y-5">
        <Typography level="h3">Dashboard</Typography>
        <div className="flex w-full flex-row justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Typography>
                Total Balance
              </Typography>
              <AiOutlineEyeInvisible />
            </div>

            <Typography className="first-letter:line-through">
              N 0.000
            </Typography>
          </div>

          <div className="ml-auto">
            <Select>
              <SelectTrigger className="w-28 border-0 shadow-none outline-none">
                <SelectValue className='border-0 font-PlusJakartaSans text-[12px] font-medium leading-5 outline-none ring-0' placeholder="This month" defaultValue={"This month"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="7days">This month</SelectItem>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="10days">This year</SelectItem>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="30days">Today</SelectItem>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="1month">Custom</SelectItem>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="20">This week</SelectItem>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="21">Last week</SelectItem>
                  <SelectItem className='font-PlusJakartaSans text-[12px] font-medium leading-5' value="23">All time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
          </div>
        </div>

        <div className="flex justify-between rounded-2xl bg-gradient-to-r from-sky-200 to-cyan-700 px-7 py-1">
          <div className="flex flex-col items-start space-y-4 py-5">
            <Typography level={"h5"} className="font-bold text-primary-100">
              Welcome back Goodness oluwatobi,
            </Typography>

            <Typography className="text-primary-100">
              Activate your business to start receiving payment form <br /> your account.
            </Typography>

            <Button
              asChild
              variant="ghost"
              key={"get-started"}
              size="lg"
              className="rounded-lg bg-secondary-60 py-2.5 font-bold text-white"
            >
              <Link key={"/"} href="">
                Get started
              </Link>
            </Button>
          </div>

          <div className="pr-5">
            <Image
              src={handWithWallet}
              width={200} height={180}
              alt="hand-holding-wallet" />
          </div>
        </div>
      </div>

      {/* cardianal chart display and transaction success rate display */}
      <div className="flex flex-row space-x-5">
        <ReportOverview />
        <TransactionSuccessRate />
      </div>

      <div className="flex flex-row space-x-5">
        <Payment />
        <PaymentIssues />
      </div>
    </div>
  )
}
