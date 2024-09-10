import { NEXT_API } from '@app/api-next/_core/api-endpoint'
import { httpClient } from '@app/api-next/_core/http/http.client'

export const revalidateApiClient = (tag: string) =>
  httpClient('GET', NEXT_API.REVALIDATE.api(tag))
