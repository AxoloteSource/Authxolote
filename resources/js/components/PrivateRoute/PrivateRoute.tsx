import { useAxios } from '@/hooks/useAxios'
import IRoute from '@/interfaces/IRoute'
import { AuthRoutes } from '@/routes/modules/auth.routes'
import { ErrorRoutes } from '@/routes/modules/errors.routes'
import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ element, route }: { element: JSX.Element; route: IRoute }) => {
  const { isAuth, user } = useAxios()

  if (!isAuth) return <Navigate to={AuthRoutes.Login} />

  if (route.hasPermission != undefined && !route.hasPermission(user!)) {
    return <Navigate to={ErrorRoutes.Forbidden} />
  }

  return element
}

export default PrivateRoute
