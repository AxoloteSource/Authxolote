import ISubItem from '@/components/Layouts/SidelbarLink/subItem.interface'
import { Role } from '@/enums/Role'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useTranslation } from 'react-i18next'

export const useMenu = () => {
  const { t } = useTranslation()

  const canCatalogs: Role[] = [Role.Admin]

  const catalogSubmenu: ISubItem[] = [
    { path: RoutesBackoffice.Role, name: t('Roles') },
  ]


  const uiSubmenu: ISubItem[] = [{ path: RoutesBackoffice.UiPricingCard, name: t('Pricing Card') }]

  const menuSubmenu: ISubItem[] = [
    { path: RoutesBackoffice.MenuMenus, name: t('Menus') },
    { path: RoutesBackoffice.MenuMenuItems, name: t('Menu Items') },
  ]

  return {
    canCatalogs,
    catalogSubmenu,
    uiSubmenu,
    menuSubmenu,
    t
  }
}
