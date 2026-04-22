import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ComponentProps<"button"> {
  icon?: ReactNode;
  isLoading?: boolean;
}

export function Button({
  icon,
  isLoading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-base px-5 text-sm font-semibold text-zinc-50 cursor-pointer transition-colors duration-150",
        "hover:bg-blue-dark",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {icon && !isLoading && icon}
      {props.children}
    </button>
  );
}
