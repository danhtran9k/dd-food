import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { TUseTanStackTable } from './tanstack-table.type'

export const useTanStackTable = <K, T>({
  data,
  columns,
  option
}: TUseTanStackTable<K, T>) => {
  const table = useReactTable<T>({
    // CORE, chỉ display, ko pagination, ko có feature gì khác
    // Mỗi feature khi dùng cần truyền options tương ứng
    // ref - use-tanstack-pagination.hook.ts, use-account-table-feature.hook.ts
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    defaultColumn: {
      size: 100, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500 //enforced during column resizing
    },

    // Override options
    ...option,
    // state phải để ở dưới để ko bị option override lại
    state: {
      ...option?.state
    }
  })

  return { table }
}
