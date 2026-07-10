import { useGET, usePOST, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IItem } from '@/interfaces/models/Item/IItem'

const url = (businessId: number) => `/api/v1/businesses/${businessId}/items`

export const useServiceIndexItems = ({ filters = [], search = null, page = 1, limit = 10, id = 1 }: IPaginateServiceProps & { id?: number }) => {
  return useGET<IPaginate<IItem>>({
    url: url(id),
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}

export const useServiceStoreItem = (businessId: number) => usePOST<IItem>({ url: url(businessId), isFile: true })
export const useServiceUpdateItem = (businessId: number, id: number) => usePUT<IItem>({ url: `${url(businessId)}/${id}` })
