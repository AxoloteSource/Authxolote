import { ApisEnum } from '@/configs/apisEnum'
import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IUserList } from '@/interfaces/models/UserList/IUserList'

const url = '/api/v1/user-lists'
const urlLogin = ApisEnum.BaseLogin

export const useServiceIndexUserLists = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IUserList>>({
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

export const useServiceStoreUserList = () => usePOST<IUserList>({ url, customHost: urlLogin })
export const useServiceUpdateUserList = (id: string) => usePUT<IUserList>({ url: `${url}/${id}`, customHost: urlLogin })
export const useServiceDeleteUserList = (id: string) => useDELETE({ url: `${url}/${id}` })
