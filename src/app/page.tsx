"use client"

import { Metadata} from "next"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import { Button } from "components/ui/Button/Button"
export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
}

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/login")
  }, [])


  return <main>Market page coming soon</main>
}
