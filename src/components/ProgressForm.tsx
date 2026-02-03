"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { progressSchema } from "@/schemas/progressSchema";
import { useAddEntry } from "@/hooks/useEntries";

type FormData = {
  date: Date;
  value: number;
  notes: string;
};

const formatDate = (d: Date) => d.toISOString().split("T")[0];
const today = new Date();
today.setHours(0, 0, 0, 0);
const tenYearsAgo = new Date();
tenYearsAgo.setFullYear(today.getFullYear() - 10);
tenYearsAgo.setHours(0, 0, 0, 0);
const todayISO = formatDate(today);
const tenYearsAgoISO = formatDate(tenYearsAgo);
const transformToBackend = (data: FormData) => ({
  ...data,
  date: data.date.toISOString().split("T")[0],
});

export default function ProgressForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(progressSchema),
    defaultValues: {
      date: today,
      value: 0,
      notes: "",
    },
  });

  const { mutate } = useAddEntry();

  const dateValue = watch("date");

  const onSubmit = (data: FormData) => {
    mutate(transformToBackend(data), {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[120px_1fr] gap-y-4 gap-x-4"
      >
        <label className="text-label">Дата:</label>
        <div className="flex flex-col">
          <input
            type="date"
            className="input"
            min={tenYearsAgoISO}
            max={todayISO}
            {...register("date", { valueAsDate: true })}
            value={dateValue ? formatDate(dateValue) : ""}
          />
          {errors.date && <p className="error-text">{errors.date.message}</p>}
        </div>

        <label className="text-label">Прогресс:</label>
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Введите прогресс"
            className="input"
            {...register("value")}
          />
          {errors.value && <p className="error-text">{errors.value.message}</p>}
        </div>

        <label className="text-label">Заметка:</label>
        <div className="flex flex-col">
          <textarea
            placeholder="Введите заметку"
            className="input"
            {...register("notes")}
          />
          {errors.notes && <p className="error-text">{errors.notes.message}</p>}
        </div>

        <button className="btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем..." : "Добавить"}
        </button>
      </form>
    </div>
  );
}
