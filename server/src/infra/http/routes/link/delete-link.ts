import { deleteLink } from "@/functions/delete-link";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { DeleteLinkResponseSchema } from "./link.schema";
import { isRight, unwrapLeft } from "@/shared/either";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/api/links/:id",
    {
      schema: {
        summary: "Delete a Link",
        consumes: ["application/json"],
        tags: ["links"],

        params: z.object({
          id: z.uuidv7(),
        }),
        response: {
          200: DeleteLinkResponseSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, response) => {
      const { id } = request.params;

      const result = await deleteLink(id);

      if (isRight(result)) {
        return response.status(200).send({
          message: "Link deleted successfully",
          id: result.right.id,
        });
      }

      const error = unwrapLeft(result);

      if (error) {
        return response.status(404).send({ message: error?.message });
      }
    },
  );
};
