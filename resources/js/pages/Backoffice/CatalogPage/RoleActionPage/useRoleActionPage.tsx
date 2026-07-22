import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IAction } from '@/interfaces/models/Actions/IAction'
import { useServiceIndexRoleActions } from '@/services/authxolote/roleActions/useServiceRoleActions'
import { useSearchParams } from 'react-router-dom'
import { ActionSwitch } from './ActionSwitch'

export interface IFilterSearchRoleAction {
  name: string
  description: string
  active: boolean
}
export const useRoleActionPage = () => {
  const [searchParams] = useSearchParams()
  const roleId = searchParams.get('roleId')
  const { open, close } = useModal(false)
  const { refreshKey } = useRefreshKey({
    module: 'role_actions',
    service: useServiceIndexRoleActions,
    close,
    payload: { roleId: roleId! }
  })

  const filters: IFilters<IFilterSearchRoleAction>[] = [
    {
      property: 'name',
      initialValue: ''
    },
    {
      property: 'active',
      initialValue: false
    }
  ]

  const renderersMap = {
    actions: (data: IAction) => <ActionSwitch data={data} />
  }

  return {
    open,
    close,
    filters,
    renderersMap,
    refreshKey,
    roleId
  }
}
