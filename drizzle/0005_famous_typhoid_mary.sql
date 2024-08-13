CREATE TABLE IF NOT EXISTS "slice-first_perps" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(256) NOT NULL,
	"blockchain" varchar(256) NOT NULL,
	"days_active" integer NOT NULL,
	"days_active_percentile" numeric NOT NULL,
	"first_tx_date" varchar(256) NOT NULL,
	"last_tx_date" varchar(256) NOT NULL,
	"project" varchar(256) NOT NULL,
	"assets_traded" varchar(256) NOT NULL,
	"total_fees" numeric NOT NULL,
	"total_fees_percentile" numeric NOT NULL,
	"total_trades" integer NOT NULL,
	"total_trades_percentile" numeric NOT NULL,
	"total_volume" numeric NOT NULL,
	"total_volume_percentile" numeric NOT NULL,
	"volume_last_3_months" numeric NOT NULL,
	"volume_last_3_months_percentile" numeric NOT NULL,
	"volume_last_6_months" numeric NOT NULL,
	"volume_last_6_months_percentile" numeric NOT NULL,
	CONSTRAINT "slice-first_perps_address_unique" UNIQUE("address")
);
--> statement-breakpoint
DROP INDEX IF EXISTS "address_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "perps_address_idx" ON "slice-first_perps" USING btree ("address");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lending_address_idx" ON "slice-first_lending" USING btree ("address");