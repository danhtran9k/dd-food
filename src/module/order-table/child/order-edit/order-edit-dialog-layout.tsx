import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@core/app-shadcn/dialog'

type TOrderEditDialogLayout = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const ORDER_EDIT_FORM_ID = 'edit-order-form'

export const OrderEditDialogLayout = ({
  children,
  open,
  onOpenChange
}: TOrderEditDialogLayout) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Cập nhật đơn hàng</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button type='submit' form={ORDER_EDIT_FORM_ID}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
