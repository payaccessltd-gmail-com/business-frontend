import { Metadata } from "next"
import { Raleway } from "next/font/google"
import localFont from "next/font/local"
import "@styles/globals.css"

export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
}

//font files can be colocated inside of `app`
const raleway = Raleway({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-raleway",
})

const sfpro = localFont({
  display: "swap",
  variable: "--font-sf-pro-display",
  src: [
    { path: "../assets/fonts/sf-pro-display-thin-webfont.woff2", weight: "100", style: "normal" },
    { path: "../assets/fonts/sf-pro-display-ultralight-webfont.woff2", weight: "200", style: "normal" },
    { path: "../assets/fonts/sf-pro-display-light-webfont.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/sf-pro-display-regular-webfont.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/sf-pro-display-medium-webfont.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/sf-pro-display-semibold-webfont.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/sf-pro-text-bold-webfont.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/sf-pro-text-heavy-webfont.woff2", weight: "900", style: "normal" },
  ],
})
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${sfpro.variable}`}>
      <body className="font-raleway">{children}</body>
    </html>
  )
}
