import { DuneClient, type RunQueryArgs } from "@duneanalytics/client-sdk";
import { env } from "~/env";

const client = new DuneClient(env.DUNE_API_KEY);

const queryId = 3985374;

const opts: RunQueryArgs = {
  queryId,
  opts: {
    maxAgeHours: 1,
  },
};

export async function fetchDuneLendingData() {
  return await client.getLatestResult(opts);
}
