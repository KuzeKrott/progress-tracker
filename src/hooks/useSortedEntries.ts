import { useMemo } from "react";
import { DailyEntry } from "@/services/api";

export type SortOrder = "asc" | "desc";

export function useSortedEntries(entries: DailyEntry[], sortOrder: SortOrder) {
  return useMemo(() => {
    const sorted = [...entries];

    sorted.sort((a, b) =>
      sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date),
    );

    return sorted;
  }, [entries, sortOrder]);
}
