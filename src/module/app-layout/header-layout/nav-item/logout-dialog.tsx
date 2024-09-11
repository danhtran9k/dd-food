import { useRouter } from 'next/navigation'

import { useAuthContext } from '@core/app-provider/auth-provider'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@core/app-shadcn/alert-dialog'
import { handleErrorApi } from '@core/hook-form-error.utils'
import { ROUTE_PATH } from '@core/path.const'
import { cn } from '@core/utils'

import { Role } from '@app/api-next/_core/api-type.const'

import { useLogoutMutation } from '@app/api-next/auth/logout/use-logout-mutate.hook'

type LogoutDialogProps = {
  className?: string
}

export function LogoutDialog({ className }: LogoutDialogProps) {
  const { role, setRoleAuth } = useAuthContext()

  const router = useRouter()
  const logoutMutation = useLogoutMutation()
  const logout = async () => {
    if (logoutMutation.isPending) return

    try {
      await logoutMutation.mutateAsync()
      setRoleAuth()
      router.push(ROUTE_PATH.ROOT)
    } catch (error: any) {
      handleErrorApi({
        error
      })
    }
  }

  return (
    role && (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className={cn(className, 'cursor-pointer')}>Đăng xuất</div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn đăng xuất không?</AlertDialogTitle>

            <AlertDialogDescription>
              {role === Role.Guest && (
                <span>Việc đăng xuất có thể làm mất đi hóa đơn của bạn</span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Thoát</AlertDialogCancel>
            <AlertDialogAction onClick={logout}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  )
}
