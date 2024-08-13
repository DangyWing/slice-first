export const dynamic = "force-dynamic"; // defaults to auto

import { insertLendingData } from "~/server/db/queries";
import { fetchDuneLendingData } from "~/server/dune/fetchDuneLendingData";

export interface DuneLendingData {
  address: string;
  blockchain: string;
  days_active: number;
  days_active_percentile: number;
  event_type: EventType;
  first_tx_date: string;
  last_tx_date: string;
  project: string;
  total_trades: number;
  total_trades_percentile: number;
  total_volume: number;
  total_volume_percentile: number;
  volume_last_3_months_percentile: number;
  volume_last_6_months_percentile: number;
}

export enum EventType {
  Borrow = "borrow",
  BorrowSupply = "borrow,supply",
  Supply = "supply",
}

export async function GET() {
  console.log("getting dune data..");
  const data = await fetchDuneLendingData();
  console.log("got dune data..");

  const rows = data?.result?.rows;

  if (!rows) return Response.json({ data });

  const duneData = rows as unknown as DuneLendingData[];

  // todo: convert timesteamps to unix timestamps

  const cleanDuneData = duneData.map((d) => ({
    address: d.address,
    blockchain: d.blockchain,
    eventType: d.event_type,
    firstTxDate: d.first_tx_date,
    lastTxDate: d.last_tx_date,
    daysActive: Number(d.days_active),
    daysActivePercentile: d.days_active_percentile.toString(),
    project: d.project,
    totalTrades: Number(d.total_trades),
    totalTradesPercentile: d.total_trades_percentile.toString(),
    totalVolume: d.total_volume.toString(),
    totalVolumePercentile: d.total_volume_percentile.toString(),
    volumeLast3MonthsPercentile: d.volume_last_3_months_percentile.toString(),
    volumeLast6MonthsPercentile: d.volume_last_6_months_percentile.toString(),
  }));

  await insertLendingData(cleanDuneData);

  return Response.json(duneData);
}
