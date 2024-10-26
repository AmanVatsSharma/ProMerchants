import NewPasswordForm from '@/components/auth/NewPasswordForm'
import React, { Suspense } from 'react'


const PasswordResetPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  )
}

export default PasswordResetPage;