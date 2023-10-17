import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"


export function Notification() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="relative">
        <IoNotificationsOutline className="text-[28px] text-neutral-400" />
        <span className='absolute -right-2 -top-2 flex items-center space-x-1'>
          <span className='h-3 w-3 rounded-full bg-red-700'></span>
          <span className='text-[12px] text-primary'>2</span>
        </span>

      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" sideOffset={5}>
        <DropdownMenuLabel  ></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-base font-bold leading-normal text-neutral-800"></DropdownMenuItem>
        <DropdownMenuItem className="text-center"></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}