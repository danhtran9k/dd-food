'use client'

import { PlusCircle } from 'lucide-react'

import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@core/app-shadcn/dialog'

type AddTableDialogLayoutProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const ADD_TABLE_FORM_ID = 'add-table-form'
export const AddTableDialogLayout = ({
  children,
  open,
  onOpenChange
}: AddTableDialogLayoutProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogTrigger asChild>
      <Button size='sm' className='h-7 gap-1'>
        <PlusCircle className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Thêm bàn
        </span>
      </Button>
    </DialogTrigger>

    <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
      <DialogHeader>
        <DialogTitle>Thêm bàn</DialogTitle>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button type='submit' form={ADD_TABLE_FORM_ID}>
          Thêm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)