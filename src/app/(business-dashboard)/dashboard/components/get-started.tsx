"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "api/user-management";
import { Typography } from "components/ui/Typography";
import { useUserStore, useMerchantStore, useHydrateStore } from "store";
import { getMerchantByMerchantCode } from "api/merchant-management";
import { Button } from "components/ui/button";
import Link from "next/link";

type Props = {};

export default function CustomerName({ }: Props) {
    // let token: string = "";
    // const { setUser } = useUserStore();
    // const { setCurrentMerchantDetails } = useMerchantStore();

    // if (
    //     typeof window !== "undefined" &&
    //     typeof window.localStorage !== "undefined"
    // ) {
    //     token = localStorage.getItem("token") as string;
    // }

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ["user-details"],
    //     queryFn: async () => {
    //         const res = await getUserInfo(token);

    //         const userRes = (await res.json()) as API.UserDetailsResponse;
    //         setUser(userRes.responseObject);

    //         return userRes;
    //     },
    // });

    // console.log(data, 'frooooo');


    // const currentMerchant = useHydrateStore(
    //     useMerchantStore,
    //     (state) => state.currentMerchant,
    // );

    // const merchantDetails = useQuery({
    //     queryKey: ["merchant-details", currentMerchant?.merchantCode],
    //     queryFn: () =>
    //         getMerchantByMerchantCode(currentMerchant?.merchantCode as string, token),
    //     enabled: currentMerchant?.merchantCode ? true : false,
    //     onSuccess: async (data) => {
    //         const res = (await data.json()) as API.GetMerchantByMerchantCodeDTO;

    //         if (res.statusCode === "0") {
    //             setCurrentMerchantDetails(res.responseObject[0]);
    //         }
    //     },
    // });

    // if (isLoading) return <div></div>;
    // if (error) return "An error has occurred: " as string;


    return (
        <Button
            asChild
            variant="ghost"
            key={"get-started"}
            size="lg"
            className="rounded-lg bg-secondary-60 py-2.5 font-bold text-white"
        >
            <Link key={"/"} href="/dashboard/update-about-business/page-one">
                Get started
            </Link>
        </Button>
    );
}
