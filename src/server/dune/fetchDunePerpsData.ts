import { DuneClient, type RunQueryArgs } from "@duneanalytics/client-sdk";
import { env } from "~/env";

const client = new DuneClient(env.DUNE_API_KEY);

const queryId = 3985375;

const opts: RunQueryArgs = {
  queryId,
  opts: {
    maxAgeHours: 1,
  },
};

export async function fetchDunePerpsData() {
  return await client.getLatestResult(opts);
}
