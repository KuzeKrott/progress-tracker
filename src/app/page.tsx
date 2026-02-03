"use client";

import ProgressForm from "@/components/ProgressForm";
import ProgressChart from "@/components/ProgressChart";

export default function Home() {

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Progress Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <ProgressForm />
        </div>
        <div className="bg-white p-8 rounded shadow">
          <ProgressChart />
        </div>
      </div>
    </main>
  );
}
