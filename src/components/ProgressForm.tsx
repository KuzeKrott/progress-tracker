"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { progressSchema } from "@/schemas/progressSchema";
import { useAddEntry } from "@/hooks/useEntries";

type FormData = {
  date: string;
  value: number;
  notes: string;
};

export default function ProgressForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(progressSchema),
  });

  const { mutate } = useAddEntry();

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "2rem" }}>
      {/* Дата */}
      <div>
        <label>
          Дата:
          <input type="date" {...register("date")} />
        </label>
        {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
      </div>

      {/* Прогресс */}
      <div>
        <label>
          Прогресс:
          <input
            type="number"
            placeholder="Введите прогресс"
            {...register("value")}
          />
        </label>
        {errors.value && <p style={{ color: "red" }}>{errors.value.message}</p>}
      </div>

      {/* Заметка */}
      <div>
        <label>
          Заметка:
          <textarea placeholder="Введите заметку" {...register("notes")} />
        </label>
        {errors.notes && <p style={{ color: "red" }}>{errors.notes.message}</p>}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        type="submit"
        disabled={isSubmitting}
        style={{ marginTop: "1rem" }}
      >
        {isSubmitting ? "Сохраняем..." : "Добавить"}
      </button>
    </form>
  );
}
