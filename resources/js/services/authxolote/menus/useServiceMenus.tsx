import { ApisEnum } from '@/configs/apisEnum'
import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IMenu } from '@/interfaces/models/Menu/IMenu'
import { IMenuShow } from '@/interfaces/models/Menu/IMenuShow'

const url = '/api/v1/menus'
const urlLogin = ApisEnum.BaseLogin

export const useServiceIndexMenus = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IMenu>>({
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

export const useServiceShowMenu = (slug: string, enabled = true) => useGET<IMenuShow>({ url: `${url}/${slug}`, customHost: urlLogin, enabled })

export const useServiceShowAllMenu = (slug: string, enabled = true) => useGET<IMenuShow>({ url: `${url}/${slug}/all-items`, customHost: urlLogin, enabled })

export const useServiceStoreMenu = () => usePOST<IMenu>({ url, customHost: urlLogin })
export const useServiceUpdateMenu = (id: string) => usePUT<IMenu>({ url: `${url}/${id}`, customHost: urlLogin })
export const useServiceDeleteMenu = (id: string) => useDELETE({ url: `${url}/${id}` })
