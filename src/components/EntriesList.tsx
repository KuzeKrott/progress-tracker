"use client";

import { useEntries } from "@/hooks/useEntries";
import { useSortedEntries, SortOrder } from "@/hooks/useSortedEntries";
import { useState } from "react";

export default function EntriesList() {
  const { data = [], isLoading } = useEntries();
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedEntries = useSortedEntries(data, sortOrder);

  if (isLoading) {
    return <p className="text-slate-500">Загрузка заметок...</p>;
  }

  return (
    <div className="space-y-4">
      {/* ФИЛЬТР */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          className="input"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </select>
      </div>

      {/* СПИСОК */}
      {sortedEntries.length === 0 ? (
        <p className="text-slate-500">Записей нет</p>
      ) : (
        <div className="space-y-3">
          {sortedEntries.map((entry) => (
            <div
              key={entry.date}
              className="border border-slate-200 rounded p-3"
            >
              <div className="flex justify-between text-sm text-slate-500">
                <span>{entry.date}</span>
                <span>⭐{entry.value}</span>
              </div>

              {entry.notes && (
                <p className="mt-2 text-slate-700">{entry.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
