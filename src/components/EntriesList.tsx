"use client";

import { useEntries } from "@/hooks/useEntries";
import { useSortedEntries, SortOrder } from "@/hooks/useSortedEntries";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 5;

export default function EntriesList() {
  const { data = [], isLoading } = useEntries();
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedEntries = useSortedEntries(data, sortOrder);
  const totalPages = Math.ceil(sortedEntries.length / ITEMS_PER_PAGE);
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedEntries.slice(start, end);
  }, [sortedEntries, currentPage]);

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
      {paginatedEntries.length === 0 ? (
        <p className="text-slate-500">Записей нет</p>
      ) : (
        <div className="space-y-3">
          {paginatedEntries.map((entry) => (
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
      {/* ПАГИНАЦИЯ */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <div className="justify-center">
            <button
              className="h-8 w-8 p-2 text-sky-500"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ←
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`text-button justify-center pt-4 pb-4 p-1
                  ${
                    page === currentPage
                      ? "bg-primary "
                      : "bg-primary text-sky-500"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              className={"h-8 w-8 p-2 text-sky-500"}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
