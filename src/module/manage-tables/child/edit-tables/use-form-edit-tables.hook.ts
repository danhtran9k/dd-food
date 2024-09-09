import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  UpdateTableBody,
  UpdateTableBodyType
} from '@app/api-next/tables/mutate/tables-mutate.dto'
import { TableStatus } from '@app/api-next/tables/tables.dto'
import { useTableById } from '@app/api-next/tables/use-table-by-id.hook'

import { useManageTablesContext } from '@module/manage-tables'

export const useFormEditTables = () => {
  const { tableIdEdit: id, setTableIdEdit: setId } = useManageTablesContext()

  const { data: responseData } = useTableById(id as number, Boolean(id))
  const data = responseData?.payload.data

  const form = useForm<UpdateTableBodyType>({
    resolver: zodResolver(UpdateTableBody),
    defaultValues: {
      capacity: 2,
      status: TableStatus.Hidden,
      changeToken: false
    }
  })

  useEffect(() => {
    if (data) {
      const { capacity, status } = data
      form.reset({
        capacity,
        status,
        changeToken: form.getValues('changeToken')
      })
    }
  }, [data, form])

  return { form, setId, id, data }
}
