"use client"

import { Metadata } from "next"
import { Button } from "components/ui/button"
import { Typography } from "components/ui/Typography"
import SubNav from "./components/sub-nav"
import * as React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import CreateInvoice from "./components/create-invoice"

export const metadata: Metadata = {
  title: "Transaction",
  description: "Transaction page",
}

const Transaction = () => {
  const [position, setPosition] = React.useState("bottom")
  return (
    <div className="flex h-full w-full flex-col items-center pt-[70px]">
      <SubNav />
      <div className="mt-[150px]">
        <CreateInvoice />
      </div>
    </div>
  )
}

export default Transaction
