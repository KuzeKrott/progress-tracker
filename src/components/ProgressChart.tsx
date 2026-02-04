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
import { useSortedEntries } from "@/hooks/useSortedEntries";

export default function ProgressChart() {
  const { data = [], isLoading } = useEntries();
  const sortedData = useSortedEntries(data, "asc");

  if (isLoading) return <p>Загрузка графика...</p>;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-1 ">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={sortedData}>
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
            <Line type="monotone" stroke="#0369a1" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
