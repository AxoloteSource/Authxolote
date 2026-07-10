import { AuthRoutes } from './modules/auth.routes'
import { RoutesBackoffice } from './modules/backoffice.routes'
import { RoutesMiscellaneous } from './modules/miscellaneous.routes'

export type IRoutes = AuthRoutes | RoutesMiscellaneous | RoutesBackoffice
