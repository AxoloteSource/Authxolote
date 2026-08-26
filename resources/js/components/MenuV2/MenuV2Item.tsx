import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MenuV2Actions } from './MenuV2Actions'
import { resolveIcon } from './resolveIcon'

interface IMenuV2ItemProps {
  item: IMenuItem
  editMode?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const MenuV2Item = ({ item, editMode = false, onEdit, onDelete }: IMenuV2ItemProps) => {
  const { t } = useTranslation()
  const icon = resolveIcon(item.icon, 'group-hover:!text-primary shrink-0 ltr:mr-2')

  return (
    <li className="menu nav-item relative">
      <NavLink to={item.path || item.route || '#'} className={`group${editMode ? ' ltr:pr-20 rtl:pl-20' : ''}`}>
        <div className="flex items-center">
          {icon}
          <span>{t(item.name)}</span>
        </div>
      </NavLink>
      {editMode && (
        <span className="absolute top-1/2 ltr:right-2 rtl:left-2 -translate-y-1/2">
          <MenuV2Actions item={item} onEdit={onEdit} onDelete={onDelete} />
        </span>
      )}
    </li>
  )
}
