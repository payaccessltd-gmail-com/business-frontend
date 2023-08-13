import Image from "next/image"
import Link from "next/link"

import { Typography } from "components/ui/Typography"
import { login, loginBackground, logoPath } from "lib/constants"
import LoginForm from "./form"

export default function AuthenticationPage() {
  return (
    <div className="flex h-full w-full flex-row ">
      <div className="hidden h-full w-1/2 lg:flex ">
        <Image className="h-full w-full" src={login.src} alt={login.alt} />
      </div>
      <div className="relative h-full w-full lg:w-1/2">
        <Image
          className="absolute left-0 top-0 z-0 h-full w-full"
          src={loginBackground.src}
          alt={loginBackground.alt}
        />
        <div className="flex h-full w-full flex-row items-center justify-center">
          <div className="z-10 flex w-[330px] flex-col items-center sm:w-[468px]">
            <Image className="mb-8" src={logoPath.src} width={140} height={60} alt={logoPath.alt} />
            <Typography className="mb-4  inline-block bg-transparent" level="h1">
              Welcome back!
            </Typography>
            <Typography className="mb-8 inline-block text-center text-[#115570]" level="h6">
              Please provide the information to access your dashboard.
            </Typography>

            {/* logic and control for form signin is located here */}
            <LoginForm />
            <Link href="/" className="mt-[32px] text-sm font-semibold text-primary-70">
              Forget Password
            </Link>
            <div className="mt-4 flex flex-row items-center gap-2">
              <Typography className=" inline-block  bg-transparent text-[#0C394B]" level="h4">
                New to pay access?
              </Typography>
              <Link href="/registration" className=" text-sm font-semibold text-primary-70">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}