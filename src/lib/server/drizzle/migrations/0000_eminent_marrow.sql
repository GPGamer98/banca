CREATE TABLE IF NOT EXISTS "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user" varchar(255) NOT NULL,
	"money" integer NOT NULL
);
