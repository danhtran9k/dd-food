'use client'

import { PlusCircle } from 'lucide-react'

import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@core/app-shadcn/dialog'

type EmployeeFormLayoutProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const EmployeeFormLayout = ({
  children,
  open,
  onOpenChange
}: EmployeeFormLayoutProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogTrigger asChild>
      <Button size='sm' className='h-7 gap-1'>
        <PlusCircle className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Tạo tài khoản
        </span>
      </Button>
    </DialogTrigger>

    <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
      <DialogHeader>
        <DialogTitle>Tạo tài khoản</DialogTitle>

        <DialogDescription>
          Các trường tên, email, mật khẩu là bắt buộc
        </DialogDescription>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button type='submit' form='add-employee-form'>
          Thêm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
