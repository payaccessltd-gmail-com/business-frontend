"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "components/ui/navigation-menu"

import { Button } from "components/ui/button"
import logo from "../../../assets/img/payaccess-logo.png"
import Image from "next/image"

export const Nav = () => {
  return (
    <div className="flex h-[104px] w-[100%] flex-row items-center justify-between px-[100px] shadow-[0px_4px_8px_0px_rgba(50,50,71,0.06)]">
      <Image height={52} width={43} src={logo} alt={"PayAcess"} />

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
              Product
            </NavigationMenuTrigger>
            <NavigationMenuContent>mmm</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
              Developers
            </NavigationMenuTrigger>
            <NavigationMenuContent>hhh</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">
              Help
            </NavigationMenuTrigger>
            <NavigationMenuContent>hhh</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-DMSans text-[18px] font-[400] leading-[20px] text-[#0C394B]">Company</NavigationMenuTrigger>
            <NavigationMenuContent>hhh</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button asChild className="h-[54px] w-[121px] rounded-[8px] font-DMSans text-[16px] font-[700] leading-[18px] text-[#ffffff] shadow-none">
        <Link href={"/login"}>
          Login
        </Link>
      </Button>
    </div>
  )
}
