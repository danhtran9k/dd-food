'use client'

import { useMutationDeleteDish } from '@app/api-next/dishes/mutate/use-mutation-delete-dish.hook'

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

import { useManageDishesContext } from '@module/manage-dishes'

export function AlertDialogDeleteDish() {
  const { dishDelete, setDishDelete } = useManageDishesContext()

  const { mutate } = useMutationDeleteDish()
  const deleteDish = () => {
    if (!dishDelete) return

    mutate(dishDelete.id, {
      onSuccess: () => {
        setDishDelete(null)
      }
    })
  }

  const onOpenChange = (value: boolean) => {
    if (!value) {
      setDishDelete(null)
    }
  }

  return (
    <AlertDialog open={Boolean(dishDelete)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa món ăn?</AlertDialogTitle>

          <AlertDialogDescription>
            Món{' '}
            <span className='bg-foreground text-primary-foreground rounded px-1'>
              {dishDelete?.name}
            </span>{' '}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDish}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
