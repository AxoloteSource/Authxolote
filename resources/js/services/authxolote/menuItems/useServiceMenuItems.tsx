import { ApisEnum } from '@/configs/apisEnum'
import { axiosDELETE, axiosPUT, useGET, usePOST, usePUT } from '@/hooks/useApi'
import { useAxios } from '@/hooks/useAxios'
import { IPaginate } from '@/interfaces/IPaginate'
import { IFilterProps, IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { useMutation } from '@tanstack/react-query'

const url = '/api/v1/menu-items'
const urlLogin = ApisEnum.BaseLogin

interface IIndexMenuItemsProps extends IPaginateServiceProps {
  menu_id?: string
}

export const useServiceIndexMenuItems = ({ filters = [], search = null, page = 1, limit = 10, menu_id }: IIndexMenuItemsProps) => {
  const appliedFilters: IFilterProps[] = menu_id ? [...filters, { property: 'menu_id', value: menu_id }] : filters

  return useGET<IPaginate<IMenuItem>>({
    url,
    customHost: urlLogin,
    filters: {
      filters: appliedFilters,
      search,
      page,
      limit
    }
  })
}

export const useServiceStoreMenuItem = () => usePOST<IMenuItem>({ url, customHost: urlLogin })
export const useServiceUpdateMenuItem = (id: string) => usePUT<IMenuItem>({ url: `${url}/${id}`, customHost: urlLogin })

export const useServiceDeleteMenuItem = () => {
  const { axiosApi } = useAxios()

  return useMutation({
    mutationFn: (id: string) => axiosDELETE(axiosApi, { url: `${url}/${id}` })
  })
}

export const useServiceToggleMenuItemRole = () => {
  const { axiosApi } = useAxios()

  return useMutation({
    mutationFn: ({ id, roleId, active }: { id: string; roleId: string; active: boolean }) =>
      axiosPUT(axiosApi, { url: `${url}/${id}/roles/${roleId}`, data: { active }, customHost: urlLogin })
  })
}

const flattenItems = (items: IMenuItem[], depth = 0, prefix = ''): IOptions[] => {
  return items.flatMap((item) => {
    const label = `${prefix}${item.name}`

    return [{ value: item.id, label }, ...flattenItems(item.children ?? [], depth + 1, `${prefix}— `)]
  })
}

export const useMenuItemsTree = (params: IPaginateServiceProps & { menu_id?: string }) => {
  const { data, isLoading } = useServiceIndexMenuItems({ page: 1, limit: 100, ...params })

  return {
    isLoading,
    options: (data?.data ?? []).flatMap((item) => flattenItems([item]))
  }
}
