import { Button } from '@core/app-shadcn/button'

type TDebugParams = {
  onClick: (
    _Type: 'form' | 'to'
  ) => (_TEv: React.ChangeEvent<HTMLInputElement>) => void
}

export const DebugParams = ({ onClick }: TDebugParams) => {
  const handleClick = () =>
    onClick('form')({
      target: { value: '2024-01-13T17:00' }
    } as React.ChangeEvent<HTMLInputElement>)

  return (
    <Button className='bg-red-300' variant={'outline'} onClick={handleClick}>
      DB
    </Button>
  )
}
