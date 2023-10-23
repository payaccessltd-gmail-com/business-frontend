"use client"

import React from 'react'
import Link from "next/link"
import { LuChevronLeft } from "react-icons/lu"
import { CreateInvoice } from './components/create-invoice-modal'


const GenerateInvoice = () => {
  return (
    <div className='relative flex flex-col w-full h-full pt-[85px] px-[100px]'>
      <Link href={"/invoice"} className="cursor-pointer absolute sm:left-[74px] left-[20px] top-[52px] flex flex-row items-center gap-[7px] text-[14px] font-[400] leading-[145%] text-[#000000]">
        <LuChevronLeft className="text-[24px] text-[#000000]" />
        Back
      </Link>
      <div className='mt-[40px] mb-[51px] flex flex-col items-start gap-2'>
        <p className='text-[#000000] text-[20px] font-[700]'>Create an Invoice</p>
        <p className='text-[#000000] text-[16px] font-[400]'>Receive payments from your clients using our invoice.</p>
      </div>
      <div className='w-full flex flex-col items-center'>
        <CreateInvoice />
      </div>
    </div>
  )
}

export default GenerateInvoice