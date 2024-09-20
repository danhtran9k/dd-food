'use client'

import { usePathname } from '@core/app-i18n/routing'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@core/app-shadcn/pagination'
import { cn } from '@core/utils'

import { usePaginationControl } from './use-pagination-control.hook'

type TShadcnPagination = {
  page: number
  total: number
  isLink?: boolean
  onChange: (_TValue: number) => void
  pathname?: string
}

const CSS_DISABLE = 'cursor-not-allowed pointer-events-none text-gray-400'

export const ShadcnPagination = ({
  pathname,
  isLink = true,
  ...props
}: TShadcnPagination) => {
  const { range, active, previous, next, setPage, first, last } =
    usePaginationControl(props)

  const disablePrevious = active === 1
  const disableLast = active === props.total

  const defaultPath = usePathname()
  const pathUrl = pathname ?? defaultPath

  const getHref = (page: number) => {
    return isLink
      ? {
          pathname: pathUrl,
          query: {
            page
          }
        }
      : undefined
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationFirst
          onClick={first}
          href={getHref(1)}
          className={cn({
            [CSS_DISABLE]: disablePrevious
          })}
        />

        <PaginationPrevious
          onClick={previous}
          href={getHref(active - 1)}
          className={cn({
            [CSS_DISABLE]: disablePrevious
          })}
        />

        {range.map((page, index) => {
          if (page === 'dots') {
            return <PaginationEllipsis key={index} />
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={getHref(page)}
                isActive={page === active}
                onClick={() => setPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationNext
          onClick={next}
          href={getHref(active + 1)}
          className={cn({
            [CSS_DISABLE]: disableLast
          })}
        />

        <PaginationLast
          onClick={last}
          href={getHref(props.total)}
          className={cn({
            [CSS_DISABLE]: disableLast
          })}
        />
      </PaginationContent>
    </Pagination>
  )
}
