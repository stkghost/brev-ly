import { createLink } from "@/functions/create-link";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { CreateLinkResponseSchma, LinkSchemaBody } from "./link.schema";
import { isRight, unwrapLeft } from "@/shared/either";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/api/links",
    {
      schema: {
        summary: "Create a Link",
        consumes: ["application/json"],
        tags: ["links"],

        response: {
          201: CreateLinkResponseSchma,
          400: z.object({
            message: z.string(),
          }),
        },
        body: LinkSchemaBody,
      },
    },
    async (request, response) => {
      const { original_url, alias } = request.body;

      if (!original_url || !alias) {
        return response.status(400).send({ message: "Missing fields" });
      }

      const result = await createLink({
        original_url,
        alias,
      });

      if (isRight(result)) {
        return response.status(201).send({
          message: "Success!",
          link: result.right,
        });
      }

      const error = unwrapLeft(result);

      if (error) {
        return response.status(400).send({ message: error?.message });
      }
    },
  );
};
