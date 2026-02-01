import * as XLSX from "xlsx";
import { DailyEntry } from "@/services/api";

export const exportToExcel = (data: DailyEntry[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      Дата: item.date,
      Прогресс: item.value,
      Заметка: item.notes,
    })),
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Progress");

  XLSX.writeFile(workbook, "daily-progress.xlsx");
};
