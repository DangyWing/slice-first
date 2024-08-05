export const dynamic = "force-dynamic"; // defaults to auto

import { getAllTxs } from "~/server/db/queries";

export async function GET() {
  const data = await getAllTxs();

  return Response.json({ data });
}
