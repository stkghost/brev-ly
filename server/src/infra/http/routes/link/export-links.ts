import { exportLinks } from "@/functions/export-links";
import { isRight, unwrapRight } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/api/links/export",
    {
      schema: {
        summary: "Export links in a CSV file",
        tags: ["uploads"],
        response: {
          200: z.object({
            fileUrl: z.string(),
          }),
        },
      },
    },
    async (request, response) => {
      const result = await exportLinks();

      if (isRight(result)) {
        const { fileUrl } = unwrapRight(result);

        return response.status(200).send({ fileUrl });
      }
    },
  );
};
