import { useMenu } from '@/appComponents/Menu/useMenu'
import { SidebarLink } from '@/components/Layouts/SidelbarLink/SidebarLink'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { Database, House, Image, Palette, QrCode, Ticket } from 'lucide-react'

const iconsClassName = 'group-hover:!text-primary shrink-0 ltr:mr-2'

export const Menu = () => {
  const { canCatalogs, canCoupons, canImages, catalogSubmenu, uiSubmenu, t } = useMenu()

  return (
    <ul>
      <SidebarLink name={t('home')} to={RoutesBackoffice.Home} icon={<House className={iconsClassName} />} />
      <SidebarLink name={t('scan')} to={RoutesBackoffice.Scan} icon={<QrCode className={iconsClassName} />} />
      <SidebarLink roles={canImages} name={t('images')} to={RoutesBackoffice.Images} icon={<Image className={iconsClassName} />} />
      <SidebarLink roles={canCoupons} name={t('coupons')} to={RoutesBackoffice.Coupons} icon={<Ticket className={iconsClassName} />} />
      <SidebarLink
        roles={canCatalogs}
        subItems={catalogSubmenu}
        name={t('menu.catalogs')}
        to={RoutesBackoffice.Catalog}
        icon={<Database className={iconsClassName} />}
      />
      <SidebarLink subItems={uiSubmenu} name="UI Components" to={RoutesBackoffice.Ui} icon={<Palette className={iconsClassName} />} />
    </ul>
  )
}
