import Image from "next/image";
import Link from "next/link";
import { AiOutlineEyeInvisible } from "react-icons/ai"


import handWithWallet from "assets/img/dashboard-hero/hand-with-wallet.svg"
import { Button } from "components/ui/button"
import { Typography } from "components/ui/Typography";

import ReportOverview from "./components/report-overview";
import TransactionSuccessRate from "./components/transaction-success-rate";



export default function Dashboard() {

  return (
    <div>
      <div className="relative flex h-full w-full flex-col">
        <Typography level="h3" className="mb-4" >Dashboard</Typography>

        <div className="flex flex-row justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span>
                Total Balance
              </span>

              <AiOutlineEyeInvisible />

            </div>

            <span className="first-letter:line-through">
              N 0.000
            </span>
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
      <div className="flex flex-row">
        <ReportOverview />
        <TransactionSuccessRate />

      </div>

      <div>


      </div>
    </div>
  )
}
