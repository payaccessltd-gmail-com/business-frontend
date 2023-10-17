import React from "react"
import Image from "next/image"
import GetStartedBg from "../../../../assets/img/home-getstarted/get-started.png"
import Hero from "../../../../assets/img/home-getstarted/hero.png"
import TextImg from "../../../../assets/img/home-getstarted/text.png"
import { Typography } from "components/ui/Typography"
import { Button } from "components/ui/button"
import Link from "next/link"



const GetStarted = () => {
  return (
    <div className="pl-[100px] max-[1100px]:pr-[100px] max-[924px]:p-[24px] max-[1100px]:pt-[10px] relative flex max-[1100px]:h-fit h-[621px] w-full max-[1100px]:flex-col items-center max-[1100px]:items-start">
      <Image className="absolute left-0 top-0 z-0 h-full w-full" src={GetStartedBg} alt={"bg"} />
      <div className="z-[1] flex max-[1100px]:w-full w-[606px] flex-col items-start">
        <Image className="mb-[16px]" src={TextImg} alt={"Get payment"} />
        <Typography level="p" className="max-[494px]:w-[350px] max-[1100px]:w-[450px] mb-[23px] text-left text-[14px] font-[400] leading-[140%] text-[#222]">
          Pay access Certainly! I can provide you with information about payment transactions. or question you have
          regarding payment transactions, and I'll be glad to assist you.
        </Typography>
        <Button asChild className="h-[54px] max-[1100px]:w-full w-[192px] rounded-[8px] font-DMSans text-[16px] font-[700] leading-[18px] text-[#ffffff] shadow-none">
          <Link href={"/registration"}>
            Get Started
          </Link>
        </Button>
      </div>
      <Image className="z-10 max-[1100px]:mt-[75px] max-[1100px]:self-center relative xl:absolute bottom-0 2xl:right-0 right-[60px] h-auto max-w-[100%]" src={Hero} alt={"Hero"} />
    </div>
  )
}

export default GetStarted
