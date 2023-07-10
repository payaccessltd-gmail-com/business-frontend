/* eslint-disable tailwindcss/no-custom-classname */
import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const buttonVarients = cva(
  "justify-center inline-flex items-center rounded-lg text-center border font-semibold text-base cursor-pointer",

  {
    variants: {
      intent: {
        primary: "bg-secondary-60 text-white hover:bg-secondary-70",
        secondary: "bg-transparent text-secondary-60",
        text: "text-secondary-60 border-none",
      },
      shade: { dark: "bg-secondary-70", light: "bg-secondary-60", none: "" },
      size: {
        small: "min-w-20 h-full min-h-10 text-sm py-1.5 px-4",
        normal: "p-3",
        large: " h-full min-h-12 py-3 px-24",
      },
      underline: { true: "underline", false: "" },
    },
    defaultVariants: {
      intent: "primary",
      size: "normal",
      shade: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVarients> {
  underline?: boolean
  href: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return (
    <a className={twMerge(buttonVarients({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  )
}
