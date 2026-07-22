import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'
import { useAxios } from '@/hooks/useAxios'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm'

const LoginPage = () => {
  const { isAuth } = useAxios()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate(RoutesBackoffice.Home)
    }
  }, [isAuth, navigate])

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
