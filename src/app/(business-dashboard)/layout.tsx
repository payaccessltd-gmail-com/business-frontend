"use client"

import { Avatar, AvatarFallback } from "components/ui/avatar"
import { Label } from "components/ui/label"
import { ScrollArea } from "components/ui/scroll-area"

import { Switch } from "components/ui/switch"
import { Typography } from "components/ui/Typography"
import { Sidebar } from "./_components/sidebar"
import { sidebarData } from "./_components/sidebar-data"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid overflow-hidden lg:h-screen lg:grid-cols-24">
      <aside className=" col-span-4 h-full overflow-hidden bg-primary-110">
        <Sidebar navArr={sidebarData} />
      </aside>
      <div className="relative col-span-3 h-full lg:col-span-20">
        <svg
          className="absolute -z-10 max-h-screen"
          width="100%"
          height="662"
          viewBox="0 0 1440 662"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1583_87050)">
            <ellipse cx="667.5" cy="-38.5" rx="772.5" ry="600.5" fill="url(#paint0_linear_1583_87050)" />
          </g>
          <defs>
            <filter
              id="filter0_f_1583_87050"
              x="-205"
              y="-739"
              width="1745"
              height="1401"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1583_87050" />
            </filter>
            <linearGradient
              id="paint0_linear_1583_87050"
              x1="-365.182"
              y1="-639"
              x2="1736.05"
              y2="355.133"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#BFEFFF" stopOpacity="0.2" />
              <stop offset="0.192708" stopColor="#CDF2FF" stopOpacity="0.381595" />
              <stop offset="0.848958" stopColor="white" />
              <stop offset="1" stopColor="#2682A1" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute -z-10 max-h-screen"
          width="100%"
          height="1400"
          viewBox="0 0 1440 1401"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1583_88212)">
            <ellipse cx="773.5" cy="700.5" rx="772.5" ry="600.5" fill="url(#paint0_linear_1583_88212)" />
          </g>
          <defs>
            <filter
              id="filter0_f_1583_88212"
              x="-99"
              y="0"
              width="1745"
              height="1401"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1583_88212" />
            </filter>
            <linearGradient
              id="paint0_linear_1583_88212"
              x1="-259.182"
              y1="100"
              x2="1842.05"
              y2="1094.13"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#BFEFFF" stop-opacity="0.2" />
              <stop offset="0.192708" stop-color="#CDF2FF" stop-opacity="0.381595" />
              <stop offset="0.848958" stop-color="white" />
              <stop offset="1" stop-color="#2682A1" />
            </linearGradient>
          </defs>
        </svg>
        <header className="flex items-center justify-between border-b border-gray-10 px-12 py-4">
          <Typography className=" text-2xl font-bold text-primary-80">Get Started</Typography>

          <div className="flex items-center justify-center space-x-32 ">
            <Typography level="p" className="text-sm font-semibold text-gray-60">
              Api Documentation
            </Typography>

            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="test-mode" className="inline-block text-[13px] font-semibold text-secondary">
                  Test mode
                </Label>
                <Switch id="test-mode" className="inline-block data-[state=checked]:bg-secondary" />
              </div>

              <div>
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback>
                    <svg width="44" height="25" viewBox="0 0 44 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="25" height="25" fill="white" fillOpacity="0.01" />
                      <mask id="mask0_1956_2475" maskUnits="userSpaceOnUse" x="1" y="1" width="23" height="23">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.5013 23.9577C6.17304 23.9577 1.04297 18.8276 1.04297 12.4993C1.04297 6.17109 6.17304 1.04102 12.5013 1.04102C18.8296 1.04102 23.9596 6.17109 23.9596 12.4993C23.9596 18.8276 18.8296 23.9577 12.5013 23.9577ZM20.2082 17.8368C21.2596 16.3218 21.8758 14.4819 21.8758 12.498C21.8758 7.32038 17.6785 3.12305 12.5008 3.12305C7.32312 3.12305 3.12579 7.32038 3.12579 12.498C3.12579 14.482 3.74207 16.322 4.79363 17.8372C5.9662 16.289 8.72084 15.6245 12.501 15.6245C16.2809 15.6245 19.0355 16.2889 20.2082 17.8368ZM18.7139 19.5188C18.4076 18.4233 16.2176 17.7078 12.501 17.7078C8.78406 17.7078 6.59404 18.4234 6.2881 19.5191C7.94218 20.9838 10.1176 21.8731 12.5008 21.8731C14.8841 21.8731 17.0597 20.9837 18.7139 19.5188ZM12.5015 6.24927C9.97973 6.24927 8.33484 8.07818 8.33484 10.4159C8.33484 13.9861 10.1691 15.6243 12.5015 15.6243C14.812 15.6243 16.6682 14.0405 16.6682 10.6243C16.6682 8.25091 15.0163 6.24927 12.5015 6.24927ZM10.4177 10.4146C10.4177 12.7784 11.27 13.5396 12.501 13.5396C13.7278 13.5396 14.5843 12.8088 14.5843 10.623C14.5843 9.32132 13.7673 8.3313 12.501 8.3313C11.182 8.3313 10.4177 9.18112 10.4177 10.4146Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_1956_2475)">
                        <rect width="25" height="25" fill="#999999" />
                      </g>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32.041 10.1667L36.9993 15.125L41.9577 10.1667H32.041Z"
                        fill="#999999"
                      />
                    </svg>
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <ScrollArea>
          <main className="h-[calc(100vh-100px)] overflow-visible px-12">{children}</main>
        </ScrollArea>
      </div>
    </div>
  )
}
