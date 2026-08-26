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
  onEdit?: (item: IMenuItem) => void
  onDelete?: (id: string) => void
  onToggleRole?: (item: IMenuItem) => void
}

export const MenuV2Header = ({ item, editMode = false, onEdit, onDelete, onToggleRole }: IMenuV2HeaderProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const icon = resolveIcon(item.icon, 'group-hover:!text-primary shrink-0 ltr:mr-2')
  const children = item.children ?? []
  const isMissing = editMode && item.has_role === false
  const isDisabled = item.active === false
  const isOpen = editMode ? true : open

  return (
    <li className="menu nav-item relative">
      <button
        type="button"
        onClick={() => {
          if (editMode) {
            onToggleRole?.(item)
          } else {
            setOpen((prev) => !prev)
          }
        }}
        className={`group relative w-full cursor-pointer${editMode ? ' ltr:pr-20 rtl:pl-20' : ''}${isMissing ? ' bg-gray-500!' : ''}`}
      >
        <span className="flex w-full items-center justify-between">
          <span className="flex items-center">
            {icon}
            <span className={isMissing ? 'text-white' : isDisabled ? 'text-gray-400' : ''}>{t(item.name)}</span>
          </span>
            <span className={isOpen ? '!rotate-90' : 'rtl:rotate-180'}>
              <ChevronRight />
            </span>
        </span>
        {editMode && (
          <span className="absolute top-1/2 ltr:right-2 rtl:left-2 -translate-y-1/2">
            <MenuV2Actions item={item} onEdit={onEdit} onDelete={onDelete} />
          </span>
        )}
      </button>

      <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
        <MenuV2SubMenu items={children} editMode={editMode} onEdit={onEdit} onDelete={onDelete} onToggleRole={onToggleRole} />
      </AnimateHeight>
    </li>
  )
}
