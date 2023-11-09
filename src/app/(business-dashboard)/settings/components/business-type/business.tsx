
"use client"

import { Checkbox } from "components/ui/checkbox"


import React from 'react'

export default function BusinessType() {



    return (
        <div className="flex flex-col items-start gap-4 w-[55%]">
            <p className="text-[#0C394B] text-[16px] leading-[150%] font-[600]">Business type</p>
            <div className='p-9 w-full flex flex-col items-start gap-6 rounded-[10px] bg-white shadow-[0px_4px_8px_0px_rgba(241,241,241,0.99)]'>
                <div className='flex flex-row items-start gap-2'>
                    <Checkbox id="terms1" className="w-[20px] h-[20px]" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-[14px] font-[600] leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Registered Business
                        </label>
                        <p className="text-[14px] text-[#555555] font-[400] leading-[145%]">
                            Requires two factor authtication anything you log in
                        </p>
                    </div>
                </div>
                <div className='flex flex-row items-start gap-2'>
                    <Checkbox id="terms1" className="w-[20px] h-[20px]" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-[14px] font-[600] leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Started / unregistered Business
                        </label>
                        <p className="text-[14px] text-[#555555] font-[400] leading-[145%]">
                            Email my customers for every transactions
                        </p>
                    </div>
                </div>
                <div className='flex flex-row items-start gap-2'>
                    <Checkbox id="terms1" className="w-[20px] h-[20px]" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-[14px] font-[600] leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            NGO
                        </label>
                        <p className="text-[14px] text-[#555555] font-[400] leading-[145%]">
                            Email my customers for every transactions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}














