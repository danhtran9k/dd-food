'use client'

import { Table as TTanStackTable, flexRender } from '@tanstack/react-table'
import { memo } from 'react'

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableRoot,
  TableRow
} from '@core/app-shadcn/table'

type TAppTable<T> = {
  table: TTanStackTable<T>
}

// T sẽ tự infer,
// https://ui.shadcn.com/docs/components/data-table
// https://github.com/TanStack/table/issues/2344
const Table = <T,>({ table }: TAppTable<T>) => {
  const { getHeaderGroups, getRowModel, getAllColumns } = table
  const rows = getRowModel().rows

  return (
    <TableRoot>
      <TableHeader>
        {getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows?.length ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={getAllColumns().length}
              className='h-24 text-center'
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </TableRoot>
  )
}

export const TanStackTable = memo(Table) as <T>(
  _TProps: TAppTable<T>
) => JSX.Element
