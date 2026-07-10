import { useDELETE, useGET, usePOST, usePUT } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { ICoupon } from '@/interfaces/models/Coupon/ICoupon'

const url = (businessId: number) => `/api/v1/businesses/${businessId}/coupons`

export const useServiceIndexCoupons = ({ filters = [], search = null, page = 1, limit = 10, id = 1, ...rest }: IPaginateServiceProps & { id?: number } & Record<string, unknown>) => {
  return useGET<IPaginate<ICoupon>>({
    url: url(id),
    filters: {
      filters,
      search,
      page,
      limit,
      ...rest
    }
  })
}

export const useServiceStoreCoupon = (businessId: number) => usePOST<ICoupon>({ url: url(businessId) })
export const useServiceUpdateCoupon = (businessId: number, id: number) => usePUT<ICoupon>({ url: `${url(businessId)}/${id}` })

export const useServiceDestroyCoupon = (businessId: number, id: number) => useDELETE({ url: `${url(businessId)}/${id}` })
