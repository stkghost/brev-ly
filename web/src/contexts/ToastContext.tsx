import * as React from "react";
import { ToastProvider as RadixProvider } from "../components/ui/toast-provider";
import type { Toast, ToastType } from "../types/toast.ts";
import { ToastContext } from "./toast-context.tsx";

export function ToastRootProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = (title: string, type: ToastType = "info") => {
    const id = crypto.randomUUID();
    setToasts((p) => [...p, { id, title, type, open: true }]);
  };

  const closeToast = (id: string) => {
    setToasts((p) => p.map((t) => (t.id === id ? { ...t, open: false } : t)));
  };

  const removeToast = (id: string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <RadixProvider
        toasts={toasts}
        onClose={closeToast}
        onRemove={removeToast}
      />
    </ToastContext.Provider>
  );
}
