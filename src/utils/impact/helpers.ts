import { z } from "zod";

const DateSchema = z.object({
  date: z.string().datetime().or(z.date()),
});

export function labelBlockTimestamps(date: z.infer<typeof DateSchema>) {
  const dateObj = date instanceof Date ? date : new Date(date.date);

  const dateRanges = [
    { start: "2023-11-01", label: "bull" },
    { start: "2022-01-01", end: "2023-11-01", label: "bear" },
    { start: "2020-11-05", end: "2022-01-01", label: "bull" },
    { start: "2018-02-01", end: "2020-11-05", label: "bear" },
    { end: "2018-02-01", label: "bull" },
  ];

  return (
    dateRanges.find(
      (range) =>
        (!range.start || new Date(range.start) < dateObj) &&
        (!range.end || dateObj <= new Date(range.end))
    )?.label ?? "unknown"
  );
}

export function countBullBearDays(start_date: Date): { bull: number; bear: number } {
  const current_date = new Date();
  const date_list = Array.from(
    { length: (current_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24) + 1 },
    (_, i) => {
      const date = new Date(start_date);
      date.setDate(date.getDate() + i);
      return date;
    }
  );

  const labels = date_list.map((date) => labelBlockTimestamps({ date }));

  const bullAndBearCount = labels.reduce(
    (acc, label) => {
      if (label === "bull" || label === "bear") {
        acc[label]++;
      }
      return acc;
    },
    { bull: 0, bear: 0 } as { [key in "bull" | "bear"]: number }
  );

  return bullAndBearCount;
}

export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as Record<string, T[]>);

export const groupByToMap = <T, Q>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => Q
) =>
  array.reduce((map, value, index, array) => {
    const key = predicate(value, index, array);
    map.get(key)?.push(value) ?? map.set(key, [value]);
    return map;
  }, new Map<Q, T[]>());
