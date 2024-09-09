// import { db } from "../db";

// import { lendingTable, type InsertLendingData, type InsertPerpsData, perpsTable } from "./schema";

// export async function insertLendingData(data: InsertLendingData[]) {
//   await db.insert(lendingTable).values(data).onConflictDoNothing();
// }

// export async function insertPerpsData(data: InsertPerpsData[]) {
//   await db.insert(perpsTable).values(data).onConflictDoNothing();
// }

// export async function getAllLendingData() {
//   return db.select().from(lendingTable);
// }
// export async function getAllPerpsData() {
//   return db.select().from(perpsTable);
// }
