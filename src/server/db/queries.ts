import { db } from "../db";
import { count, eq } from "drizzle-orm";
import { type SelectTx, type InsertTx, txTable } from "./schema";

export async function insertTxs(data: InsertTx[]) {
  await db.insert(txTable).values(data).onConflictDoNothing();
}

export async function getTxById(id: SelectTx["id"]): Promise<
  Array<{
    id: number;
    type: string;
    tx_id: string;
    from: string;
    to: string;
    amount: string;
    balance: string;
  }>
> {
  return db.select().from(txTable).where(eq(txTable.id, id));
}

export async function getTxCountByWallet(wallet: SelectTx["from"]) {
  return db
    .select({
      postsCount: count(txTable.id),
      source_wallet: txTable.from,
    })
    .from(txTable)
    .where(eq(txTable.from, wallet))
    .groupBy(txTable.from);
}

export async function getAllTxs() {
  return db.select().from(txTable);
}
