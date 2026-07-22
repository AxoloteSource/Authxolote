import { IImage } from '../Image/IImage'
import { ICouponStatus } from './ICouponStatus'
import { ICouponType } from './ICouponType'

export interface ICoupon {
  id: number
  title: string
  description: string
  amount: number
  expiration_date: string | null
  coupon_type_id: number
  coupon_status_id: number
  redeemed_at: string | null
  business_id: number
  config: Record<string, unknown> | null
  created_at: string
  updated_at: string
  type?: ICouponType
  status?: ICouponStatus
  image?: IImage
}
