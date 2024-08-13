export const dynamic = "force-dynamic"; // defaults to auto

import { getAllLendingData } from "~/server/db/queries";

export async function GET() {
  const data = await getAllLendingData();

  return Response.json(data);
}
