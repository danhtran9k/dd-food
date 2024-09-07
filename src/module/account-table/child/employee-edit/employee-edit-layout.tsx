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

type EmployeeEditLayoutProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const EDIT_EMPLOYEE_FORM_ID = 'edit-employee-form'

export const EmployeeEditLayout = ({
  children,
  open,
  onOpenChange
}: EmployeeEditLayoutProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
      <DialogHeader>
        <DialogTitle>Cập nhật tài khoản</DialogTitle>
        <DialogDescription>
          Các trường tên, email, mật khẩu là bắt buộc
        </DialogDescription>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button type='submit' form={EDIT_EMPLOYEE_FORM_ID}>
          Lưu
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
