import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Copy, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmationModal } from "./ui/confirmation-modal";
import { useToast } from "../hooks/use-toast";
import type { Link } from "./list-links-card";

export function ListLinkItem({ link }: { link: Link }) {
  const env = import.meta.env.VITE_ENVIRONMENT;
  const DOMAIN = env === "dev" ? "http://localhost:5173/" : "brev.ly/";

  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`${DOMAIN}${link.alias}`);
  }

  const { mutate: deleteLink, isPending: isDeleting } = useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_API_URL}/api/links/${link.id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["links"] });
      showToast("Link excluído com sucesso!", "success");
      setShowConfirm(false);
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Erro ao excluir o link.")
          : "Erro ao excluir o link.";
      showToast(message, "error");
      setShowConfirm(false);
    },
  });

  return (
    <>
      {showConfirm && (
        <ConfirmationModal
          title="Excluir link"
          description={`Tem certeza que deseja excluir brev.ly/${link.alias}? Esta ação não pode ser desfeita.`}
          confirmLabel="Excluir"
          isLoading={isDeleting}
          onConfirm={() => deleteLink()}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className="flex items-center border-t border-gray-200 py-3 gap-4">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="text-blue-base font-semibold text-sm truncate">
            {`${DOMAIN}${link.alias}`}
          </span>
          <span className="text-gray-500 text-xs truncate">
            {link.original_url}
          </span>
        </div>

        <span className="text-gray-500 text-xs whitespace-nowrap shrink-0">
          {link.clicks} {link.clicks === 1 ? "acesso" : "acessos"}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center cursor-pointer justify-center size-8 rounded bg-gray-200 text-zinc-800 hover:opacity-70 transition-opacity"
            aria-label="Copiar link"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            disabled={isDeleting}
            className="flex items-center cursor-pointer justify-center size-8 rounded bg-gray-200 text-zinc-800 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Excluir link"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
