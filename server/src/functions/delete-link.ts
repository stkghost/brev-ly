import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";

export async function deleteLink(
  id: string,
): Promise<Either<{ message: string }, { id: string }>> {
  const existing = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
  });

  if (!existing) {
    return makeLeft({ message: "Link not found" });
  }

  await db.delete(schema.links).where(eq(schema.links.id, id));

  return makeRight({ id });
}
