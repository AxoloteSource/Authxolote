import { useServiceShowAllMenu } from '@/services/authxolote/menus/useServiceMenus'
import { useSearchParams } from 'react-router-dom'

export const useMenuShowPage = () => {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug')
  const enabled = Boolean(slug)

  const { data: menu, isLoading } = useServiceShowAllMenu(slug ?? '', enabled)

  return { menu, isLoading, slug }
}
