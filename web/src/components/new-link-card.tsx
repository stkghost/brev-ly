import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { linkSchema, type LinkFormData } from "../utils/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";

export function NewLinkCard() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
    mode: "onChange",
  });

  const { mutate: createLink, isPending } = useMutation({
    mutationFn: async (link: LinkFormData) => {
      const API_URL = `${import.meta.env.VITE_API_URL}`;

      await axios.post(`${API_URL}/api/links`, link, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["links"] });
      showToast("Link criado com sucesso!", "success");
      reset();
    },
    onError: async (error: Error) => {
      if (error instanceof AxiosError) {
        return showToast(error.response?.data?.message, "error");
      }
    },
  });

  async function onSubmit(data: LinkFormData) {
    createLink(data);
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-100 p-5 md:p-8 rounded-lg w-full">
      <h2 className="text-lg font-bold text-zinc-800 leading-6">Novo link</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          id="original_url"
          label="Link original"
          placeholder="www.exemplo.com.br"
          errorMessage={errors.original_url?.message}
          {...register("original_url")}
        />

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="alias"
            className="text-[10px] uppercase font-normal text-zinc-500 leading-3.5"
          >
            Link encurtado
          </label>
          <div className="flex h-12 w-full rounded-lg border border-zinc-300 overflow-hidden transition-colors duration-150 focus-within:border-zinc-600 has-[input:focus]:border-zinc-600">
            <span className="flex items-center px-4 text-sm text-zinc-400 border-r border-zinc-300 bg-transparent select-none whitespace-nowrap">
              brev.ly/
            </span>
            <input
              id="alias"
              placeholder="meu-link"
              className="flex-1 px-3 text-sm text-zinc-600 placeholder:text-zinc-400 bg-transparent outline-none"
              {...register("alias")}
            />
          </div>
          {errors.alias && (
            <p className="text-xs text-feedback-danger">
              {errors.alias.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          isLoading={isPending}
        >
          Salvar link
        </Button>
      </form>
    </div>
  );
}
