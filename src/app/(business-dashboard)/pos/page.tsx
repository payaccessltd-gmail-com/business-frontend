"use client"

import { Metadata } from "next";
import EmptyState from "./components/EmptyState";
import { Button } from "components/ui/button"
import { MdContactSupport } from "react-icons/md";
import { useState } from "react";
import POSRequestForm from "./components/pos-request-form";
import { z } from "zod"
// export const metadata: Metadata = {
//   title: "Get Started",
//   description: "Business page as it should be",
// };




const posSchem = z.object({
  quantity: z.number(),
  terminalBrand: z.string(),
  merchantId: z.number(),
  terminalType: z.string(),
  iAgree: z.boolean(),
})
export default function POS() {
  const [popup, setPopup] = useState(false);  
  const [modalData, setModalData] = useState<any>("");


 
   
  const  handleModalPOSpopup   = () => {
    console.log("testing");
    
     setPopup((value) => !value);
  } 


 
  return (
    <div className="relative w-full h-full flex flex-col">
      <Button className="fixed z-[1px] right-[42px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal">
      <MdContactSupport className="text-[24px] text-[#fff]" /> Support </Button>
    
      <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">POS Terminals</p>
   
      

      
    <EmptyState handleModalPOSpopup={handleModalPOSpopup} />
        {popup ?  <POSRequestForm handleModalPOSpopup={handleModalPOSpopup} /> :
        ""}
   
  
  </div>
  )
}

