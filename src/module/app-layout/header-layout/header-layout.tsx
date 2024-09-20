import { DarkModeToggle } from '@module/app-common/dark-mode-toggle'
import { SwitchLanguage } from '@module/app-layout/switch-language'

import { HeaderSheetDrawer } from './header-sheet-drawer'
import { IconHeaderLayout } from './icon-header'
import { NavItems } from './nav-item'

export const HeaderLayout = () => {
  return (
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <IconHeaderLayout />

        <NavItems className='text-muted-foreground transition-colors hover:text-foreground flex-shrink-0' />
      </nav>

      <HeaderSheetDrawer />

      <div className='ml-auto flex items-center gap-4'>
        <SwitchLanguage />
        <DarkModeToggle />
      </div>
    </header>
  )
}
