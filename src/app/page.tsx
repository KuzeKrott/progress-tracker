"use client";

import ProgressForm from "@/components/ProgressForm";
import ProgressChart from "@/components/ProgressChart";
import EntriesList from "@/components/EntriesList";
import Header from "@/components/Header";
import HeroText from "@/components/HeroText";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <main className="">
      {/* HERO */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-[url('/img/ocean1.jpg')] bg-cover bg-center bg-fixed" />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <Header onAddClick={() => setIsFormOpen(true)} />
        <HeroText />
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div
            className="bg-white md:col-span-2 p-8 rounded shadow"
            id="progress-chart"
          >
            <h2 className="text-primary">График прогресса</h2>
            <ProgressChart />
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-primary">Все записи</h2>
          <EntriesList />
        </div>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <h2 className="text-primary">Добавить запись</h2>
        <ProgressForm onCancel={() => setIsFormOpen(false)} />
      </Modal>
    </main>
  );
}
