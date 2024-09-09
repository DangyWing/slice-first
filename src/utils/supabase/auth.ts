import { db } from "~/server/db";
import { apiUsersTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function apiAuth({ apiKey }: { apiKey: string }) {
  const res = await db
    .select()
    .from(apiUsersTable)
    .where(eq(apiUsersTable.apiKey, apiKey))
    .limit(1);

  if (res.length === 0) {
    return "Invalid API Key";
  }

  const user = res[0];

  if (user?.active && (user?.limit ?? 0 > (user?.totalRequests ?? 0))) {
    return true;
  }
}
