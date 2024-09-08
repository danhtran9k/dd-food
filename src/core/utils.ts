import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import envConfig from '@core/config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isClient = () => typeof window !== 'undefined'

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const getUrlWithParams = (
  url: string,
  params: Record<string, string>
) => {
  // check ? include in url
  const hasQuery = url.includes('?')

  // if (process.env.NODE_ENV === 'production') return url

  return hasQuery
    ? `${url}&${new URLSearchParams(params)}`
    : `${url}?${new URLSearchParams(params)}`
}

export const getUrlImage = (imageName: string) => {
  return `${envConfig.NEXT_PUBLIC_URL}/${imageName}`
}

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number)
}
