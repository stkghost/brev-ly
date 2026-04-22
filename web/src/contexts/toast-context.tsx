import { createContext } from "react";
import type { ToastType } from "../types/toast";

type ToastContextValue = {
  showToast: (title: string, type?: ToastType) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
