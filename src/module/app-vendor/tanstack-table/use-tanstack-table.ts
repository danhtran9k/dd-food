import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { TUseTanStackTable } from './tanstack-table.type'

export const useTanStackTable = <K, T>({
  data,
  columns,
  option
}: TUseTanStackTable<K, T>) => {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    ...option,
    // state phải để ở dưới để ko bị option override lại
    state: {
      ...option?.state
    }
  })

  return { table }
}
