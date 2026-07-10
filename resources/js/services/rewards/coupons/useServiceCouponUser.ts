import { usePOST } from '@/hooks/useApi'

const url = (businessId: number) => `/api/v1/businesses/${businessId}/user/coupons`

export const useServiceStoreCouponUser = (businessId: number) => usePOST<{ user_ids: number[]; coupon_id: number }>({ url: url(businessId) })
