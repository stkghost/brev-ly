import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { ListLinksResponseSchma } from "./link.schema";
import { isRight, unwrapLeft } from "@/shared/either";
import { ListLinks } from "@/functions/list-links";

export const listLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/api/links",
    {
      schema: {
        summary: "ListLinks",
        consumes: ["application/json"],
        tags: ["links"],

        response: {
          200: ListLinksResponseSchma,
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_request, response) => {
      const result = await ListLinks();

      if (isRight(result)) {
        return response.status(200).send({
          message: "Success!",
          links: result.right,
        });
      }

      const error = unwrapLeft(result);

      if (error) {
        return response.status(400).send({ message: error?.message });
      }
    },
  );
};
