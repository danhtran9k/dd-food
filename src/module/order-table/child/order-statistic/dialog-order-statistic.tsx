import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@core/app-shadcn/dialog'
import { Separator } from '@core/app-shadcn/seperator'

import { OrderGuestDetail, useOrderTableContext } from '@module/order-table'

type DialogOrderStatisticProps = {
  isOpen: boolean
  selectedTableNumber: number
  setSelectedTableNumber: (_TTable: number) => void
}
export const DialogOrderStatistic = ({
  isOpen,
  selectedTableNumber,
  setSelectedTableNumber
}: DialogOrderStatisticProps) => {
  const {
    orderStats: { servingOrderByTable }
  } = useOrderTableContext()

  const ordersByGuest = servingOrderByTable[selectedTableNumber]

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelectedTableNumber(0)
  }

  const handlePaySuccess = () => {
    setSelectedTableNumber(0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='max-h-full overflow-auto'>
        {ordersByGuest && (
          <DialogHeader>
            <DialogTitle>
              Khách đang ngồi tại bàn {selectedTableNumber}
            </DialogTitle>
          </DialogHeader>
        )}

        <div>
          {ordersByGuest &&
            Object.entries(ordersByGuest).map(([guestId, orders], index) => (
              <div key={guestId}>
                {!!index && <Separator className='my-5' />}
                <OrderGuestDetail
                  guest={orders[0].guest}
                  orders={orders}
                  onPaySuccess={handlePaySuccess}
                />
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
