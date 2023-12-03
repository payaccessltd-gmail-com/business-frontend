"use client"

import { Metadata } from "next";
import EmptyState from "./components/EmptyState";
import { Button } from "components/ui/button"
import { MdContactSupport } from "react-icons/md";

// export const metadata: Metadata = {
//   title: "Get Started",
//   description: "Business page as it should be",
// };

export default function POS() {
  return (
    <div className="relative w-full h-full flex flex-col">
      <Button className="fixed z-[1px] right-[42px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal">
      <MdContactSupport className="text-[24px] text-[#fff]" /> Support </Button>
    
      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">POS Terminals</p>
   
      
    <EmptyState/>
  
  </div>
  )
}

