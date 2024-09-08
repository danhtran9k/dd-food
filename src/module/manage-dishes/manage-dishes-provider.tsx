'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

import { DishItem } from '@app/api-next/dishes/dishes.dto'

type TManageDishesContext = {
  dishIdEdit: number | undefined
  setDishIdEdit: (_TValue: number | undefined) => void
  dishDelete: DishItem | null
  setDishDelete: (_TValue: DishItem | null) => void
}

const ManageDishesContext = createContext<TManageDishesContext | undefined>(
  undefined
)

export function ManageDishesProvider({ children }: { children: ReactNode }) {
  const [dishIdEdit, setDishIdEdit] = useState<number | undefined>(undefined)
  const [dishDelete, setDishDelete] = useState<DishItem | null>(null)

  const value = {
    dishIdEdit,
    setDishIdEdit,
    dishDelete,
    setDishDelete
  }

  return (
    <ManageDishesContext.Provider value={value}>
      {children}
    </ManageDishesContext.Provider>
  )
}
export function useManageDishesContext() {
  const context = useContext(ManageDishesContext)

  if (context === undefined) {
    throw new Error(
      'useManageDishesContext must be used within a ManageDishesProvider'
    )
  }
  return context
}
