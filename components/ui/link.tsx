import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "text-primary hover:text-primary/80 hover:underline underline-offset-4",
        destructive: "text-destructive hover:text-destructive/90",
        muted: "text-muted-foreground hover:text-foreground",
        nav: "text-foreground/60 hover:text-foreground transition-colors",
      },
      size: {
        default: "",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LinkProps
  extends NextLinkProps,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : NextLink;
    return (
      <Comp
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Link.displayName = "Link";

export { Link, linkVariants };
