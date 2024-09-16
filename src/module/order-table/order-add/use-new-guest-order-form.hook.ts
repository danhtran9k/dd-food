import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { toast } from '@core/app-shadcn/use-toast'
import { handleErrorApi } from '@core/hook-form-error.utils'

import { GetListGuestsResType } from '@app/api-next/accounts/crud/account-guest-crud.dto'
import { useCreateGuestMutation } from '@app/api-next/accounts/crud/use-mutation-create-guest.hook'
import {
  GuestLoginBody,
  GuestLoginBodyType
} from '@app/api-next/guest/guest.dto'
import { GuestCreateOrdersBodyType } from '@app/api-next/guest/orders/mutate/mutate-guest-order.dto'
import { useMutateOrdersCreate } from '@app/api-next/orders/mutate/use-mutate-orders-create.hook'

type TUseNewGuestOrderForm = {
  orders: GuestCreateOrdersBodyType
  isNewGuest: boolean
  selectedGuest: GetListGuestsResType['data'][0] | null
}

export const useNewGuestOrderForm = ({
  orders,
  isNewGuest,
  selectedGuest
}: TUseNewGuestOrderForm) => {
  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: '',
      tableNumber: 0
    }
  })

  const createOrderMutation = useMutateOrdersCreate()
  const createGuestMutation = useCreateGuestMutation()

  const submitOrder = async () => {
    try {
      let guestId = selectedGuest?.id

      if (isNewGuest) {
        const { name, tableNumber } = form.getValues()
        const guestRes = await createGuestMutation.mutateAsync({
          name,
          tableNumber
        })
        guestId = guestRes.payload.data.id
      }

      if (!guestId) {
        toast({
          description: 'Hãy chọn một khách hàng'
        })
        return
      }

      await createOrderMutation.mutateAsync({
        guestId,
        orders
      })
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  return {
    form,
    submitOrder
  }
}
