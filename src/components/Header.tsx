"use client";
import Image from "next/image";
import { exportToExcel } from "@/utils/exportExcel";
import { useEntries } from "@/hooks/useEntries";

type HeaderProps = {
  onAddClick: () => void;
};

export default function Header({ onAddClick }: HeaderProps) {
  const { data = [] } = useEntries();
  return (
    <header className="absolute top-0 left-0 right-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/progress 1.svg"
              alt="Progress logo"
              width={24}
              height={24}
              priority
            />
            <h1 className="font-sans text-white text-lg font-semibold">
              Progress Tracker
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="btn-secondary" onClick={onAddClick}>
                <Image
                  src="/plus-circle.svg"
                  alt="Add entry"
                  width={24}
                  height={24}
                  priority
                />
              </button>
              <span className="span-btn-secondary">Добавить запись</span>
            </div>
            <div className="relative group">
              <button
                onClick={() => exportToExcel(data)}
                className="btn-secondary"
              >
                <Image
                  src="/arrow-export.svg"
                  alt="Export"
                  width={24}
                  height={24}
                  priority
                />
              </button>
              <span className="span-btn-secondary">Экспорт в Excel</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
