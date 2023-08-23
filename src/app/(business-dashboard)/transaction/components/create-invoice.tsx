"use client"

import { Button } from "components/ui/button"
import { Typography } from "components/ui/Typography"
import { LuFolder } from "react-icons/lu"

const CreateInvoice = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex h-[109px] w-[114px] flex-row items-center justify-center rounded-[11px] bg-[#FFF6EF] ">
        {" "}
        <LuFolder className="text-[66px] text-[#F38020]" />
      </div>
      <Typography level={"p"} className="mt-[18px] text-center text-[24px] font-semibold leading-8 text-[#07222D]">
        You have no transactions in the last few days, but you can change that.
      </Typography>
      <Typography level={"p"} className="mt-[10px] text-center text-[16px] font-normal leading-5 text-[#555555]">
        create a payment link or send them invoices.
      </Typography>
      <Button className="mt-[52px] h-[48px] w-[244px] text-[14px] font-semibold leading-normal text-[#ffffff]">
        Create Invoice
      </Button>
    </div>
  )
}

export default CreateInvoice
