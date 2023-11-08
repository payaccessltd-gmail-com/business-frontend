/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "components/ui/scroll-area";

import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { sidebarData } from "./_components/sidebar-data";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuth = false;
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    // LocalStorage is available, perform operations
    // Read or write data using window.localStorage
    isAuth = !!localStorage.getItem("token");
  }

  if (!isAuth && typeof window !== "undefined") {
    router.push("/login");
  }

  return (
    <div className="grid overflow-hidden lg:h-screen lg:grid-cols-24">
      <aside className="h-full col-span-4 overflow-hidden bg-primary-110">
        <Sidebar navArr={sidebarData} />
      </aside>
      <div className="relative h-full col-span-3 lg:col-span-20">
        <Header />
        <ScrollArea>
          <main className="h-[calc(100vh-84px)] overflow-visible  bg-sky-50 bg-opacity-30 px-12 py-4">
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
