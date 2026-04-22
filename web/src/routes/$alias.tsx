import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RedirectCard } from "../components/redirect-card";
import { NotFoundCard } from "../components/not-found-card";

export const Route = createFileRoute("/$alias")({
  component: RouteComponent,
});

function RouteComponent() {
  const { alias } = Route.useParams();
  const hasFetched = useRef(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    //código adicionado para remover o double fetch (incrementando os clicks de forma duplicada)
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch(`${import.meta.env.VITE_API_URL}/api/links/get/${alias}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (!data?.original_url) throw new Error("Invalid link");
        setOriginalUrl(data.original_url);
        window.location.replace(data.original_url);
      })
      .catch(() => setNotFound(true));
  }, []);

  if (notFound)
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="w-full max-w-xl">
          <NotFoundCard />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <RedirectCard originalUrl={originalUrl} />
      </div>
    </div>
  );
}
