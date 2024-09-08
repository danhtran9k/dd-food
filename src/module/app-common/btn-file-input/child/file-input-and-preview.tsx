'use client'

import { Upload } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@core/app-shadcn/avatar'
import { FormItem } from '@core/app-shadcn/form'

import { BtnFileInput } from '@module/app-common/btn-file-input'

type FileInputAndPreviewProps = {
  previewAvatarFromFile: string
  handleFileSelected: (_TFile: File) => void
  previewFallback: string
} & React.PropsWithChildren

export const FileInputAndPreview = ({
  previewAvatarFromFile,
  previewFallback,
  handleFileSelected,
  children
}: FileInputAndPreviewProps) => {
  // Helper component để gọn code, ko nên export ra dùng nhiều

  return (
    <FormItem>
      <div className='flex gap-2 items-start justify-start'>
        <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
          <AvatarImage src={previewAvatarFromFile} />
          <AvatarFallback className='rounded-none'>
            {previewFallback}
          </AvatarFallback>
        </Avatar>

        <BtnFileInput
          accept='image/*'
          onFileSelected={handleFileSelected}
          className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
        >
          {children ?? (
            <>
              <Upload className='h-4 w-4 text-muted-foreground' />
              <span className='sr-only'>Upload</span>
            </>
          )}
        </BtnFileInput>
      </div>
    </FormItem>
  )
}
