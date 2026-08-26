import { useMenu } from '@/appComponents/Menu/useMenu'
import { SidebarLink } from '@/components/Layouts/SidelbarLink/SidebarLink'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { AppWindow, Database, House, ListTree, Palette, Users, UserPlus } from 'lucide-react'

const iconsClassName = 'group-hover:!text-primary shrink-0 ltr:mr-2'

export const Menu = () => {
  const { canCatalogs, catalogSubmenu, uiSubmenu, menuSubmenu, t } = useMenu()

  return (
    <ul>
      <SidebarLink name={t('home')} to={RoutesBackoffice.Home} icon={<House className={iconsClassName} />} />
      <SidebarLink name={t('users')} to={RoutesBackoffice.Users} icon={<Users className={iconsClassName} />} />
      <SidebarLink name={t('user_lists')} to={RoutesBackoffice.UserLists} icon={<UserPlus className={iconsClassName} />} />
      <SidebarLink name={t('applications')} to={RoutesBackoffice.MenuApplications} icon={<AppWindow className={iconsClassName} />} />
      <SidebarLink
        roles={canCatalogs}
        subItems={catalogSubmenu}
        name={t('menu.catalogs')}
        to={RoutesBackoffice.Catalog}
        icon={<Database className={iconsClassName} />}
      />
      <SidebarLink subItems={menuSubmenu} name={t('menu.menus')} to={RoutesBackoffice.MenuMenus} icon={<ListTree className={iconsClassName} />} />
      <SidebarLink subItems={uiSubmenu} name="UI Components" to={RoutesBackoffice.Ui} icon={<Palette className={iconsClassName} />} />
    </ul>
  )
}
