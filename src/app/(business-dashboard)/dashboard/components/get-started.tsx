"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "api/user-management";
import { Typography } from "components/ui/Typography";
import { useUserStore, useMerchantStore, useHydrateStore } from "store";
import { getMerchantByMerchantCode } from "api/merchant-management";
import { Button } from "components/ui/button";
import Link from "next/link";

type Props = {};

export default function CustomerName({ }: Props) {
    const [shouldUpdateBusiness, setShouldUpdateBusiness] = useState<boolean | undefined>()
    const [businessLink, setBusinessLink] = useState<string>()
    // @ts-ignore
    const state = useHydrateStore(useMerchantStore, (state) => state);
    const { user } = useUserStore();
    console.log(user,'eee');
    

    // function checkInfoSet(obj: API.MerchantDetails) {

    //     console.log(obj,'obj');

    //     return res;
    // }
    // console.log(state?.currentMerchantDetails, state?.merchants);

    useEffect(() => {
        if (!state?.currentMerchantDetails?.accountInfoSet || !state?.currentMerchantDetails?.businessInfoSet || !state?.currentMerchantDetails?.personalInfoSet) {
            setShouldUpdateBusiness(true)
        }
        if (state?.currentMerchantDetails?.businessType === 'INDIVIDUAL') {
            setBusinessLink('/dashboard/unregistered-business')
        } else {
            setBusinessLink('/dashboard/registered-business')
        }
    }, [])



    return (
        <>
            {
                //@ts-ignore
                state?.merchants?.length < 2 && <Button
                    asChild
                    variant="ghost"
                    key={"get-started"}
                    size="lg"
                    className="rounded-lg bg-secondary-60 py-2 font-bold text-white"
                >
                    <Link key={"/"} href={`${shouldUpdateBusiness && user?.softwareDeveloper ? businessLink : '/dashboard/update-about-business/page-one'}`}>
                        {shouldUpdateBusiness && user?.softwareDeveloper ? 'Continue business update' : 'Get started'}
                    </Link>
                </Button>
            }
        </>
    );
}
