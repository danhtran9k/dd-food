import { useState } from 'react'

import { endOfDay, startOfDay } from '@core/utils/date-time.utils'

export const useDateInput = () => {
  const [fromDate, setFromDate] = useState(startOfDay())
  const [toDate, setToDate] = useState(endOfDay())

  const resetDateFilter = () => {
    setFromDate(startOfDay())
    setToDate(endOfDay())
  }

  const handleChange =
    (type: 'form' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'form') {
        setFromDate(new Date(e.target.value))
      } else {
        setToDate(new Date(e.target.value))
      }
    }

  return {
    fromDate,
    toDate,
    resetDateFilter,
    handleChange
  }
}
