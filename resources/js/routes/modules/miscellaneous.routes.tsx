import IRoute from '@/interfaces/IRoute'
import { Privacy } from '@/pages/Backoffice/PrivacyPage/Privacy'
import { TermsAndConditions } from '@/pages/Backoffice/TermsAndConditionsPage/TermsAndConditions'

export enum RoutesMiscellaneous {
  Privacy = '/privacy',
  Terms = '/termsConditions'
}

export const miscellaneousRoutes: IRoute[] = [
  {
    path: RoutesMiscellaneous.Privacy,
    element: <Privacy />,
    private: false,
    layout: 'blank',
    hasPermission: () => true
  },
  {
    path: RoutesMiscellaneous.Terms,
    element: <TermsAndConditions />,
    private: false,
    layout: 'blank',
    hasPermission: () => true
  }
]
