// T sẽ infer từ type data truyền vào

import { ColumnDef } from '@tanstack/react-table'

// K nếu cần thì truyền
export type TTableShadcn<K, T> = {
  data: T[]
  columns: ColumnDef<T, K>[]
}
