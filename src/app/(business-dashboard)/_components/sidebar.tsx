/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";

import { cn } from "lib/utils";
import { ScrollArea } from "components/ui/scroll-area";
import { sidebarData, SvgLogoComponent } from "./sidebar-data";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navArr: typeof sidebarData;
}
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("col-span-4 h-full bg-primary-80", className)}>
      <div className="flex justify-center py-6">
        <SvgLogoComponent />
      </div>
      <div className="flex flex-col h-full space-y-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-[194px] flex-row items-center gap-[14px] self-center text-center text-[16px] font-normal leading-[24px] text-white">
            Goodness Daniel's oil & gas{" "}
            <LuChevronDown className="text-[28px] " />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" sideOffset={20}>
            <DropdownMenuLabel className="text-base font-bold leading-normal text-neutral-800">
              Add new business
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-base font-bold leading-normal text-neutral-800">
              Logout
            </DropdownMenuItem>
            <DropdownMenuItem className="text-center">
              <span className="font-['Raleway'] text-xs font-normal text-orange-500">
                Marchant ID
              </span>
              <span className="text-base font-bold leading-normal text-orange-500 ">
                {" "}
                :{" "}
              </span>{" "}
              <span className="font-['Inter'] text-xs font-normal leading-none text-orange-500">
                234156098
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ScrollArea className="h-[80vh]">
          {sidebarData.map(({ list, section }) => {
            return (
              <div className="h-full py-4" key={section}>
                <div className="flex flex-col space-y-1">
                  {list.map(({ name, SVGIcon, path = "/", tagText = "" }) => {
                    if (name.toLowerCase() === "logout") {
                      return (
                        <Button
                          asChild
                          variant="ghost"
                          key={name}
                          size="lg"
                          onClick={() => {
                            signOut();
                            localStorage.clear();
                          }}
                          className={cn(
                            "w-full justify-start space-x-2 rounded-none text-white text-center",
                            pathname === path
                              ? "bg-white font-semibold hover:bg-primary-50"
                              : "hover:bg-primary-50 hover:text-white active:text-white",
                          )}
                        >
                          <Link key={path} href={path as string}>
                            <SVGIcon
                              isActive={pathname === path}
                              activeColor="#48B8E6"
                              defaultColor="#FFFFFF"
                            />
                            <span>{name}</span>
                          </Link>
                        </Button>
                      );
                    }
                    return (
                      <Button
                        asChild
                        key={name}
                        size="lg"
                        variant="ghost"
                        className={cn(
                          "w-full justify-start space-x-2 rounded-none text-white py-6",
                          pathname === path
                            ? "bg-white font-semibold hover:text-primary-60 text-primary-50"
                            : "hover:bg-primary-50 hover:text-white active:text-white",
                        )}
                      >
                        <Link
                          key={path}
                          href={path as string}
                          className="flex items-center"
                        >
                          <div className="flex items-center space-x-3">
                            <SVGIcon
                              isActive={pathname === path}
                              activeColor="#48B8E6"
                              defaultColor="#FFFFFF"
                            />
                            <span>{name}</span>
                          </div>

                          {tagText ? (
                            <div className="rounded-[36px] border border-secondary-70 bg-secondary-60 px-2.5 py-1.5 text-[8px] font-bold uppercase leading-[7.5px] tracking-[0.5px]">
                              {tagText}
                            </div>
                          ) : null}

                          <span></span>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </nav>
  );
}
