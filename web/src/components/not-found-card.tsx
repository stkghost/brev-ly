import notFoundSvg from "../assets/svgs/404.svg";

export function NotFoundCard() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center bg-gray-100 rounded-lg px-12 py-16 w-full text-center">
      <img src={notFoundSvg} alt="404" className="w-48.5 h-[85px]" />

      <h1 className="text-2xl font-bold text-zinc-900 leading-8">
        Link não encontrado
      </h1>

      <p className="text-sm font-semibold text-gray-600 leading-[18px]">
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em{" "}
        <a href="/" className="text-blue-base underline underline-offset-2">
          brev.ly
        </a>
        .
      </p>
    </div>
  );
}
