CREATE TABLE IF NOT EXISTS "slice-first_lending" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(256) NOT NULL,
	"blockchain" varchar(256) NOT NULL,
	"days_active" integer NOT NULL,
	"days_active_percentile" integer NOT NULL,
	"event_type" varchar(256) NOT NULL,
	"first_tx_date" varchar(256) NOT NULL,
	"last_tx_date" varchar(256) NOT NULL,
	"project" varchar(256) NOT NULL,
	"total_trades" integer NOT NULL,
	"total_trades_percentile" numeric NOT NULL,
	"total_volume" numeric NOT NULL,
	"total_volume_percentile" numeric NOT NULL,
	"volume_last_3_months_percentile" numeric NOT NULL,
	"volume_last_6_months_percentile" numeric NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "address_idx" ON "slice-first_lending" USING btree ("address");