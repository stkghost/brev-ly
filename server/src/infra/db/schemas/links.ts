import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  clicks: integer("clicks").notNull().default(0),
  original_url: text("original_url").notNull(),
  alias: text("alias").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
