import { Suspense } from 'react'

import { LoginForm } from '@module/login-form'

export default function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
