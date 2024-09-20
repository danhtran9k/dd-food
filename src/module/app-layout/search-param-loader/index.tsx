import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

// https://github.com/vercel/next.js/discussions/61654#discussioncomment-10232083
type SearchParamsLoaderProps = {
  onParamsReceived: (_TParams: ReadonlyURLSearchParams) => void
}

export const SearchParamsLoader = React.memo(Suspender)

function Suspender(props: SearchParamsLoaderProps) {
  return (
    <Suspense>
      <Suspendend {...props} />
    </Suspense>
  )
}

// Tạo ra 1 component logic -> tạo 1 component cha bọc suspense riêng
// Memo cha, tạo ra thêm 1 useState searchParams
function Suspendend({ onParamsReceived }: SearchParamsLoaderProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    onParamsReceived(searchParams)
  })

  return null
}

export const useSearchParamsState = () => {
  const [searchParams, setSearchParams] =
    useState<ReadonlyURLSearchParams | null>(null)

  return [searchParams, setSearchParams] as const
}
