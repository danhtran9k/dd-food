import { UrlObject } from 'url'

import Link from 'next/link'

import { ButtonProps, buttonVariants } from '@core/app-shadcn/button'
import { cn } from '@core/utils'

// type TProps =
//   | ({
//       isLink: true
//     } & React.ComponentProps<typeof Link>)
//   | ({
//       isLink?: false
//     } & React.ComponentProps<'a'>)

// type PaginationLinkProps<T extends boolean> = {
//   isActive?: boolean
//   isLink?: T
// } & Pick<ButtonProps, 'size'> &
//   (T extends true
//     ? React.ComponentProps<typeof Link>
//     : React.ComponentProps<'a'>)

// href undefined -> navigate by state
type TProps =
  | ({
      href: string | UrlObject
    } & React.ComponentProps<typeof Link>)
  | ({
      href: undefined
    } & React.ComponentProps<'a'>)

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  TProps

const PaginationLink = ({
  className,
  isActive,
  href,
  size = 'icon',
  ...props
}: PaginationLinkProps) => {
  if (href) {
    return (
      <Link
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          buttonVariants({
            variant: isActive ? 'outline' : 'ghost',
            size
          }),
          className
        )}
        {...(props as React.ComponentProps<typeof Link>)}
        href={href}
      />
    )
  } else {
    return (
      <a
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          buttonVariants({
            variant: isActive ? 'outline' : 'ghost',
            size
          }),
          className
        )}
        {...(props as React.ComponentProps<'a'>)}
      />
    )
  }
}

type OriginalPaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>
// React.ComponentProps<'a'>

const OriginalPaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: OriginalPaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'
OriginalPaginationLink.displayName = 'OriginalPaginationLink'

export { OriginalPaginationLink, PaginationLink }
