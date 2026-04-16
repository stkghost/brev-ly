import { env } from "@/infra/env";
import type { Config } from "drizzle-kit";

export default {
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "src/infra/db/migrations",
  schema: "src/infra/db/schemas/*",
} satisfies Config;
