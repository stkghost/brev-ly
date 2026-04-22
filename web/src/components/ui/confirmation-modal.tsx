import { Button } from "./button";

interface ConfirmationModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <div
        className="flex flex-col gap-6 bg-white rounded-lg p-6 w-full max-w-sm shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-bold text-zinc-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex h-10 w-full items-center justify-center rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            className="h-10 bg-feedback-danger hover:bg-feedback-danger/90"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
