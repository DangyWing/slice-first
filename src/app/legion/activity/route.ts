export const dynamic = "force-dynamic"; // defaults to auto

import { type NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
// import { getMoralisData } from "~/server/moralis/getMoralisData";
import { getMoralisDataMultipleAddressesAndChains } from "~/server/moralis/getMoralisDataMultipleAddressesAndChains";
import { processActivityResults } from "~/utils/impact/analysis";
import { apiAuth } from "~/utils/supabase/auth";

const chains = [
  "ethereum",
  // "arbitrum",
  // "base",
  //   "polygon",
];

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

  const query = searchParams.getAll("address");

  // create new array of valid addresses
  const validAddresses = new Set(query.filter((address) => isAddress(address)));

  const { errors, valid } = await getMoralisDataMultipleAddressesAndChains({
    addresses: Array.from(validAddresses),
    chains,
  });

  if (!valid && !errors) {
    return NextResponse.json({ Error: "No data found" });
  }

  if (Array.from(validAddresses).length === 0) {
    return NextResponse.json({ Error: "No valid addresses found" });
  }

  const validData = valid.filter(
    (
      item
    ): item is {
      address: `0x${string}`;
      fromAddress: string;
      toAddress: string;
      blockTimestamp: string;
    } => "fromAddress" in item && "toAddress" in item && "blockTimestamp" in item
  );

  const processedData = processActivityResults({ data: validData });

  return Response.json({
    processedData,
    errors,
  });
}
