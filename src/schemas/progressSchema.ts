import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);
const tenYearsAgo = new Date();
tenYearsAgo.setFullYear(today.getFullYear() - 10);
tenYearsAgo.setHours(0, 0, 0, 0);

export const progressSchema = yup.object({
  date: yup
    .date()
    .typeError("Введите корректную дату")
    .required("Дата обязательна")
    .min(tenYearsAgo, "Дата не может быть старше 10 лет")
    .max(today, "Нельзя выбирать дату из будущего"),
  value: yup
    .number()
    .typeError("Введите число")
    .required("Прогресс обязателен")
    .min(0, "Минимум 0"), // значение прогресса >= 0
  notes: yup.string().required("Добавьте заметку"), // обязательное поле заметки
});
