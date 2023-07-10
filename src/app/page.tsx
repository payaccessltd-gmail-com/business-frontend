import { Metadata } from "next"
import { Button } from "components/ui/Button/Button"
export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
}

export default function RootPage() {
  return (
    <main>
      <h1>Hello world</h1>
      <Button href={""}>Welcome</Button>
    </main>
  )
}
