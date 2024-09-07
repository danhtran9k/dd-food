import { useState } from 'react'

// Mantine useUncontrolled hook
// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-uncontrolled/use-uncontrolled.ts

interface UseUncontrolledInput<T> {
  /** Value for controlled state */
  value?: T

  /** Initial value for uncontrolled state */
  defaultValue?: T

  /** Final value for uncontrolled state when value and defaultValue are not provided */
  finalValue?: T

  /** Controlled state onChange handler */
  onChange?: (_TValue: T, ..._TPayload: any[]) => void
}

export function useUncontrolled<T>({
  value,
  defaultValue,
  finalValue,
  onChange = () => {}
}: UseUncontrolledInput<T>): [
  T,
  (_TValue: T, ..._TPayload: any[]) => void,
  boolean
] {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue !== undefined ? defaultValue : finalValue
  )

  const handleUncontrolledChange = (val: T, ...payload: any[]) => {
    setUncontrolledValue(val)
    onChange?.(val, ...payload)
  }

  if (value !== undefined) {
    return [value as T, onChange, true]
  }

  return [uncontrolledValue as T, handleUncontrolledChange, false]
}
