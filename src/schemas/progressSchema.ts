import * as yup from 'yup'

export const progressSchema = yup.object({
  date: yup
    .string()
    .required('Дата обязательна'), // поле date обязательно
  value: yup
    .number()
    .typeError('Введите число')
    .required('Прогресс обязателен')
    .min(0, 'Минимум 0'), // значение прогресса >= 0
  notes: yup
    .string()
    .required('Добавьте заметку') // обязательное поле заметки
})
