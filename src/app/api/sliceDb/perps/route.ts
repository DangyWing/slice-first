export const dynamic = "force-dynamic"; // defaults to auto

import { getAllPerpsData } from "~/server/db/queries";

export async function GET() {
  const data = await getAllPerpsData();

  return Response.json(data);
}
