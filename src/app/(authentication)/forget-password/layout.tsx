import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Forgotten password",
}

export default function RegistrationLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="w-full h-full">{children}</div>
}
