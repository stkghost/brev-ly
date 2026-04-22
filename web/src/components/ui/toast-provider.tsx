// components/ToastProvider.tsx
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Toast } from "./toast.tsx";
import type { Toast as ToastType } from "../../types/toast.ts";

type Props = {
  toasts: ToastType[];
  onRemove: (id: string) => void;
  onClose: (id: string) => void;
};

export function ToastProvider({ toasts, onClose, onRemove }: Props) {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => {
            onClose(toast.id);
            setTimeout(() => onRemove(toast.id), 200);
          }}
        />
      ))}

      <ToastPrimitive.Viewport
        className="
          fixed bottom-4 right-4 z-50
          flex flex-col gap-2 w-[320px]
          z-[100]
        "
      />
    </ToastPrimitive.Provider>
  );
}
