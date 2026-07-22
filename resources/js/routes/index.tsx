import BlankLayout from '@/components/Layouts/BlankLayout'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const finalRoutes = routes.map((route) => {
  const element = route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>

  return {
    ...route,
    element: route.private ? <PrivateRoute route={route} element={element} /> : element
  }
})

const router = createBrowserRouter(finalRoutes)
export default router
