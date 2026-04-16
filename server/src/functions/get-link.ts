import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

export async function GetLink(
  alias: string,
): Promise<Either<{ message: string }, { original_url: string }>> {
  const existing = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.alias, alias),
  });

  if (!existing) {
    return makeLeft({ message: "Link not found" });
  }

  await db
    .update(schema.links)
    .set({
      clicks: existing.clicks + 1,
    })
    .where(eq(schema.links.alias, alias));

  return makeRight({ original_url: existing.original_url });
}
