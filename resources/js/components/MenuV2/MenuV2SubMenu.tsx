import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { MenuV2Header } from './MenuV2Header'
import { MenuV2Item } from './MenuV2Item'

interface IMenuV2SubMenuProps {
  items: IMenuItem[]
}

export const MenuV2SubMenu = ({ items }: IMenuV2SubMenuProps) => {
  if (items.length === 0) {
    return null
  }

  return (
    <ul className="sub-menu text-gray-500">
      {items.map((item) =>
        item.type === 'header' || (item.children?.length ?? 0) > 0 ? (
          <MenuV2Header key={item.id} item={item} />
        ) : (
          <MenuV2Item key={item.id} item={item} />
        ),
      )}
    </ul>
  )
}
