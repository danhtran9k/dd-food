'use client'

import { Activity, DollarSign, Salad, Users } from 'lucide-react'

import { useDateInput } from '@core/app-hook/use-date-input.hook'
import { Button } from '@core/app-shadcn/button'
import { Card, CardContent, CardHeader, CardTitle } from '@core/app-shadcn/card'
import { Input } from '@core/app-shadcn/input'
import { formatCurrency, formatDateInput } from '@core/utils'

import { useIndicator } from '@app/api-next/indicator/use-indicator.hook'

import { DebugParams } from '@module/app-common/debug-params'

const ICON_CLASS = 'h-4 w-4 text-muted-foreground'

export default function DashboardMain() {
  const { fromDate, toDate, resetDateFilter, handleChange } = useDateInput()

  const { data } = useIndicator(
    {
      fromDate,
      toDate
    },
    (data) => data.payload.data
  )

  const revenue = data?.revenue ?? 0
  const guestCount = data?.guestCount ?? 0
  const orderCount = data?.orderCount ?? 0
  const servingTableCount = data?.servingTableCount ?? 0
  const revenueByDate = data?.revenueByDate ?? []
  const dishIndicator = data?.dishIndicator ?? []

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <div className='flex items-center'>
          <span className='mr-2'>Từ</span>
          <Input
            type='datetime-local'
            placeholder='Từ ngày'
            className='text-sm'
            value={formatDateInput(fromDate)}
            onChange={handleChange('form')}
          />
        </div>

        <div className='flex items-center'>
          <span className='mr-2'>Đến</span>
          <Input
            type='datetime-local'
            placeholder='Đến ngày'
            value={formatDateInput(toDate)}
            onChange={handleChange('to')}
          />
        </div>

        <Button className='' variant={'outline'} onClick={resetDateFilter}>
          Reset
        </Button>

        <DebugParams onClick={handleChange} />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Tổng doanh thu
            </CardTitle>
            <DollarSign className={ICON_CLASS} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(revenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Khách</CardTitle>
            <Users className={ICON_CLASS} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{guestCount}</div>
            <p className='text-xs text-muted-foreground'>Gọi món</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Đơn hàng</CardTitle>
            <Salad className={ICON_CLASS} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{orderCount}</div>
            <p className='text-xs text-muted-foreground'>Đã thanh toán</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Bàn đang phục vụ
            </CardTitle>
            <Activity className={ICON_CLASS} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{servingTableCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
