"use client"

import { Metadata } from "next"
import { useState } from "react"

import { Button } from "components/ui/button"
import { Typography } from "components/ui/Typography"
import AddExistingAccounts from "./components/add-existing-account"
import CreateAddBusiness from "./components/create-add-business"
import CreateNewBusiness from "./components/create-new-business"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Business page as it should be",
}

export default function Dashboard() {
  const [createBusiness, setCreateBusiness] = useState(0)

  return (
    <div className="relative flex h-full w-full flex-col items-center pt-[48px]">
      <Typography level="p" className="mb-[24px] text-center text-[24px] font-[500] leading-[147%] text-[#0C394B]">
        New Business account
      </Typography>
      <div>
        <CreateAddBusiness createBusiness={createBusiness} setCreateBusiness={setCreateBusiness} />
      </div>
      {createBusiness ? (
        <div className="mt-[32px]">
          <CreateNewBusiness />
        </div>
      ) : (
        <div className="mt-[32px]">
          <AddExistingAccounts />
        </div>
      )}

      <Button className="absolute bottom-0 right-0">Need Help?</Button>
    </div>
  )
}
