export const dynamic = "force-dynamic"; // defaults to auto

import { insertPerpsData } from "~/server/db/queries";
import { fetchDunePerpsData } from "~/server/dune/fetchDunePerpsData";

export interface DunePerpsData {
  address: string;
  assets_traded: string;
  blockchain: string;
  days_active: number;
  days_active_percentile: number;
  first_tx_date: string;
  last_tx_date: string;
  project: string;
  assetsTraded: string;
  total_fees: number;
  total_fees_percentile: number;
  total_trades: number;
  total_trades_percentile: number;
  total_volume: number;
  total_volume_percentile: number;
  volume_last_3_months: number;
  volume_last_3_months_percentile: number;
  volume_last_6_months: number;
  volume_last_6_months_percentile: number;
}

export async function GET() {
  console.log("getting dune data..");
  const data = await fetchDunePerpsData();
  console.log("got dune data..");

  const rows = data?.result?.rows;

  if (!rows) return Response.json({ data });

  const duneData = rows as unknown as DunePerpsData[];

  // todo: convert timesteamps to unix timestamps

  const cleanDuneData = duneData.map((d) => ({
    address: d.address,
    blockchain: d.blockchain,
    firstTxDate: d.first_tx_date,
    lastTxDate: d.last_tx_date,
    daysActive: Number(d.days_active),
    daysActivePercentile: d.days_active_percentile.toString(),
    project: d.project.replaceAll("\x00", ""),
    assetsTraded: d.assets_traded.replaceAll("\x00", ""),
    totalFees: d.total_fees.toString(),
    totalFeesPercentile: d.total_fees_percentile.toString(),
    totalTrades: Number(d.total_trades),
    totalTradesPercentile: d.total_trades_percentile.toString(),
    totalVolume: d.total_volume.toString(),
    totalVolumePercentile: d.total_volume_percentile.toString(),
    volumeLast3Months: d.volume_last_3_months.toString(),
    volumeLast3MonthsPercentile: d.volume_last_3_months_percentile.toString(),
    volumeLast6Months: d.volume_last_6_months.toString(),
    volumeLast6MonthsPercentile: d.volume_last_6_months_percentile.toString(),
  }));

  await insertPerpsData(cleanDuneData);

  return Response.json(cleanDuneData);
}
