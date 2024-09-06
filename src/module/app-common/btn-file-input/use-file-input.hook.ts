import { useMemo, useState } from 'react'

export const useFilePreviewInput = (defaultUrl?: string) => {
  const [file, setFile] = useState<File | null>(null)

  // Nếu các bạn dùng Next.js 15 (tức React 19) thì không cần dùng useMemo chỗ này
  const previewFileUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return defaultUrl
  }, [defaultUrl, file])

  return { file, setFile, previewFileUrl }
}
