import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  errorMessage?: string;
}

export function Input({
  label,
  errorMessage,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] uppercase font-normal text-zinc-500 leading-3.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-12 w-full rounded-lg border border-zinc-300 px-4 text-sm text-zinc-600 placeholder:text-zinc-400 bg-transparent outline-none transition-colors duration-150",
          "focus:border-zinc-600",
          errorMessage && "border-feedback-danger focus:border-feedback-danger",
          className,
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-xs text-feedback-danger">{errorMessage}</p>
      )}
    </div>
  );
}
