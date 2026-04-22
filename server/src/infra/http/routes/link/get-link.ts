import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { isRight, unwrapLeft } from "@/shared/either";
import { GetLink } from "@/functions/get-link";
import { GetLinkResponseSchma } from "./link.schema";

export const getLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/api/links/get/:alias",
    {
      schema: {
        summary: "Get a link from its alias",
        consumes: ["application/json"],
        tags: ["links"],

        response: {
          200: GetLinkResponseSchma,
          400: z.object({
            message: z.string(),
          }),
        },
        params: z.object({
          alias: z.string().nonoptional(),
        }),
      },
    },
    async (request, response) => {
      const { alias } = request.params;
      const { headers } = request;

      // Preventing clicks increments when browser prefeteches
      const purpose = headers["purpose"] || headers["sec-purpose"];
      const isPrefetch =
        purpose?.includes("prefetch") || purpose?.includes("prerender");

      if (!isPrefetch) {
        const result = await GetLink(alias);

        if (isRight(result)) {
          return response.status(200).send({
            message: "Success!",
            original_url: result.right.original_url,
          });
        }

        const error = unwrapLeft(result);

        if (error) {
          return response.status(400).send({ message: error?.message });
        }
      }

      response.status(400).send({ message: "Browser prefetch" });
    },
  );
};
