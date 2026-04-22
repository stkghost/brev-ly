// components/Toast.tsx
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { Toast as ToastType } from "../../types/toast.ts";

const variants = {
  success: "bg-emerald-600",
  error: "bg-red-600",
  info: "bg-zinc-800",
};

type Props = {
  toast: ToastType;
  onClose: () => void;
};

export function Toast({ toast, onClose }: Props) {
  return (
    <ToastPrimitive.Root
      open={toast.open}
      onOpenChange={(open) => !open && onClose()}
      className={`
        ${variants[toast.type]}
        text-white px-4 py-3 rounded-lg shadow-lg
        data-[state=open]:animate-in
        data-[state=closed]:animate-out
        data-[state=closed]:fade-out
        data-[state=open]:fade-in
        data-[state=open]:slide-in-from-bottom-2
        
      `}
    >
      <ToastPrimitive.Title className="text-sm font-medium">
        {toast.title}
      </ToastPrimitive.Title>
    </ToastPrimitive.Root>
  );
}
