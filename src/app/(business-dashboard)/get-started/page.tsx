import { Metadata } from "next"
import { Button } from "components/ui/Button/Button"
import { Typography } from "components/ui/Typography"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { Label } from "components/ui/label"

import { accordianData } from "./components/accordion-data"

export const metadata: Metadata = {
  title: "Get Started",
  description: "Business page as it should be",
}

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center space-y-8 pt-8">
      <div className="w-full max-w-[700px] space-y-2">
        <Typography className="text-center text-3xl font-bold">Welcome to your dashboard</Typography>
        <Typography level="p" className="text-center text-sm font-normal ">
          Your account is currently in test mode, so there are a few more things to do before you can go live and start
          receiving payments.Follow the steps below to get activated.
        </Typography>
      </div>

      <div className="accordian-section w-full max-w-[700px]">
        <Accordion type="single" collapsible className="w-full space-y-6">
          {accordianData.map(({ value, Form, Icon, description, label }) => {
            return (
              <AccordionItem value={value} className="space-y-4 border-none">
                <AccordionTrigger className="rounded-xl border-none bg-white px-4 py-3 shadow-form">
                  <div className="row roun flex h-full w-full space-x-3 rounded-xl bg-white py-2">
                    <Icon />
                    <div className="spacing-y-1 flex flex-col items-start">
                      <Label className="text-xs font-normal">{label}</Label>
                      <Typography level="p">{description} </Typography>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="rounded-xl border border-none border-gray-10 bg-white px-2 py-2 shadow-form">
                  <Form />
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
