'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@core/app-shadcn/alert-dialog'

import { useMutationDeleteTable } from '@app/api-next/tables/mutate/use-mutation-delete-table.hook'

import { useManageTablesContext } from '@module/manage-tables'

export function AlertDialogDeleteTable() {
  const { tableDelete, setTableDelete } = useManageTablesContext()

  const { mutate } = useMutationDeleteTable()
  const deleteTable = () => {
    if (!tableDelete) return

    mutate(tableDelete.number, {
      onSuccess: () => {
        setTableDelete(null)
      }
    })
  }

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setTableDelete(null)
    }
  }

  return (
    <AlertDialog open={Boolean(tableDelete)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa bàn ăn?</AlertDialogTitle>

          <AlertDialogDescription>
            Bàn{' '}
            <span className='bg-foreground text-primary-foreground rounded px-1'>
              {tableDelete?.number}
            </span>{' '}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTable}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
