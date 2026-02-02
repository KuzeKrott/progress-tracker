"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEntries } from "@/hooks/useEntries";
import { exportToExcel } from "@/utils/exportExcel";

export default function ProgressChart() {
  const { data = [], isLoading } = useEntries();

  if (isLoading) return <p>Загрузка графика...</p>;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-1 ">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 14 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip
              labelFormatter={() => ""}
              contentStyle={{
                padding: "6px 10px",
                lineHeight: "1.25rem",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
              wrapperStyle={{ height: "auto", outline: "none" }}
            />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        type="button"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
        onClick={() => exportToExcel(data)}
      >
        Экспорт в Excel
      </button>
    </div>
  );
}
