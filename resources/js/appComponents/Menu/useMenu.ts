import ISubItem from '@/components/Layouts/SidelbarLink/subItem.interface'
import { Role } from '@/enums/Role'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useTranslation } from 'react-i18next'

export const useMenu = () => {
  const { t } = useTranslation()


  const catalogSubmenu: ISubItem[] = [
    { path: RoutesBackoffice.Role, name: t('Roles') },
  ]


  const uiSubmenu: ISubItem[] = [{ path: RoutesBackoffice.UiPricingCard, name: t('Pricing Card') }]

  return {
    catalogSubmenu,
    uiSubmenu,
    t
  }
}
