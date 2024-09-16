import { UpdateOrderBodyType } from '@app/api-next/orders/mutate/mutate-orders.dto'
import { useMutateOrdersUpdate } from '@app/api-next/orders/mutate/use-mutate-orders-update.hook'

type TUseOrderEditSubmit = {
  orderIdEdit?: number
  onSubmitSuccess?: () => void
  onError: (_TError: any) => void
  reset: () => void
}

export const useOrderEditSubmit = ({
  orderIdEdit,
  onSubmitSuccess,
  onError,
  reset
}: TUseOrderEditSubmit) => {
  const { isPending, mutate } = useMutateOrdersUpdate(onError)

  const onSubmit = async (values: UpdateOrderBodyType) => {
    if (isPending || !orderIdEdit) return

    mutate(
      {
        orderId: orderIdEdit,
        data: {
          ...values,
          orderId: orderIdEdit
        }
      },
      {
        onSuccess: () => {
          reset()
          onSubmitSuccess && onSubmitSuccess()
        }
      }
    )
  }

  return { onSubmit }
}
