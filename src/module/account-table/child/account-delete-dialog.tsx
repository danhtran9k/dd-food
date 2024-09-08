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

import { useMutationDeleteAccount } from '@app/api-next/accounts/crud/use-mutation-delete-account.hook'

import { useAccountTableContext } from '@module/account-table'

export function AlertDialogDeleteAccount() {
  const { mutate } = useMutationDeleteAccount()
  const { employeeDelete, setEmployeeDelete } = useAccountTableContext()

  const handleDelete = () => {
    if (!employeeDelete) return

    mutate(employeeDelete.id, {
      onSuccess: () => {
        setEmployeeDelete(null)
      }
    })
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setEmployeeDelete(null)
    }
  }

  return (
    <AlertDialog open={Boolean(employeeDelete)} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa nhân viên?</AlertDialogTitle>
          <AlertDialogDescription>
            Tài khoản{' '}
            <span className='bg-foreground text-primary-foreground rounded px-1'>
              {employeeDelete?.name}
            </span>{' '}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
