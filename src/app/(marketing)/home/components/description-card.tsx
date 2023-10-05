import React from 'react'
import Image from "next/image"
import { Typography } from "components/ui/Typography"
import Link from "next/link"
import { LuChevronRight } from "react-icons/lu"



const DescriptionCard = ({ title, subtitle, text, linktext, link, direction, img }: any) => {
    return (
        <div className={`flex items-center gap-8 ${direction === "reverse" ? "flex-row-reverse" : "flex-row"}`}>
            <div className='flex flex-col items-start gap-4 w-[494px]'>
                <Typography level="p" className="text-start text-[40px] font-black leading-[118%] text-[#0C394B]">
                    {title}
                </Typography>
                <Typography level="p" className="text-start text-[16px] font-[600] leading-[184%] text-[#000000] font-raleway">
                    {subtitle}
                </Typography>
                <Typography level="p" className="text-start text-[14px] font-[400] leading-[184%] text-[#1A1A1A] font-raleway">
                    {text}
                </Typography>
                <Link className='flex flex-row gap-2 items-center text-[#23AAE1] text-[14px] leading-5 font-[700]' href={link}>
                    {linktext}
                    <LuChevronRight className='text-[24px] text-[#23AAE1]' />
                </Link>
            </div>
            <Image className="h-auto max-w-[439px]" src={img} alt={"Featured Icon"} />

        </div>
    )
}

export default DescriptionCard