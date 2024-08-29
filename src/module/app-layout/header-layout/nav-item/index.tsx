'use client'

import Link from 'next/link'

import { menuItems } from './menu-item'

export function NavItems({ className }: { className?: string }) {
  return menuItems.map((item) => {
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
