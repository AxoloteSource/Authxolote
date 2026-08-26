import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { useTranslation } from 'react-i18next'

interface IMenuItemsTreeProps {
  items: IMenuItem[]
}

export const MenuItemsTree = ({ items }: IMenuItemsTreeProps) => {
  const { t } = useTranslation()

  if (items.length === 0) {
    return <span className="text-gray-400">{t('no_sub_items')}</span>
  }

  return (
    <ul className="ml-4 space-y-1 border-l border-gray-200 pl-4">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span>{item.icon && <i>icon</i>}</span>
            <span className="font-semibold">{item.name}</span>
            <span className="text-xs text-gray-400">{item.type === 'header' ? t('header') : t('link')}</span>
            {item.path && <span className="text-xs text-gray-400">{item.path}</span>}
          </div>
          {item.children && item.children.length > 0 && <MenuItemsTree items={item.children} />}
        </li>
      ))}
    </ul>
  )
}
