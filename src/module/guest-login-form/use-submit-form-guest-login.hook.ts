import { UseFormSetError } from 'react-hook-form'

import { handleErrorApi } from '@core/hook-form-error.utils'

import { useGuestLoginMutation } from '@app/api-next/guest/auth/login/use-mutate-guest-login.hook'
import { GuestLoginBodyType } from '@app/api-next/guest/guest.dto'

export const useSubmitFormGuestLogin = (setError: UseFormSetError<any>) => {
  const { mutate, isPending } = useGuestLoginMutation()

  function onSubmit(values: GuestLoginBodyType) {
    if (isPending) return
    mutate(values, {
      onError: (error) =>
        handleErrorApi({
          error,
          setError
        })
    })
  }

  return { onSubmit }
}
