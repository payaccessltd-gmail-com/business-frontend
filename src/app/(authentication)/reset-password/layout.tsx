import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ResetPassword",
  description: "Enter email to reset password",
}

export default function RegistrationLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="relative h-screen bg-gradient-body font-raleway">{children}</div>
}
