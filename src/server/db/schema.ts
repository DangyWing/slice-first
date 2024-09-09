// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  integer,
  pgTable,
  serial,
  varchar,
  decimal,
  boolean,
  date,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const apiUsersTable = pgTable("api_users", {
  username: varchar("username").unique(),
  createdAt: date("created_at"),
  apiKey: varchar("api_key", { length: 256 }),
  active: boolean("active").notNull().default(false),
  totalCu: integer("total_cu").default(0),
  totalRequests: integer("total_requests").default(0),
  limit: integer("limit").default(0),
});

export type SelectApiUsers = typeof apiUsersTable.$inferSelect;
