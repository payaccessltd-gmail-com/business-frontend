import { Metadata } from "next"
import Image from "next/image"
import { Button } from "components/ui/Button/Button"

import { Typography } from "components/ui/Typography"
import { logoPath } from "lib/constants"

export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
}

export default function RegistrationPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-transparent">
      <div className="flex w-[630px] flex-col items-center justify-center bg-transparent pt-12">
        <Image className="mb-12" src={logoPath.src} width={140} height={60} alt={logoPath.alt} />
        <Typography className="mb-4  inline-block  bg-transparent" level="h1">
          Create your Pay Access account
        </Typography>
        <Typography className="mb-12 inline-block" level="h6">
          Create an account with pay access for all your payment trasactions
        </Typography>
      </div>
    </main>
  )
}
