import { groupByToMap, labelBlockTimestamps } from "./helpers";
import { type Activity } from "../../../types";
import { type Address } from "viem";

type ActivityData = {
  age: number;
  avg_daily_txn: number;
  avg_daily_txn_bull: number;
  avg_daily_txn_bear: number;
};

export function processActivityResults({
  data,
}: {
  data: {
    address: Address;
    fromAddress: string;
    toAddress: string;
    blockTimestamp: string;
  }[];
}) {
  const currentDate = new Date();

  const filteredData = data.filter(
    (item) => item.fromAddress?.toLowerCase() === item.address.toLowerCase()
  );

  const separatedData = filteredData.reduce<Record<Address, typeof filteredData>>((acc, item) => {
    const address = item.address;
    if (!acc[address]) {
      acc[address] = [];
    }
    acc[address].push(item);
    return acc;
  }, {});

  const analysisResults: Activity[] = [];

  for (const address in separatedData) {
    const data = separatedData[address as Address];
    if (!data) continue;
    const totalTransactions = data.length;

    const walletAgeInDays =
      data.length > 0
        ? Math.floor(
            (currentDate.getTime() -
              data
                .reduce(
                  (min, item) =>
                    item.blockTimestamp && new Date(item.blockTimestamp) < min
                      ? new Date(item.blockTimestamp)
                      : min,
                  new Date(data[0]?.blockTimestamp ?? Date.now())
                )
                .getTime()) /
              (1000 * 3600 * 24)
          )
        : 0;

    const dataMap = groupByToMap(filteredData, (v) =>
      v.blockTimestamp ? new Date(v.blockTimestamp).getDate().toString() : "unknown"
    );

    const transactionCountsByDay = Array.from(dataMap, ([date, transactions]) => ({
      date,
      count: transactions.length,
      bullBearLabel: labelBlockTimestamps({ date }),
    }));

    const results = calculateResults({
      address,
      walletAgeInDays,
      transactionCountsByDay,
      totalTransactions,
    });

    analysisResults.push(results);
  }

  return analysisResults;
}

export function calculate_activity_impact(data: ActivityData) {
  let score = 0;
  const cycles = data.age / (365 * 3);

  score += cycles > 2 ? 33 : cycles > 1 ? 16 : 16 * cycles;

  if (data.avg_daily_txn_bear === 0) {
    score += 10;
  } else {
    const ratio = Math.abs(1 - data.avg_daily_txn_bull / data.avg_daily_txn_bear);
    if (ratio < 0.1) score += 33;
    else if (ratio > 0.3) score += 16;
    else score += 16 - 16 * ratio;
  }

  if (data.avg_daily_txn > 2) score += 33;
  else if (data.avg_daily_txn > 0.5) score += 33 * (data.avg_daily_txn / 2);
  else score += 5;

  return Math.min(score, 100);
}

function calculateResults({
  address,
  walletAgeInDays,
  transactionCountsByDay,
  totalTransactions,
}: {
  address: string;
  walletAgeInDays: number;
  transactionCountsByDay: { date: string; count: number; bullBearLabel: string }[];
  totalTransactions: number;
}) {
  const bullTxnCount = transactionCountsByDay.filter(
    (item) => item.bullBearLabel === "bull"
  ).length;
  const bearTxnCount = transactionCountsByDay.filter(
    (item) => item.bullBearLabel === "bear"
  ).length;
  const bullBearRatio = bearTxnCount === 0 ? 0 : bullTxnCount / bearTxnCount;
  const avgDailyTxn =
    transactionCountsByDay.reduce((acc, item) => acc + item.count, 0) /
    transactionCountsByDay.length;
  const avgDailyTxnBull = bullTxnCount / walletAgeInDays;
  const avgDailyTxnBear = bearTxnCount / walletAgeInDays;
  const activityScore = calculate_activity_impact({
    age: walletAgeInDays,
    avg_daily_txn: avgDailyTxn,
    avg_daily_txn_bull: avgDailyTxnBull,
    avg_daily_txn_bear: avgDailyTxnBear,
  });

  return {
    address,
    activityScore,
    age: walletAgeInDays,
    bullBearRatio,
    avgDailyTxn,
    avgDailyTxnBear,
    avgDailyTxnBull,
    totalTransactions,
    bearTxnCount,
    bullTxnCount,
    bearDayCount: transactionCountsByDay.filter((item) => item.bullBearLabel === "bear").length,
    bullDayCount: transactionCountsByDay.filter((item) => item.bullBearLabel === "bull").length,
  };
}
