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

type AddDishDialogLayoutProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const ADD_DISH_FORM_ID = 'add-dish-form'
export const AddDishDialogLayout = ({
  children,
  open,
  onOpenChange
}: AddDishDialogLayoutProps) => (
  <Dialog onOpenChange={onOpenChange} open={open}>
    <DialogTrigger asChild>
      <Button size='sm' className='h-7 gap-1'>
        <PlusCircle className='h-3.5 w-3.5' />
        <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
          Thêm món ăn
        </span>
      </Button>
    </DialogTrigger>

    <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
      <DialogHeader>
        <DialogTitle>Thêm món ăn</DialogTitle>
        <DialogDescription />
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button type='submit' form={ADD_DISH_FORM_ID}>
          Thêm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
