import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { MenuV2Header } from './MenuV2Header'
import { MenuV2Item } from './MenuV2Item'
import { useMenuV2 } from './useMenuV2'

const getItemComponent = (item: IMenuItem) =>
  item.type === 'header' || (item.children?.length ?? 0) > 0 ? (
    <MenuV2Header key={item.id} item={item} />
  ) : (
    <MenuV2Item key={item.id} item={item} />
  )

export const MenuV2 = () => {
  const { menu, isLoading, missing, message } = useMenuV2()

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
