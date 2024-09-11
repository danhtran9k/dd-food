import envConfig from '@core/config'

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const getUrlWithParams = (
  url: string,
  params: Record<string, string> | string
) => {
  // check ? include in url
  const hasQuery = url.includes('?')
  const paramsString =
    typeof params === 'string' ? params : new URLSearchParams(params)
  // if (process.env.NODE_ENV === 'production') return url

  return hasQuery ? `${url}&${paramsString}` : `${url}?${paramsString}`
}

export const getUrlImage = (imageName: string) => {
  return `${envConfig.NEXT_PUBLIC_URL}/${imageName}`
}
