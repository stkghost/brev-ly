import { createFileRoute } from "@tanstack/react-router";
import subtractSvg from "../assets/svgs/Subtract.svg";
import { NewLinkCard } from "../components/new-link-card";
import { ListLinksCard } from "../components/list-links-card";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-6 items-center justify-center px-4 py-10 md:px-6 ">
      <div className="flex items-center gap-2 ">
        <img src={subtractSvg} alt="" className="w-6.75 h-5.75" />
        <span
          className="text-[18.667px] font-bold text-blue-base leading-none"
          style={{ fontFamily: "Quicksand, sans-serif" }}
        >
          brev.ly
        </span>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-sm md:max-w-5xl gap-4 items-start">
        <div className="w-full md:w-96 shrink-0">
          <NewLinkCard />
        </div>
        <div className="w-full min-w-0 flex-1">
          <ListLinksCard />
        </div>
      </div>
    </div>
  );
}
