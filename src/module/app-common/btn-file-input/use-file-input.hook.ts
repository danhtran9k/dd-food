import { useMemo, useState } from 'react'

import { mapDefaultPortUrl } from '@core/debug/debug.utils'

export const useFilePreviewInput = (defaultUrl?: string) => {
  const [file, setFile] = useState<File | null>(null)

  // Nếu các bạn dùng Next.js 15 (tức React 19) thì không cần dùng useMemo chỗ này
  const previewFileUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return mapDefaultPortUrl(defaultUrl ?? '')
  }, [defaultUrl, file])

  return { file, setFile, previewFileUrl }
}
