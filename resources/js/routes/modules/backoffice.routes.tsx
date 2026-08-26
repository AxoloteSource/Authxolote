import IRoute from '@/interfaces/IRoute'

import { lazy } from 'react'
const HomePage = lazy(() => import('@/pages/Backoffice/HomePage/HomePage'))
const RolePage = lazy(() => import('@/pages/Backoffice/CatalogPage/RolePage/RolePage'))
const RoleActionPage = lazy(() => import('@/pages/Backoffice/CatalogPage/RoleActionPage/RoleActionPage'))
const UiPage = lazy(() => import('@/pages/Backoffice/UiPage/UiPage'))
const PricingCardPage = lazy(() => import('@/pages/Backoffice/UiPage/PricingCardPage/PricingCardPage'))
const UserPage = lazy(() => import('@/pages/Backoffice/UserPage/UserPage'))
const UserListPage = lazy(() => import('@/pages/Backoffice/UserListPage/UserListPage'))
const ApplicationsPage = lazy(() => import('@/pages/Backoffice/ApplicationsPage/ApplicationsPage'))
const MenusPage = lazy(() => import('@/pages/Backoffice/MenuPage/MenusPage/MenusPage'))
const MenuShowPage = lazy(() => import('@/pages/Backoffice/MenuPage/MenuShowPage/MenuShowPage'))
const DEBUG_ERRORS = import.meta.env.VITE_DEBUG_ERRORS === 'true'
const ErrorTestPage = DEBUG_ERRORS ? lazy(() => import('@/pages/ErrorTestPage/ErrorTestPage')) : undefined

export enum RoutesBackoffice {
  Home = '/',
  Catalog = '/catalogs',
  Role = '/catalogs/roles',
  RoleAction = `/catalogs/roles/actions`,
  ErrorTest = '/error-test',
  Users = '/users',
  UserLists = '/user-lists',
  MenuApplications = '/applications',
  MenuMenus = '/menus',
  MenuShow = '/menus/show',
  Ui = '/ui',
  UiPricingCard = '/ui/pricing-card'
}

export const backofficeRoutes: IRoute[] = [
  {
    path: RoutesBackoffice.Home,
    element: <HomePage />,
    private: true
  },
  {
    path: RoutesBackoffice.Users,
    element: <UserPage />,
    private: true
  },
  {
    path: RoutesBackoffice.UserLists,
    element: <UserListPage />,
    private: true
  },
  {
    path: RoutesBackoffice.MenuApplications,
    element: <ApplicationsPage />,
    private: true
  },
  {
    path: RoutesBackoffice.MenuMenus,
    element: <MenusPage />,
    private: true
  },
  {
    path: RoutesBackoffice.MenuShow,
    element: <MenuShowPage />,
    private: true
  },
  {
    path: RoutesBackoffice.Role,
    element: <RolePage />,
    private: true
  },
  {
    path: RoutesBackoffice.RoleAction,
    element: <RoleActionPage />,
    private: true
  },
  {
    path: RoutesBackoffice.UiPricingCard,
    element: <PricingCardPage />,
    private: true
  },
  {
    path: RoutesBackoffice.Ui,
    element: <UiPage />,
    private: true
  },

  ...(DEBUG_ERRORS && ErrorTestPage
    ? [
        {
          path: RoutesBackoffice.ErrorTest,
          element: <ErrorTestPage />,
          private: true
        } as IRoute
      ]
    : [])
]
