import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'

import { AuthProvider } from '@core/app-provider/auth-provider'
import { ReactQueryProvider } from '@core/app-provider/react-query-provider'

import { RenewTokenInterval } from '@module/app-layout/renew-token-interval'

export const ProviderData = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        {children}
        <RenewTokenInterval />
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryProvider>
    </AuthProvider>
  )
}
