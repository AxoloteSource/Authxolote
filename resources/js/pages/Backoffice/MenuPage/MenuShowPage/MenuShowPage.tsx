import Card from '@/components/Card/Card'
import { MenuV2 } from '@/components/MenuV2/MenuV2'
import { Page } from '@/components/Page/Page'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useMenuShowPage } from './useMenuShowPage'

const breadCrumblesItems = [
  { to: RoutesBackoffice.Home, children: 'home' },
  { to: RoutesBackoffice.MenuMenus, children: 'menus' },
  { children: 'menu_show' }
]

const MenuShowPage = () => {
  const { menu } = useMenuShowPage()

  const handleEdit = (id: string) => {
    console.log(id)
  }

  const handleDelete = (id: string) => {
    console.log(id)
  }

  return (
    <Page titleTranslation="menu_show" breadCrumblesItems={breadCrumblesItems}>
      <div className="flex gap-4">
        <nav className={`sidebar w-[260px] py-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300`}>
          <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
            <li className="nav-item">
              <MenuV2 menu={menu} editMode onEdit={handleEdit} onDelete={handleDelete} />
            </li>
          </ul>
        </nav>
        <Card className="w-full"/>
      </div>
    </Page>
  )
}

export default MenuShowPage
