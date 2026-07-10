import { usePOST } from '@/hooks/useApi'

export const useServiceCouponSend = (businessId: number, couponId: number) =>
  usePOST({
    url: `/api/v1/businesses/${businessId}/coupons/${couponId}/send`
  })
