export const dynamic = "force-dynamic"; // defaults to auto

import { insertTxs } from "~/server/db/queries";
import { fetchDuneData } from "~/server/dune/fetchDuneData";

interface DuneData {
  Type: string;
  TxID: string;
  From: string;
  To: string;
  Amount: string;
  Balance: string;
}

export async function GET() {
  console.log("getting dune data..");
  const data = await fetchDuneData();
  console.log("got dune data..");

  const rows = data?.result?.rows;

  if (!rows) return Response.json({ data });

  const duneData = rows as unknown as DuneData[];

  const cleanDuneData = duneData
    .filter(
      (data) =>
        data.TxID.length > 0 &&
        data.From.length > 0 &&
        data.To.length > 0 &&
        data.Amount.toString().length > 0 &&
        data.Balance.toString().length > 0 &&
        data.Type.length > 0
    )
    .map((data) => ({
      tx_id: data.TxID,
      from: data.From,
      to: data.To,
      amount: data.Amount.toString(),
      balance: data.Balance.toString(),
      type: data.Type,
    }));

  if (cleanDuneData.length > 0) await insertTxs(cleanDuneData);

  return Response.json(cleanDuneData);
}
