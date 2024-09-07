'use client'

import { usePathname } from 'next/navigation'

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
  onChange: (_TValue: number) => void
  pathname?: string
}

export const ShadcnPagination = ({ pathname, ...props }: TShadcnPagination) => {
  const { range, active, previous, next, setPage, first, last } =
    usePaginationControl(props)

  const disablePrevious = active === 1
  const disableLast = active === props.total

  const defaultPath = usePathname()
  const pathUrl = pathname ?? defaultPath

  const getHref = (page: number) => {
    return {
      pathname: pathUrl,
      query: {
        page
      }
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationFirst
          onClick={first}
          href={getHref(1)}
          className={cn({
            'cursor-not-allowed': disablePrevious
          })}
        />

        <PaginationPrevious
          onClick={previous}
          href={getHref(active - 1)}
          className={cn({
            'cursor-not-allowed': disablePrevious
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
            'cursor-not-allowed': disableLast
          })}
        />

        <PaginationLast
          onClick={last}
          href={getHref(props.total)}
          className={cn({
            'cursor-not-allowed': disableLast
          })}
        />
      </PaginationContent>
    </Pagination>
  )
}
