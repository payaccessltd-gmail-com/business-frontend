import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Label } from "components/ui/label";
import { Switch } from "components/ui/switch";

import { Notification } from "./notification";
import { SearchInput } from "./search-input";

import { useHydrateStore, useUserStore } from "store"
import { extractInitials } from "utils/extractInitials";


export function Header() {

  const userDetail = useHydrateStore(useUserStore, (state) => state.user);

//   const userData :API.UserDetails = useUserStore 
// console.log(userData.state);

  return (
    <header className="bg-white border-b border-gray-200 ">
      <div className="flex flex-row justify-between mx-10 my-5">
        <SearchInput />

        <div className="flex items-center space-x-12">
          {userDetail?.userStatus =="ACTIVE"?
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="test-mode"
              className="inline-block text-[13px] font-semibold text-primary-70"
            >
              Live mode
            </Label>
            <Switch disabled checked={true}
              id="test-mode"
              className="inline-block data-[state=checked]:bg-primary-70"
            />
          </div>
:
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="test-mode"
              className="inline-block text-[13px] font-semibold text-primary-70"
            >
              Test mode
            </Label>
            <Switch disabled checked={false}
              id="test-mode"
              className="inline-block data-[state=checked]:bg-primary-70"
            />
          </div>}

          <div className="flex items-center justify-between space-x-6">
            <Notification />
            <Avatar>
              <AvatarImage width="36" height="36" alt="avatar-image" />

              <AvatarFallback>
                <span>{extractInitials(`${userDetail?.firstName} ${userDetail?.lastName}`)}</span>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
