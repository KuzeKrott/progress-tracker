"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { progressSchema } from "@/schemas/progressSchema";
import { useEntries, useAddEntry } from "@/hooks/useEntries";
import { useValidateDate } from "@/hooks/useValidateDate";

type FormData = {
  date: string;
  value: number;
  notes: string;
};
type ProgressFormProps = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

const today = new Date();
const tenYearsAgo = new Date();
tenYearsAgo.setFullYear(today.getFullYear() - 10);
const formatDate = (d: Date) => d.toISOString().split("T")[0];
const todayStr = formatDate(today);
const tenYearsAgoStr = formatDate(tenYearsAgo);

export default function ProgressForm({
  onCancel,
  onSuccess,
}: ProgressFormProps) {
  const { data: entries = [] } = useEntries();
  const { mutate } = useAddEntry();
  const { validateDate } = useValidateDate();
  const [dateError, setDateError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(progressSchema),
    defaultValues: {
      date: todayStr,
      value: 0,
      notes: "",
    },
  });

  const onSubmit = (formData: FormData) => {
    if (!validateDate(formData.date, entries)) {
      setDateError("На эту дату уже есть запись");
      return;
    }
    setDateError(null); // очистка ошибки
    mutate(formData, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
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
            min={tenYearsAgoStr}
            max={todayStr}
            {...register("date")}
            defaultValue={todayStr}
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

        <div className="col-span-2 flex justify-center gap-3 pt-4">
          <button className="btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем..." : "Добавить"}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
