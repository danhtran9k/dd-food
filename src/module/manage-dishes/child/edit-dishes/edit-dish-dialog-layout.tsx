'use client'

import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@core/app-shadcn/dialog'

type EditDishDialogLayoutProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const EDIT_DISH_FORM_ID = 'edit-dish-form'

export const EditDishDialogLayout = ({
  children,
  open,
  onOpenChange
}: EditDishDialogLayoutProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
      <DialogHeader>
        <DialogTitle>Cập nhật món ăn</DialogTitle>
        <DialogDescription>
          Các trường sau đây là bắ buộc: Tên, ảnh
        </DialogDescription>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button type='submit' form={EDIT_DISH_FORM_ID}>
          Lưu
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
