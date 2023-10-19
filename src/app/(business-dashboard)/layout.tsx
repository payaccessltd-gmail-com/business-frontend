/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client"

import { ScrollArea } from "components/ui/scroll-area"


import { Header } from "./_components/header"
import { Sidebar } from "./_components/sidebar"
import { sidebarData } from "./_components/sidebar-data"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid overflow-hidden lg:h-screen lg:grid-cols-24">
      <aside className=" col-span-4 h-full overflow-hidden bg-primary-110">
        <Sidebar navArr={sidebarData} />
      </aside>
      <div className="relative col-span-3 h-full lg:col-span-20">
        <Header />
        <ScrollArea>
          <main className="h-[calc(100vh-84px)] overflow-visible  bg-sky-50 bg-opacity-30 px-12 py-4">{children}</main>
        </ScrollArea>
      </div>
    </div>
  )
}
