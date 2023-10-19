import Image from 'next/image'
import React from 'react'

import avatar from "assets/img/dashboard-header/avatar.png"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Label } from "components/ui/label"
import { Switch } from "components/ui/switch"

import { Notification } from './notification'
import { SearchInput } from './search-input'


export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white ">
      <div className='mx-10 my-5 flex flex-row justify-between'>

        <SearchInput />

        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2">
            <Label htmlFor="test-mode" className="inline-block text-[13px] font-semibold text-primary-70">
              Test mode
            </Label>
            <Switch id="test-mode" className="inline-block data-[state=checked]:bg-primary-70" />
          </div>

          <div className='flex items-center justify-between space-x-6'>
            <Notification />
            <Avatar>
              <AvatarImage
                width="36"
                height="36"
                alt="avatar-image" />

              <AvatarFallback>
                <Image src={avatar}
                  width="36"
                  height="36"
                  alt="avatar-image" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>


    </header>
  )
}
