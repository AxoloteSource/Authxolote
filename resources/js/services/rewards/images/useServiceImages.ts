import { useGET, usePOST } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IImage } from '@/interfaces/models/Image/IImage'

const url = '/api/v1/images'

export const useServiceIndexImages = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IImage>>({
    url,
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}

export const useServiceStoreImage = () => usePOST<IImage>({ url, isFile: true })
