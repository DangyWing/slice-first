import { QueryParameter, DuneClient, type RunQueryArgs } from "@duneanalytics/client-sdk";
import { env } from "~/env";

const client = new DuneClient(env.DUNE_API_KEY);

const queryId = 3958723;
const opts: RunQueryArgs = {
  queryId,
  query_parameters: [
    QueryParameter.enum("chain", "ethereum"),
    QueryParameter.text("contract", "0x6B175474E89094C44Da98b954EedeAC495271d0F"),
    QueryParameter.text("owner", "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"),
  ],
};

export async function fetchDuneData() {
  return await client.runQuery(opts);
}
