import Image from "next/image"
import Link from "next/link"
import sideBg from "../../../assets/img/login/login-bg.png"
import { Typography } from "components/ui/Typography"
import { MdLock } from "react-icons/md"
import { LuChevronLeft } from "react-icons/lu"
import OTPForm from "./form"
import { BackButton } from "../_components/back-button"

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-row w-full h-full ">
      <div className={`lg:flex hidden overflow-hidden login-bg relative w-1/2 h-full pt-[70vh] bg-primary/20 flex-col`}>
        <Image className="absolute z-0 top-10" src={sideBg} alt={"sidebg"} />
        <div className="absolute left-0 top-[229px] w-[55%] z-0 h-[126px] bg-primary rounded-r-[42px]"></div>
        <div className="z-[1] ml-[125px] flex flex-col items-start gap-4 w-[361px]">
          <p className="text-[24px] font-[700] leading-[125%] text-foreground">Easy payment method</p>
          <p className="text-[14px] font-[400] leading-[145%] text-foreground">
            Create an account with pay access for all your payment transactions pay access for all your payment trasactions
          </p>
        </div>
      </div>
      <div className="relative flex flex-col lg:w-1/2 w-full h-full items-center justify-center xl:px-[160px] lg:px-[100px] md:px-[120px] sm:px-[200px] px-[20px]">
        <BackButton />
        {/* <Image className="mb-8" src={lock} alt={"lock"} /> */}
        <div className="mb-[13px]  rounded-full h-[92px] w-[92px] bg-primary/10 flex flex-row items-center justify-center">
          <MdLock className="text-[50px] text-primary" />
        </div>
        <Typography className="text-center mb-4 text-[32px] leading-[40px] font-black inline-block bg-transparent" level="h1">
          Reset Password
        </Typography>
        <Typography className="mb-8 inline-block text-[14px] text-center font-[400] leading-[145%]" level="h6">
          Create a new password
        </Typography>

        {/* logic and control for form signin is located here */}
        <OTPForm />
      </div>
    </div>
  )
}
