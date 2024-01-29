"use client"

import { Redirect } from "next"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {


    if(mode === "modal"){
        <span>
            Start Up
        </span>

    }

    const onClick = ()=> {
        console.log("Login is clicked");
        
    }

  return ( 
  <span onClick={onClick} className="cursor-pointer">{children}</span>)
}
