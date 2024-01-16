import { Metadata } from "next"
import { Button } from "components/ui/button"
import { MdContactSupport } from "react-icons/md"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { ScrollArea } from "components/ui/scroll-area"
import NavComponent from "./components/nav-component"
import { Suspense } from "react";
import Preloader from "./loading";


export const metadata: Metadata = {
    title: "Settings",
    description: "Pay access settings",
}


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const dropOptions = ["Contact us", "Share feedback", "Resolve a complain"]

    return (
        <div className="relative w-full h-full flex flex-col">
            <Suspense fallback={<Preloader />}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="fixed z-50 right-[72px] bottom-[46px] rounded-[8px] w-[120px] flex flex-row items-center justify-center gap-[9px] bg-[#48B8E6] font-bold text-white leading-normal"
                        >
                            <MdContactSupport className="text-[24px] text-[#fff]" />
                            Support
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className="w-[206px] p-[15px]">
                        <div className='w-full flex flex-col items-center gap-2'>
                            {
                                dropOptions.map((value, id) => {
                                    return <p key={id} className='hover:text-[#F38020] cursor-pointer text-[#777777] text-[14px] font-[700] leading-normal text-start w-full p-[10px]'>
                                        {value}
                                    </p>
                                })
                            }
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Setting</p>
                <NavComponent />
                <ScrollArea className="pt-11 h-[650px] w-full">
                    {children}
                </ScrollArea>
            </Suspense>
        </div>
    )
}































