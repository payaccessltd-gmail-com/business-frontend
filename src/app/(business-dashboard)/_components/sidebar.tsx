"use client"

import { cn } from "lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "components/ui/scroll-area"
import { Button } from "components/ui/button"

import { sidebarData } from "./sidebar-data"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navArr: typeof sidebarData
}
export function Sidebar({ className, navArr }: SidebarProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("col-span-4 h-full bg-primary-110", className)}>
      <div className="h-full space-y-4 pt-4">
        <div>Goodness Daniel's oil & gas</div>
        <ScrollArea className="h-[90%]">
          {sidebarData.map(({ list, section }) => {
            return (
              <div className="py-4" key={section}>
                <div className="space-y-1">
                  {list.map(({ name, svgIcon, path = "/" }) => {
                    return (
                      <Button
                        asChild
                        variant="ghost"
                        key={name}
                        size="lg"
                        className={cn(
                          "w-full justify-start space-x-2 rounded-none text-white",
                          pathname === path
                            ? "bg-primary font-semibold hover:bg-primary-50"
                            : "hover:bg-primary-50 hover:text-white active:text-white"
                        )}
                      >
                        <Link key={path} href={path as string}>
                          {svgIcon}
                          <span>{name}</span>
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </ScrollArea>
      </div>
    </nav>
  )
}
