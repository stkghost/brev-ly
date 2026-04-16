import { z } from "zod";

export const LinkSchemaBody = z.object({
  original_url: z.url().nonoptional(),
  alias: z.string().nonoptional(),
});

export const LinkResponseSchema = z.object({
  id: z.uuidv7().nonoptional(),
  original_url: z.url().nonoptional(),
  alias: z.string().nonoptional(),
  clicks: z.number().nonnegative().nonoptional(),
  createdAt: z.date(),
});

export const CreateLinkResponseSchma = z.object({
  message: z.string(),
  link: LinkResponseSchema,
});

export const GetLinkResponseSchma = z.object({
  message: z.string(),
  original_url: z.url().nonoptional(),
});

export const ListLinksResponseSchma = z.object({
  message: z.string(),
  links: z.array(LinkResponseSchema),
});

export const DeleteLinkResponseSchema = z.object({
  message: z.string(),
  id: z.uuidv7().nonoptional(),
});

export type CreateLinkResponse = z.infer<typeof CreateLinkResponseSchma>;
export type ListLinksResponse = z.infer<typeof ListLinksResponseSchma>;
export type DeleteLinkResponse = z.infer<typeof DeleteLinkResponseSchema>;
export type LinkResponse = z.infer<typeof LinkResponseSchema>;
export type GetLinkResponse = z.infer<typeof GetLinkResponseSchma>;

export type LinkBody = z.infer<typeof LinkSchemaBody>;
