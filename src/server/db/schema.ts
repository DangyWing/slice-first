// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator, serial, timestamp, varchar, integer } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `slice-first_${name}`);

export const txTable = createTable(
  "tx_table",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 256 }).notNull(),
    tx_id: varchar("tx_id", { length: 256 }).notNull().unique(),
    from: varchar("from", { length: 256 }).notNull(),
    to: varchar("to", { length: 256 }).notNull(),
    amount: varchar("amount").notNull(),
    balance: varchar("balance").notNull(),
  },
  (txTable) => ({
    txIdIndex: index("tx_id_idx").on(txTable.tx_id),
  })
);

export type InsertTx = typeof txTable.$inferInsert;
export type SelectTx = typeof txTable.$inferSelect;
