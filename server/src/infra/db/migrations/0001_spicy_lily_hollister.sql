ALTER TABLE "links" RENAME COLUMN "shortened_url" TO "alias";--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_alias_unique" UNIQUE("alias");