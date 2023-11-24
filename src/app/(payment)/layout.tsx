import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Payment",
    description: "Payment page",
}

export default function PaymentLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative w-full">
            {children}
        </div>
    )
}