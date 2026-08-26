import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MenuV2Actions } from './MenuV2Actions'
import { resolveIcon } from './resolveIcon'

interface IMenuV2ItemProps {
  item: IMenuItem
  editMode?: boolean
  onEdit?: (item: IMenuItem) => void
  onDelete?: (id: string) => void
  onToggleRole?: (item: IMenuItem) => void
}

export const MenuV2Item = ({ item, editMode = false, onEdit, onDelete, onToggleRole }: IMenuV2ItemProps) => {
  const { t } = useTranslation()
  const icon = resolveIcon(item.icon, 'group-hover:!text-primary shrink-0 ltr:mr-2')
  const isMissing = editMode && item.has_role === false
  const isDisabled = item.active === false

  return (
    <li className="menu nav-item relative">
      <NavLink
        to={item.path || item.route || '#'}
        onClick={(e) => {
          if (editMode) {
            e.preventDefault()
            onToggleRole?.(item)
          }
        }}
        className={`group${editMode ? ' ltr:pr-20 rtl:pl-20' : ''}${isMissing ? ' bg-gray-500!' : ''}`}
      >
        <div className="flex items-center">
          {icon}
          <span className={isMissing ? 'text-white' : isDisabled ? 'text-gray-400' : ''}>{t(item.name)}</span>
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
