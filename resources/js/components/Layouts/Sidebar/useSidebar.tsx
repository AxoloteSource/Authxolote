import { IRootState } from '@/store'
import { toggleSidebar } from '@/store/themeConfigSlice'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const useSidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>('')
  const themeConfig = useSelector((state: IRootState) => state.themeConfig)
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark)
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value
    })
  }

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]')
    if (selector) {
      selector.classList.add('active')
      const ul = selector.closest('ul.sub-menu')
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || []
        if (ele.length) {
          ele = ele[0]
          setTimeout(() => {
            ele.click()
          })
        }
      }
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return {
    semidark,
    dispatch,
    t,
    currentMenu,
    toggleMenu
  }
}
