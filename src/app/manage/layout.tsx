import { DarkModeToggle } from '@module/app-common/dark-mode-toggle'
import { DropdownAvatar } from '@module/app-common/dropdown-avatar'
import {
  SideManageBar,
  SideManageBarMobile
} from '@module/app-layout/side-manage-menu'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <SideManageBar />
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <SideManageBarMobile />

          <div className='relative ml-auto flex-1 md:grow-0'>
            <div className='flex justify-end'>
              <DarkModeToggle />
            </div>
          </div>

          <DropdownAvatar />
        </header>

        {children}
      </div>
    </div>
  )
}
