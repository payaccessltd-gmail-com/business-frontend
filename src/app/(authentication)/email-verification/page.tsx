import * as React from "react"

import { buttonVariants } from "components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { Typography } from "components/ui/Typography"
import { logoPath } from "lib/constants"

import { cn } from "lib/utils"

export default function CardWithForm() {
  return (
    <main className="flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <div className="flex w-[550px] flex-col items-center justify-center  bg-transparent py-8">
        <Image className="mb-8" src={logoPath.src} width={130} height={60} alt={logoPath.alt} />
        <Typography className="mb-4  inline-block bg-transparent" level="h1">
          Verify your email address
        </Typography>
        <Typography className="mb-12 inline-block" level="h6">
          To continue with the registration pls verify your email address
        </Typography>

        <Card className="border-none px-20 shadow-card">
          <CardHeader className="flex flex-col items-center">
            <CardTitle>
              <span className="inline-block rounded-full bg-primary-10 p-4 shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <mask
                    id="mask0_511_18316"
                    // style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="2"
                    y="4"
                    width="44"
                    height="41"
                  >
                    <path
                      d="M44 24V40.818C44 42.023 43.105 43 42 43H6C4.895 43 4 42.023 4 40.818V24L24 37L44 24Z"
                      stroke="white"
                      stroke-width="3"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 23.7841L14 16.8921M44 23.7841L34 16.8921"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M34 5H14V29.415C14 29.7482 14.0832 30.0761 14.2421 30.369C14.4011 30.6619 14.6306 30.9104 14.91 31.092L22.91 36.292C23.2344 36.5029 23.6131 36.6151 24 36.6151C24.3869 36.6151 24.7656 36.5029 25.09 36.292L33.09 31.092C33.3694 30.9104 33.5989 30.6619 33.7579 30.369C33.9168 30.0761 34 29.7482 34 29.415V5Z"
                      fill="white"
                      stroke="white"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 13H24M20 19H28"
                      stroke="black"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </mask>
                  <g mask="url(#mask0_511_18316)">
                    <path d="M0 0H48V48H0V0Z" fill="#177196" />
                  </g>
                </svg>
              </span>
            </CardTitle>
            <Link
              href={"/"}
              className={cn(buttonVariants({ variant: "link" }), "px-0 text-sm font-semibold text-primary-80")}
            >
              Verify your email address
            </Link>
          </CardHeader>
          <CardContent className="w-[386px]">
            <Typography level="p" className="text-center text-sm leading-6 text-gray-60">
              A link has been sent to your email address{" "}
              <span className="font-semibold text-gray-70"> “goodness12@gmail.com”</span> please click on the link to
              verify your email.
            </Typography>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Typography level="p" className="text-xs text-gray-90">
              Didn’t get the mail?{" "}
              <Link
                href={"/"}
                className={cn(buttonVariants({ variant: "link" }), "px-0 text-sm font-semibold text-primary-70")}
              >
                click here
              </Link>{" "}
              to resend.
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
