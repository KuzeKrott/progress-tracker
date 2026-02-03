import * as yup from "yup";

const today = new Date();
const tenYearsAgo = new Date();
tenYearsAgo.setFullYear(today.getFullYear() - 10);
const formatDate = (d: Date) => d.toISOString().split("T")[0];
const todayStr = formatDate(today);
const tenYearsAgoStr = formatDate(tenYearsAgo);

export const progressSchema = yup.object({
  date: yup
    .string()
    .typeError("Введите корректную дату")
    .required("Дата обязательна")
    .test(
      "valid-range",
      "Дата должна быть в диапазоне последних 10 лет и не в будущем",
      (value) => {
        if (!value) return false;
        return value >= tenYearsAgoStr && value <= todayStr;
      },
    ),
  value: yup
    .number()
    .typeError("Введите число")
    .required("Прогресс обязателен")
    .min(0, "Минимум 0"), // значение прогресса >= 0
  notes: yup.string().required("Добавьте заметку"), // обязательное поле заметки
});
