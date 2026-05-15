import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 max-w-full",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // EVENTWAVE neon variants
        hero: "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] text-primary-foreground font-heading tracking-[0.1em] md:tracking-[0.2em] uppercase border border-primary/60 hover:bg-[position:right_center] hover:shadow-[0_0_30px_hsl(322_100%_56%/0.7),0_0_60px_hsl(280_85%_60%/0.4)] transition-all duration-500",
        service: "bg-card border border-border text-foreground hover:border-primary/60 hover:shadow-[0_0_25px_hsl(322_100%_56%/0.3)] hover:bg-secondary/50 transition-all duration-300",
        nav: "text-foreground/70 hover:text-primary font-body font-medium tracking-[0.2em] uppercase text-xs bg-transparent transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 md:h-12 rounded-lg px-6 md:px-8 text-sm md:text-base",
        xl: "h-12 md:h-14 rounded-lg px-6 md:px-10 text-sm md:text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
