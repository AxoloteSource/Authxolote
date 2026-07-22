import { ApisEnum } from '@/configs/apisEnum'
import { useGET, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IAction } from '@/interfaces/models/Actions/IAction'

const url = '/api/v1/roles'
const urlLogin = ApisEnum.BaseLogin

export const useServiceIndexRoleActions = (params: { roleId: string } & IPaginateServiceProps) => {
  const { roleId, filters = [], search = null, page = 1, limit = 10 } = params
  return useGET<IPaginate<IAction>>({
    url: `${url}/${roleId}/actions`,
    customHost: urlLogin,
    enabled: !!roleId,
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}

export const useServiceUpdateRoleAction = (roleId: string, actionId: string) =>
  usePUT<IAction>({ url: `${url}/${roleId}/actions/${actionId}`, customHost: urlLogin })
