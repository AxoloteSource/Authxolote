import { useGET } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { ICouponType } from '@/interfaces/models/Coupon/ICouponType'

export const useServiceIndexCouponTypes = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<ICouponType>>({
    url: '/api/v1/coupon-types',
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}
