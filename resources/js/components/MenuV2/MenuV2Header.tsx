import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimateHeight from 'react-animate-height'
import { MenuV2Actions } from './MenuV2Actions'
import { MenuV2SubMenu } from './MenuV2SubMenu'
import { resolveIcon } from './resolveIcon'

interface IMenuV2HeaderProps {
  item: IMenuItem
  editMode?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const MenuV2Header = ({ item, editMode = false, onEdit, onDelete }: IMenuV2HeaderProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const icon = resolveIcon(item.icon, 'group-hover:!text-primary shrink-0 ltr:mr-2')
  const children = item.children ?? []

  return (
    <li className="menu nav-item relative">
      <button type="button" onClick={() => setOpen((prev) => !prev)} className={`group w-full cursor-pointer${editMode ? ' ltr:pr-20 rtl:pl-20' : ''}`}>
        <span className="flex w-full items-center justify-between">
          <span className="flex items-center">
            {icon}
            <span>{t(item.name)}</span>
          </span>
          {!editMode && (
            <span className={open ? '!rotate-90' : 'rtl:rotate-180'}>
              <ChevronRight />
            </span>
          )}
        </span>
      </button>
      {editMode && (
        <span className="absolute top-1/2 ltr:right-2 rtl:left-2 -translate-y-1/2">
          <MenuV2Actions item={item} onEdit={onEdit} onDelete={onDelete} />
        </span>
      )}
      <AnimateHeight duration={300} height={open ? 'auto' : 0}>
        <MenuV2SubMenu items={children} editMode={editMode} onEdit={onEdit} onDelete={onDelete} />
      </AnimateHeight>
    </li>
  )
}
