import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { LinkResponse } from "@/infra/http/routes/link/link.schema";
import { Either, makeRight } from "@/shared/either";

export async function ListLinks(): Promise<
  Either<{ message: string }, LinkResponse[]>
> {
  const links = await db
    .select({
      id: schema.links.id,
      alias: schema.links.alias,
      original_url: schema.links.original_url,
      createdAt: schema.links.createdAt,
      clicks: schema.links.clicks,
    })
    .from(schema.links);

  const result = makeRight(links);

  return result;
}
