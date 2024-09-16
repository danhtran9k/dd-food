import { Skeleton } from '@core/app-shadcn/skeleton'

export function OrderTableSkeleton() {
  return (
    <div className='w-full'>
      {/* Tiêu đề của table */}
      <div className='flex justify-between items-center mb-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className='w-1/4 h-[20px] rounded-md' />
        ))}
      </div>

      {/* Mô phỏng các hàng trong table */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className='flex justify-between items-center mb-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className='w-1/4 h-[20px] rounded-md' />
          ))}
        </div>
      ))}
    </div>
  )
}
