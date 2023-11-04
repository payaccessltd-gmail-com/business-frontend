"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "lib/utils";
import { LuEyeOff, LuEye } from "react-icons/lu";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: "show" | "hide"; // Add the 'icon' prop
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const [inputType, setInputType] = useState(
      type === "password" && icon === "show" ? "password" : type,
    );
    const [inputchange, setInputChange] = useState(
      type === "password" && icon === "show" ? "password" : type,
    );

    React.useEffect(() => {
      inputType !== inputchange ? setInputType(inputchange) : null;
    }, [inputchange]);

    // Define a variable to store the input type (password or text)

    const handleVisibility = (value: string) => {
      if (value === "show" && inputType === "password") {
        setInputChange("text");
        setShow(true);
      } else if (value === "close" && inputType === "text") {
        setInputChange("password");
        setShow(false);
      }
    };
    return (
      <div className="relative">
        <input
          type={inputType} // Use the input type based on 'icon' prop
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && ( // Only show the eye icon for password fields
          <div className="absolute inset-y-0 flex items-center right-2">
            {show ? (
              <button type="button" onClick={() => handleVisibility("close")}>
                <LuEyeOff className="text-[#757575] text-[16px]" />
              </button>
            ) : (
              <button type="button" onClick={() => handleVisibility("show")}>
                <LuEye className="text-[#757575] text-[16px]" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
