export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: string;
  title: string;
  type: ToastType;
  open: boolean;
};
