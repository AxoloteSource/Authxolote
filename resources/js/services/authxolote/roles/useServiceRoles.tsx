import { ApisEnum } from '@/configs/apisEnum'
import { useGET, usePOST, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IRole } from '@/interfaces/models/Role/IRole'

const url = '/api/v1/roles'
const urlLogin = ApisEnum.BaseLogin

export const useServiceIndexRoles = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IRole>>({
    url,
    customHost: urlLogin,
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}

export const useServiceStoreRole = () => usePOST<IRole>({ url, customHost: urlLogin })
export const useServiceUpdateRole = (id: number) => usePUT<IRole>({ url: `${url}/${id}`, customHost: urlLogin })
