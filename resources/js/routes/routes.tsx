import { errorRoutes } from '@/routes/modules/errors.routes'
import IRoute from '../interfaces/IRoute'
import { authRoutes } from './modules/auth.routes'
import { backofficeRoutes } from './modules/backoffice.routes'
import { miscellaneousRoutes } from './modules/miscellaneous.routes'

const routes: IRoute[] = [...authRoutes, ...backofficeRoutes, ...miscellaneousRoutes, ...errorRoutes]

export { routes }
