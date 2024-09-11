'use client'

import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react'

import { TableItem } from '@app/api-next/tables/tables.dto'

type TManageTablesContext = {
  tableIdEdit: number | undefined
  setTableIdEdit: (_TValue: number | undefined) => void
  tableDelete: TableItem | null
  setTableDelete: (_TValue: TableItem | null) => void
}

const ManageTablesContext = createContext<TManageTablesContext | undefined>(
  undefined
)

export function ManageTablesProvider({ children }: PropsWithChildren) {
  const [tableIdEdit, setTableIdEdit] = useState<number | undefined>(undefined)
  const [tableDelete, setTableDelete] = useState<TableItem | null>(null)

  const value = useMemo(
    () => ({
      tableIdEdit,
      setTableIdEdit,
      tableDelete,
      setTableDelete
    }),
    [tableIdEdit, setTableIdEdit, tableDelete, setTableDelete]
  )

  return (
    <ManageTablesContext.Provider value={value}>
      {children}
    </ManageTablesContext.Provider>
  )
}

export function useManageTablesContext() {
  const context = useContext(ManageTablesContext)

  if (context === undefined) {
    throw new Error(
      'useManageTablesContext must be used within a ManageTablesProvider'
    )
  }
  return context
}
