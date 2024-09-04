import { Badge } from '@core/app-shadcn/badge'
import { errNextDebug } from '@core/debug/debug-next.utils'

export default async function Setting() {
  let data: any
  data = await errNextDebug()
  console.log('🚀 ~ Setting ~ data:', data)

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='mx-auto grid w-full flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Cài đặt
          </h1>
          <Badge variant='outline' className='ml-auto sm:ml-0'>
            Owner
          </Badge>
        </div>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8'></div>
      </div>
    </main>
  )
}
