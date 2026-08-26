import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimateHeight from 'react-animate-height'
import { MenuV2SubMenu } from './MenuV2SubMenu'
import { resolveIcon } from './resolveIcon'

interface IMenuV2HeaderProps {
  item: IMenuItem
}

export const MenuV2Header = ({ item }: IMenuV2HeaderProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const icon = resolveIcon(item.icon, 'group-hover:!text-primary shrink-0 ltr:mr-2')
  const children = item.children ?? []

  return (
    <li className="menu nav-item">
      <button type="button" onClick={() => setOpen((prev) => !prev)} className="group w-full cursor-pointer">
        <span className="flex w-full items-center justify-between">
          <span className="flex items-center">
            {icon}
            <span>{t(item.name)}</span>
          </span>
          <span className={open ? '!rotate-90' : 'rtl:rotate-180'}>
            <ChevronRight />
          </span>
        </span>
      </button>
      <AnimateHeight duration={300} height={open ? 'auto' : 0}>
        <MenuV2SubMenu items={children} />
      </AnimateHeight>
    </li>
  )
}
