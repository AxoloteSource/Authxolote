import '@/assets/css/auth-layout.css'
import React from 'react'

const AuthLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="auth-layout-container">
      <div className="auth-layout-content relative flex min-h-screen flex-col sm:flex-row">
        <div className="flex min-w-0 flex-auto flex-col items-start justify-center sm:flex-row sm:items-start md:items-start">
          <div className="flex w-full items-center justify-center p-6 sm:w-4/5 sm:rounded-lg sm:p-8 md:w-3/5 md:rounded-none md:p-10 lg:w-1/2 lg:p-14 xl:w-2/5">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
