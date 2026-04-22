import { createFileRoute } from "@tanstack/react-router";
import { NotFoundCard } from "../components/not-found-card";

export const Route = createFileRoute("/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <NotFoundCard />
      </div>
    </div>
  );
}
