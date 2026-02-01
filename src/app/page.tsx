"use client";

import ProgressForm from "@/components/ProgressForm";
import ProgressChart from "@/components/ProgressChart";
import Notes from "@/components/Notes";
import { useEntries } from "@/hooks/useEntries";
import { exportToExcel } from "@/utils/exportExcel";

export default function Home() {
  const { data = [] } = useEntries();
  return (
    <main>
      <h1>Progress Tracker</h1>

      <ProgressForm />
      <ProgressChart />
      <button onClick={() => exportToExcel(data)}>Экспорт в Excel</button>
    </main>
  );
}
