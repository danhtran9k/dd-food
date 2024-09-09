import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  CreateTableBody,
  CreateTableBodyType
} from '@app/api-next/tables/mutate/tables-mutate.dto'
import { TableStatus } from '@app/api-next/tables/tables.dto'

export const useFormAddTable = () => {
  const form = useForm<CreateTableBodyType>({
    resolver: zodResolver(CreateTableBody),
    defaultValues: {
      number: 0,
      capacity: 1,
      status: TableStatus.Available
    }
  })

  return form
}
