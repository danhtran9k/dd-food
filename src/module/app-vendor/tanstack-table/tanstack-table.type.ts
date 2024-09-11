import { ColumnDef, TableOptions } from '@tanstack/react-table'

export const PAGE_SIZE = 2
export const PAGE_SIZE_5 = 5
export const PAGE_SIZE_10 = 10

export type TTanStackHookOption<T> = Omit<
  TableOptions<T>,
  'data' | 'columns' | 'getCoreRowModel'
>

// Vì K sẽ infer auto từ data nên thường ko cần explicit ra
// Tuy nhiên đôi lúc cần dùng tới K nên define thứ tự swap nhau
export type TUseTanStackTable<K, T> = {
  data: T[]
  columns: ColumnDef<T, K>[]
  option?: TTanStackHookOption<T>
}
