import { useAxios } from '@/hooks/useAxios'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { NavLink, useLocation } from 'react-router-dom'
import ISidebarLink from './sidebarLink.interface'

export const SidebarLink = ({ name, to, icon, subItems = [], roles }: ISidebarLink) => {
  const { pathname } = useLocation()
  const { user } = useAxios()
  const hasSubItems = subItems.length > 0
  const [currentMenu, setCurrentMenu] = useState<string>('')
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value
    })
  }

  const userRoleKey = user?.role?.key ?? null
  const isRoot = userRoleKey === 'root'

  if (!isRoot && roles && roles.length > 0 && userRoleKey) {
    if (!roles.includes(userRoleKey)) {
      return null
    }
  }

  return (
    <li className="menu nav-item">
      <NavLink
        onClick={(e) => {
          if (hasSubItems) {
            e.preventDefault()
          }
          toggleMenu(name)
        }}
        to={to}
        className="group"
      >
        <div className="flex items-center">
          {icon}
          <span>{name}</span>
        </div>
        {hasSubItems && (
          <div className={currentMenu == name ? '!rotate-90' : 'rtl:rotate-180'}>
            <ChevronRight />
          </div>
        )}
      </NavLink>
      {hasSubItems && (
        <AnimateHeight duration={300} height={currentMenu == name ? 'auto' : 0}>
          <ul className="sub-menu text-gray-500">
            {subItems.map(({ path, name }, key) => (
              <li key={key}>
                <NavLink className={`${path == pathname ? 'active' : ''}`} to={path}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </AnimateHeight>
      )}
    </li>
  )
}
