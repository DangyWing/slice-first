// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, integer, pgTableCreator, serial, varchar, decimal } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `slice-first_${name}`);

export const lendingTable = createTable(
  "lending",
  {
    id: serial("id").primaryKey(),
    address: varchar("address", { length: 256 }).notNull().unique(),
    blockchain: varchar("blockchain", { length: 256 }).notNull(),
    daysActive: integer("days_active").notNull(),
    daysActivePercentile: decimal("days_active_percentile").notNull(),
    eventType: varchar("event_type", { length: 256 }).notNull(),
    firstTxDate: varchar("first_tx_date", { length: 256 }).notNull(),
    lastTxDate: varchar("last_tx_date", { length: 256 }).notNull(),
    project: varchar("project", { length: 256 }).notNull(),
    totalTrades: integer("total_trades").notNull(),
    totalTradesPercentile: decimal("total_trades_percentile").notNull(),
    totalVolume: decimal("total_volume").notNull(),
    totalVolumePercentile: decimal("total_volume_percentile").notNull(),
    volumeLast3MonthsPercentile: decimal("volume_last_3_months_percentile").notNull(),
    volumeLast6MonthsPercentile: decimal("volume_last_6_months_percentile").notNull(),
  },
  (lendingTable) => ({
    lendingAddressIndex: index("lending_address_idx").on(lendingTable.address),
  })
);
export const perpsTable = createTable(
  "perps",
  {
    id: serial("id").primaryKey(),
    address: varchar("address", { length: 256 }).notNull().unique(),
    blockchain: varchar("blockchain", { length: 256 }).notNull(),
    daysActive: integer("days_active").notNull(),
    daysActivePercentile: decimal("days_active_percentile").notNull(),
    firstTxDate: varchar("first_tx_date", { length: 256 }).notNull(),
    lastTxDate: varchar("last_tx_date", { length: 256 }).notNull(),
    project: varchar("project").notNull(),
    assetsTraded: varchar("assets_traded").notNull(),
    totalFees: decimal("total_fees").notNull(),
    totalFeesPercentile: decimal("total_fees_percentile").notNull(),
    totalTrades: integer("total_trades").notNull(),
    totalTradesPercentile: decimal("total_trades_percentile").notNull(),
    totalVolume: decimal("total_volume").notNull(),
    totalVolumePercentile: decimal("total_volume_percentile").notNull(),
    volumeLast3Months: decimal("volume_last_3_months").notNull(),
    volumeLast3MonthsPercentile: decimal("volume_last_3_months_percentile").notNull(),
    volumeLast6Months: decimal("volume_last_6_months").notNull(),
    volumeLast6MonthsPercentile: decimal("volume_last_6_months_percentile").notNull(),
  },
  (perpsTable) => ({
    perpsAddressIndex: index("perps_address_idx").on(perpsTable.address),
  })
);

export type InsertPerpsData = typeof perpsTable.$inferInsert;
export type SelectPerpsData = typeof perpsTable.$inferSelect;

export type InsertLendingData = typeof lendingTable.$inferInsert;
export type SelectLendingData = typeof lendingTable.$inferSelect;
