"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Typography } from "components/ui/Typography";
import { getUserInfo } from "api/user-management";

type Props = {};

export default function CustomerName({}: Props) {
  let token = "";

  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    token = localStorage.getItem("token") as string;
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const res = await getUserInfo(token as string);
      return (await res.json()) as API.UserDetailsResponse;
    },
  });

  if (isLoading) return <div></div>;
  if (error) return "An error has occurred: " as string;

  return (
    <Typography level={"h5"} className="font-bold text-primary-100">
      Welcome back {data?.responseObject?.firstName}{" "}
      {data?.responseObject?.lastName},
    </Typography>
  );
}
