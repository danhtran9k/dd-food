'use client'

import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
      // gỡ DK này ra vì guest khi tạo order -> navigate qua my-order thì ko refetch
      // refetchOnMount: false
    }
  }
})

// Setup theo style React basic bình thường thử
export function ReactQueryProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

// Nếu cần custom để get được data type của refetch thì cần phải setup lên useQuery gốc để tận dụng,
// Nếu ko thì ng6a2m hiểu return void / unknown và chỉ dùng để gọi
// ko tương tác với data resolve
export type TQueryRefetch = ReturnType<typeof useQuery>['refetch']
