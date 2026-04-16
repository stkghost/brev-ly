import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import { transformSiwaggerSchema } from "./transforma-swagger-schema";
import { createLinkRoute } from "./routes/link/create-link";
import { deleteLinkRoute } from "./routes/link/delete-link";
import { listLinksRoute } from "./routes/link/list-links";
import { getLinkRoute } from "./routes/link/get-link";
import { exportLinksRoute } from "./routes/link/export-links";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation Error",
      issues: error.validation,
    });
  }

  console.error(error);
  return reply.status(500).send({ message: "Internal Server Error" });
});

server.register(fastifyMultipart);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brevfy",
      description: "API docs",
      version: "1.0.0",
    },
  },
  transform: transformSiwaggerSchema,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(fastifyCors, {
  origin: "*",
});

//routes
server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(listLinksRoute);
server.register(getLinkRoute);
server.register(exportLinksRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
