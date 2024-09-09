import { DuneClient, type RunQueryArgs } from "@duneanalytics/client-sdk";
import { env } from "~/env";
import { type Address } from "viem";

const duneClient = new DuneClient(env.DUNE_API_KEY);
const dexQueryId = 3912114;
const evmChainCountAndAge = 4038952;

async function fetchQueryData({
  queryId,
  columns,
  address,
}: {
  queryId: number;
  columns: string[];
  address: Address;
}) {
  const opts: RunQueryArgs = {
    queryId,
    limit: 1,
    filters: `address = ${address}`,
    columns,
  };
  const result = await duneClient.getLatestResult(opts);
  return result.result?.rows[0];
}

export async function fetchLegionDuneData({ address }: { address: Address }) {
  const dexQueryData = await fetchQueryData({
    queryId: dexQueryId,
    columns: ["unique_dex_count"],
    address,
  });

  const evmChainCountAndAgeData = await fetchQueryData({
    queryId: evmChainCountAndAge,
    columns: ["unique_chain_count", "address_age_days"],
    address,
  });

  return {
    uniqueDexCount: dexQueryData?.unique_dex_count ?? null,
    uniqueChainCount: evmChainCountAndAgeData?.unique_chain_count ?? null,
    addressAgeDays: evmChainCountAndAgeData?.address_age_days ?? null,
  };
}
