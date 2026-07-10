import ISubItem from '@/components/Layouts/SidelbarLink/subItem.interface'
import { Role } from '@/enums/Role'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useTranslation } from 'react-i18next'

export const useMenu = () => {
  const { t } = useTranslation()

  const canCatalogs = [Role.Admin]
  const canCoupons = [Role.Admin]

  const catalogSubmenu: ISubItem[] = [
    { path: RoutesBackoffice.Role, name: t('Roles') },
    { path: RoutesBackoffice.Items, name: t('menu.items') }
  ]

  const canImages = [Role.Admin]

  const uiSubmenu: ISubItem[] = [{ path: RoutesBackoffice.UiPricingCard, name: t('Pricing Card') }]

  return {
    canCatalogs,
    canCoupons,
    canImages,
    catalogSubmenu,
    uiSubmenu,
    t
  }
}
