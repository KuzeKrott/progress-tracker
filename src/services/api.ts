export type DailyEntry = {
  date: string;
  value: number;
  notes: string;
};

const STORAGE_KEY = "daily-entries";

export const getEntries = async (): Promise<DailyEntry[]> => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const addEntry = async (entry: DailyEntry) => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // если запись на эту дату уже есть — обновляем
  const updated = data.filter((e: DailyEntry) => e.date !== entry.date);
  updated.push(entry);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export type Note = {
  id: string;
  text: string;
  date: string;
};

const NOTES_KEY = "notes-data";

export const getNotes = async (): Promise<Note[]> => {
  return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
};

export const addNote = async (note: Note) => {
  const data = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  const updated = [...data, note];
  localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  return updated;
};
