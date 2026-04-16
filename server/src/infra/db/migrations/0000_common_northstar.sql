CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"access" integer DEFAULT 0 NOT NULL,
	"original_url" text NOT NULL,
	"shortened_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
