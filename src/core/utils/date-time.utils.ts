// Thay thế date-fns, hiện tại ko dùng nhiều nên tạm ko dùng lib

export const formatDateTimeToLocaleString = (date: string | Date) => {
  const dateDate = date instanceof Date ? date : new Date(date)
  return dateDate.toLocaleString('vi-VN')

  // Có thể dùng format của date-fns
  // return format(
  //   date instanceof Date ? date : new Date(date),
  //   'HH:mm:ss dd/MM/yyyy'
  // )
}

export const startOfDay = (date?: string | Date) => {
  // date-fns có hàm trực tiếp
  const dateDate = date instanceof Date ? date : new Date(date ?? new Date())
  dateDate.setHours(0, 0, 0, 0)
  return dateDate
}

export const endOfDay = (date?: string | Date) => {
  const dateDate = date instanceof Date ? date : new Date(date ?? new Date())
  dateDate.setHours(23, 59, 59, 999)
  return dateDate
}

export const formatDateTimeToTimeString = (date: string | Date) => {
  const dateObj = date instanceof Date ? date : new Date(date)
  return dateObj.toTimeString().split(' ')[0]
}

// https://stackoverflow.com/questions/31109961/value-of-datetime-local-with-react
export const formatDateInput = (date: Date) => {
  return date.toISOString().slice(0, 16)
}
