import { DailyEntry } from "@/services/api";

/**
 * Проверяем есть ли запись на указанную дату
 * @param date - дата в формате "YYYY-MM-DD"
 * @param entries - массив существующих записей
 * @returns true, если дата уникальна
 */
export const useValidateDate = () => {
  const validateDate = (date: string, entries: DailyEntry[]) => {
    return !entries.some((entry) => entry.date === date);
  };
  return { validateDate };
};
