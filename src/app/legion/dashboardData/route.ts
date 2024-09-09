export const dynamic = "force-dynamic"; // defaults to auto

import { type NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import { fetchLegionDuneData } from "~/server/dune/fetchLegionDuneData";
import { apiAuth } from "~/utils/supabase/auth";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const api_key = requestHeaders.get("X-Api-Key");

  if (!api_key) {
    return NextResponse.json({ Error: "Missing api key in header" });
  }

  const searchParams = request.nextUrl.searchParams;

  const isUserValid = await apiAuth({ apiKey: api_key });

  if (isUserValid != true) {
    return NextResponse.json({ Error: "Invalid user" });
  }

  const address = searchParams.get("address");

  if (!address || !isAddress(address))
    return Response.json({
      Error: "Invalid address",
    });

  const duneValues = await fetchLegionDuneData({ address });

  return Response.json({
    address,
    ...duneValues,
  });
}
