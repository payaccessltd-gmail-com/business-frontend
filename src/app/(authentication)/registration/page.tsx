import type { Metadata } from "next"
import Image from "next/image"
import { Typography } from "components/ui/Typography"

import { logoPath } from "lib/constants"
import RegistrationForm from "./form"

export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
}

export default function RegistrationPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-transparent">
      <div className="flex w-[550px] flex-col items-center justify-center  bg-transparent py-8">
        <Image className="mb-8" src={logoPath.src} width={130} height={60} alt={logoPath.alt} />
        <Typography className="mb-4  inline-block bg-transparent" level="h1">
          Create your Pay Access account
        </Typography>
        <Typography className="mb-12 inline-block" level="h6">
          Create an account with pay access for all your payment trasactions
        </Typography>

        <RegistrationForm />
      </div>
    </main>
  )
}
