/* eslint-disable tailwindcss/no-custom-classname */
import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const typographyVarients = cva(
  "text-primary-70",

  {
    variants: {
      intent: {},
      level: {
        h1: "text-2xl font-bold",
        h2: "",
        h3: "",
        h4: "",
        h5: "",
        h6: "text-sm font-semibold",
        p: "text-",
      },
      shade: {
        70: "bg-primary-70",
        60: "bg-primary-60",
        100: "bg-primary-100",
        none: "",
      },
      size: {
        small: "",
        normal: "",
        large: "",
      },
      underline: { true: "underline", false: "" },
    },
    defaultVariants: {},
  }
)

export interface Heading4Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVarients> {
  underline?: boolean
}

export function Typography({ className, intent, level, size, underline, ...props }: Heading4Props) {
  return level === "h1" ? (
    <h1 className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </h1>
  ) : level === "h2" ? (
    <h2 className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </h2>
  ) : level === "h3" ? (
    <h3 className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </h3>
  ) : level === "h4" ? (
    <h4 className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </h4>
  ) : level === "h5" ? (
    <h5 className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </h5>
  ) : level === "h6" ? (
    <h6 className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </h6>
  ) : (
    <p className={twMerge(typographyVarients({ intent, level, size, className, underline }))} {...props}>
      {props.children}
    </p>
  )
}
