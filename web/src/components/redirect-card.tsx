import subtractSvg from "../assets/svgs/Subtract.svg";

interface RedirectCardProps {
  originalUrl?: string | null;
}

export function RedirectCard({ originalUrl }: RedirectCardProps) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center bg-gray-100 rounded-lg px-12 py-16 w-full text-center">
      <img src={subtractSvg} alt="brev.ly" className="size-12" />

      <h1 className="text-2xl font-bold text-zinc-900 leading-8">
        Redirecionando...
      </h1>

      <div className="flex flex-col gap-1 text-sm font-semibold text-gray-600 w-full">
        <p>O link será aberto automaticamente em alguns instantes.</p>
        {originalUrl && (
          <p>
            Não foi redirecionado?{" "}
            <a
              href={originalUrl}
              className="text-blue-base underline underline-offset-2"
            >
              Acesse aqui
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
