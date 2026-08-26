import { ApisEnum } from '@/configs/apisEnum'
import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IApplication } from '@/interfaces/models/Application/IApplication'

const url = '/api/v1/applications'
const urlLogin = ApisEnum.BaseLogin

export const useServiceIndexApplications = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IApplication>>({
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

export const useServiceStoreApplication = () => usePOST<IApplication>({ url, customHost: urlLogin })
export const useServiceUpdateApplication = (id: string) => usePUT<IApplication>({ url: `${url}/${id}`, customHost: urlLogin })
export const useServiceDeleteApplication = (id: string) => useDELETE({ url: `${url}/${id}` })
