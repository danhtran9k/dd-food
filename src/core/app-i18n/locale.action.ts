'use server'

// Ko dùng server-only được vì phía client vẫn tracking code
import { cookies } from 'next/headers'

import { COOKIE_NAME, defaultLocale } from './locale-config'

// Phải thêm async vào để thành server action
export const getLocaleCookie = async () =>
  cookies().get(COOKIE_NAME)?.value || defaultLocale

export const setLocaleCookie = async (locale: string) =>
  cookies().set(COOKIE_NAME, locale)
