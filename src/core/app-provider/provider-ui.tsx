import { PropsWithChildren } from 'react'

import { ThemeProvider } from '@core/app-provider/shadcn-theme-provider'
import { Toaster } from '@core/app-shadcn/toaster'

export const ProviderUi = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
