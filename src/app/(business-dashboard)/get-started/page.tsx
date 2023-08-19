"use client"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { Progress } from "components/ui/progress"
import { Label } from "components/ui/label"
import { Typography } from "components/ui/Typography"
import { accordianData } from "./components/accordion-data"
import { useState } from "react"

export default function GetStarted() {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated: () => {
  //     redirect("/login")
  //   },
  // })

  // // eslint-disable-next-line no-lone-blocks
  // {
  //   console.log(session)
  // }

  const [trigger, setTrigger] = useState<string | null>(null)

  const handleTrigger = (value: string | null) => {
    if (trigger === value) {
      setTrigger(null)
    } else {
      setTrigger(value)
    }
  }

  return (
    <div className="flex w-full flex-row">
      <div className="flex w-[70%] flex-col items-center space-y-8 pt-8">
        <div className="w-full max-w-[700px] space-y-2">
          <Typography className="text-center text-3xl font-bold">Welcome to your dashboard</Typography>
          <Typography level="p" className="text-center text-sm font-normal ">
            Your account is currently in test mode, so there are a few more things to do before you can go live and
            start receiving payments.Follow the steps below to get activated.
          </Typography>
        </div>

        <div className=" w-full max-w-[700px]">
          <Accordion type="single" collapsible className="w-full space-y-6">
            {accordianData.map(({ value, Form, Icon, description, label }) => {
              return (
                <AccordionItem key={value} value={value} className="space-y-4 border-none">
                  <AccordionTrigger
                    onClick={() => handleTrigger(value)}
                    className="rounded-xl border-none bg-white px-4 py-3 shadow-form"
                  >
                    <div className="group flex h-full w-full flex-row items-center gap-[12px] rounded-xl bg-white py-2">
                      {/* <Icon value={trigger} /> */}
                      {Icon(trigger === value ? true : false)}
                      <div className="flex flex-col items-start gap-2">
                        <Label
                          className={`font-[inter] text-[14px] font-[600] leading-4 group-hover:text-[#1D8EBB] ${
                            trigger === value ? "text-[#1D8EBB]" : "text-[#353F50]"
                          }`}
                        >
                          {label}
                        </Label>
                        <Typography
                          className={`text-[12px] font-normal leading-4  group-hover:text-[#07222D] ${
                            trigger === value ? "text-[#07222D]" : "text-[#5F738C]"
                          }`}
                          level="p"
                        >
                          {description}{" "}
                        </Typography>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="rounded-xl border border-none border-gray-10 bg-white p-2 shadow-form">
                    <Form />
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
      <div className="mt-[113px] flex w-[30%] flex-col items-center">
        <div className="flex flex-row items-center gap-[10px]">
          <Progress value={60} className=" h-[4px] w-[76px] rounded-[3px] bg-[#D9D9D9]" />
          <p className=" text-[12px] font-[400] leading-normal text-[#333333]">{`${0} of 4 to complete`}</p>
        </div>
      </div>
    </div>
  )
}
