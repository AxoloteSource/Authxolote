import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { useServiceShowAllMenu } from '@/services/authxolote/menus/useServiceMenus'
import { useServiceIndexRoles } from '@/services/authxolote/roles/useServiceRoles'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useMenuShowPage = () => {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug')
  const enabled = Boolean(slug)
  const [roleId, setRoleId] = useState<string | null>(null)

  const { data: menu, isLoading, refetch: refetchMenu } = useServiceShowAllMenu(slug ?? '', enabled, roleId)
  const { data: rolesData, isLoading: rolesLoading } = useServiceIndexRoles({ page: 1, limit: 100 })

  const roleOptions = useMemo<IOptions[]>(
    () => (rolesData?.data ?? []).map((role) => ({ value: role.id, label: role.name })),
    [rolesData]
  )

  return { menu, isLoading, slug, roleOptions, rolesLoading, roleId, setRoleId, refetchMenu }
}
