import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isClient = () => typeof window !== 'undefined'

export const encodeTag = (tag: string[]) => {
  return tag.toString()
}
