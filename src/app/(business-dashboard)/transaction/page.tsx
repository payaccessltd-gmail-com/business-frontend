
import { Metadata } from "next"
import * as React from "react"
import CreateInvoice from "./components/create-invoice"
import SubNav from "./components/sub-nav"

export const metadata: Metadata = {
  title: "Transaction",
  description: "Transaction page",
}

const Transaction = () => {

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
