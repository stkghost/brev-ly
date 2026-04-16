import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { LinkBody, LinkResponse } from "@/infra/http/routes/link/link.schema";

export async function createLink(
  payload: LinkBody,
): Promise<Either<{ message: string }, LinkResponse>> {
  const { original_url, alias } = payload;

  const existing = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.alias, alias),
  });

  if (existing) {
    return makeLeft({ message: "Alias already in use" });
  }

  const result = await db
    .insert(schema.links)
    .values({
      original_url,
      alias,
    })
    .returning();

  return makeRight(result[0]);
}
