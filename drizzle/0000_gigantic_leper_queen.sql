CREATE TABLE IF NOT EXISTS "slice-first_tx_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(256) NOT NULL,
	"block_number" integer NOT NULL,
	"block_time" timestamp NOT NULL,
	"tx_id" varchar(256) NOT NULL,
	"from" varchar(256) NOT NULL,
	"to" varchar(256) NOT NULL,
	"amount" varchar NOT NULL,
	"balance" varchar NOT NULL,
	CONSTRAINT "slice-first_tx_table_tx_id_unique" UNIQUE("tx_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tx_id_idx" ON "slice-first_tx_table" USING btree ("tx_id");