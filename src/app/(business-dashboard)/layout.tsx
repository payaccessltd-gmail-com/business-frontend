/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "components/ui/scroll-area";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { sidebarData } from "./_components/sidebar-data";
import { useEffect, useState } from "react";
import Preloader from "./preloader";

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
  const [isOpen, setOpen] = useState<boolean>(true)
  // const [loading, setLoading] = useState<boolean>(false);

  //---------------------Setting Preloader Listeners
  // useEffect(() => {
  //   const handleStart = (url: any) => (url !== router.asPath) && setLoading(true);
  //   const handleComplete = (url: any) => (url === router.asPath) && setTimeout(() => setLoading(false), 5000);

  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleComplete);
  //   router.events.on('routeChangeError', handleComplete);

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //     router.events.off('routeChangeComplete', handleComplete);
  //     router.events.off('routeChangeError', handleComplete);
  //   };
  // }, [router]);





  return (
    <div className="grid overflow-hidden lg:h-screen lg:grid-cols-24">
      <aside className={`h-full overflow-hidden bg-primary-110 transition-all ${!isOpen ? "col-span-1" : "col-span-4"}`}>
        <Sidebar isOpen={isOpen} setOpen={setOpen} navArr={sidebarData} />
      </aside>
      <div className={`relative h-full ${!isOpen ? "lg:col-span-23 col-span-3" : "lg:col-span-20 col-span-3"}`}>
        <Header />
        <ScrollArea>
          <main className="h-[calc(100vh-84px)] overflow-visible bg-sky-50 bg-opacity-30 px-12 py-4">
            {/* {loading && <Preloader />} */}
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
