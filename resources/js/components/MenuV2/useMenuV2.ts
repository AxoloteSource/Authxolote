import { useServiceShowMenu } from '@/services/authxolote/menus/useServiceMenus'
import { useTranslation } from 'react-i18next'

export const useMenuV2 = () => {
  const { t } = useTranslation()
  const menuSlug = import.meta.env.VITE_MENU_SLUG
  const enabled = Boolean(menuSlug)

  const { data, isLoading } = useServiceShowMenu(menuSlug ?? 'auth', enabled)

  if (!enabled) {
    return { menu: undefined, isLoading: false, missing: true, message: t('menu_slug_missing') }
  }

  return { menu: data, isLoading, missing: false }
}
