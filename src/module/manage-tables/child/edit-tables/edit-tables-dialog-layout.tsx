import { Button } from '@core/app-shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@core/app-shadcn/dialog'

type EditTableDialogLayoutProps = {
  children: React.ReactNode
  open: boolean
  onOpenChange: (_TOpen: boolean) => void
}

export const EDIT_TABLE_FORM_ID = 'edit-table-form'

export const EditTablesDialogLayout = ({
  children,
  open,
  onOpenChange
}: EditTableDialogLayoutProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
      <DialogHeader>
        <DialogTitle>Cập nhật bàn</DialogTitle>
      </DialogHeader>

      {children}

      <DialogFooter>
        <Button type='submit' form={EDIT_TABLE_FORM_ID}>
          Lưu
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
