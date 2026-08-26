import { IMenuShow } from '@/interfaces/models/Menu/IMenuShow'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { MenuV2Header } from './MenuV2Header'
import { MenuV2Item } from './MenuV2Item'
import { useMenuV2 } from './useMenuV2'

interface MenuV2Props {
  menu?: IMenuShow
  editMode?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const MenuV2 = ({ menu: menuProp, editMode = false, onEdit, onDelete }: MenuV2Props) => {
  const { menu: fetchedMenu, isLoading, missing, message } = useMenuV2()
  const menu = menuProp ?? fetchedMenu

  const getItemComponent = (item: IMenuItem) =>
    item.type === 'header' || (item.children?.length ?? 0) > 0 ? (
      <MenuV2Header key={item.id} item={item} editMode={editMode} onEdit={onEdit} onDelete={onDelete} />
    ) : (
      <MenuV2Item key={item.id} item={item} editMode={editMode} onEdit={onEdit} onDelete={onDelete} />
    )

  if (missing) {
    return (
      <ul>
        <li className="menu nav-item text-sm text-warning">{message}</li>
      </ul>
    )
  }

  if (isLoading || !menu) {
    return null
  }

  return <ul>{menu.items.map(getItemComponent)}</ul>
}

export default MenuV2
