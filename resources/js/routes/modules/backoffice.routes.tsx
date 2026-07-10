import IRoute from '@/interfaces/IRoute'

import { lazy } from 'react'
const HomePage = lazy(() => import('@/pages/Backoffice/HomePage/HomePage'))
const RolePage = lazy(() => import('@/pages/Backoffice/CatalogPage/RolePage/RolePage'))
const RoleActionPage = lazy(() => import('@/pages/Backoffice/CatalogPage/RoleActionPage/RoleActionPage'))
const ItemsPage = lazy(() => import('@/pages/Backoffice/CatalogPage/ItemsPage/ItemsPage'))
const ImagesPage = lazy(() => import('@/pages/Backoffice/ImagesPage/ImagesPage'))
const CouponsPage = lazy(() => import('@/pages/Backoffice/CouponsPage/CouponsPage'))
const ScanPage = lazy(() => import('@/pages/Backoffice/ScanPage/ScanPage'))
const UiPage = lazy(() => import('@/pages/Backoffice/UiPage/UiPage'))
const PricingCardPage = lazy(() => import('@/pages/Backoffice/UiPage/PricingCardPage/PricingCardPage'))
const DEBUG_ERRORS = import.meta.env.VITE_DEBUG_ERRORS === 'true'
const ErrorTestPage = DEBUG_ERRORS ? lazy(() => import('@/pages/ErrorTestPage/ErrorTestPage')) : undefined

export enum RoutesBackoffice {
  Home = '/',
  Role = '/catalogs/roles',
  Items = '/catalogs/items',
  RoleAction = `/catalogs/roles/actions`,
  User = '/users',
  ErrorTest = '/error-test',
  Catalog = '/catalogs',
  Coupons = '/coupons',
  Images = '/images',
  Scan = '/scan',
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
    path: RoutesBackoffice.Items,
    element: <ItemsPage />,
    private: true
  },
  {
    path: RoutesBackoffice.Images,
    element: <ImagesPage />,
    private: true
  },
  {
    path: RoutesBackoffice.Coupons,
    element: <CouponsPage />,
    private: true
  },
  {
    path: RoutesBackoffice.Scan,
    element: <ScanPage />,
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
