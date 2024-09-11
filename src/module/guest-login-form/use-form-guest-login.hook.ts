import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  GuestLoginBody,
  GuestLoginBodyType
} from '@app/api-next/guest/guest.dto'

export const useFormGuestLogin = () => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const params = useParams()
  const tableNumber = Number(params.number)

  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: '',
      token: token ?? '',
      tableNumber
    }
  })

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [token, router])

  return form
}

