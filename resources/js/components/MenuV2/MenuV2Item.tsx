import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { resolveIcon } from './resolveIcon'

interface IMenuV2ItemProps {
  item: IMenuItem
}

export const MenuV2Item = ({ item }: IMenuV2ItemProps) => {
  const { t } = useTranslation()
  const icon = resolveIcon(item.icon, 'group-hover:!text-primary shrink-0 ltr:mr-2')

  return (
    <li className="menu nav-item">
      <NavLink to={item.path || item.route || '#'} className="group">
        <div className="flex items-center">
          {icon}
          <span>{t(item.name)}</span>
        </div>
      </NavLink>
    </li>
  )
}
