import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Botão editorial: sem raio, Montserrat Light maiúsculo com tracking largo
 * (a assinatura tipográfica da marca). Ver /CLAUDE.md — Tipografia/Layout.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-none border bg-clip-padding font-sans text-xs font-light tracking-label whitespace-nowrap uppercase select-none disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/30 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "border-wine bg-wine text-cream hover:border-wine-hover hover:bg-wine-hover",
        outline:
          "border-hairline bg-transparent text-ink hover:border-wine hover:text-wine",
        "outline-wine":
          "border-wine bg-transparent text-wine hover:bg-wine hover:text-cream",
        ghost: "border-transparent bg-transparent text-ink hover:text-wine",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6",
        lg: "h-14 px-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
