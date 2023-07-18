import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registration",
  description: "Registration where all the business are being registereed",
}

export default function RegistrationLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative bg-gradient-body font-raleway">
      <div className="absolute -top-8 -z-10 h-96 w-full rounded-b-[100%] bg-gradient-blue blur-2xl"></div>
      <div className="bg-gradient-yellow absolute top-96 -z-10 h-96 w-3/5 rotate-[-20deg] rounded-full"></div>
      {children}
    </div>
  )
}
