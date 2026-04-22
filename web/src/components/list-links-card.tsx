import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Download, Link2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { ListLinkItem } from "./list-link-item";

export interface Link {
  id: string;
  alias: string;
  original_url: string;
  clicks: number;
}

export function ListLinksCard() {
  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  async function fetchLinks(): Promise<Link[]> {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/links`,
    );
    return data.links;
  }
  const { data: links = [] } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  const hasLinks = links.length > 0;

  async function handleDownloadCsv() {
    try {
      setIsDownloading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/links/export`,
      );
      window.location.replace(data.fileUrl);
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data?.message ?? "Erro ao baixar o CSV.")
          : "Erro ao baixar o CSV.";
      showToast(message, "error");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-100 p-5 md:p-6 rounded-lg w-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-800 leading-6">
          Meus links
        </h2>

        <button
          onClick={handleDownloadCsv}
          disabled={!hasLinks}
          className="flex items-center cursor-pointer gap-1.5 h-8 px-2 rounded bg-gray-200 text-xs font-semibold text-gray-600 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:opacity-80"
        >
          <Download className="w-4 h-4" />
          Baixar CSV
        </button>
      </div>

      {!hasLinks ? (
        <div className="flex flex-col items-center justify-center gap-3 py-6 border-t border-gray-200">
          <Link2 className="w-8 h-8 text-gray-500" />
          <p className="text-[10px] uppercase text-gray-500 tracking-wide text-center">
            ainda não existem links cadastrados
          </p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-200">
          {links.map((link) => (
            <ListLinkItem link={link} key={link.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
