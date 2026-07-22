export interface IItem {
  id: number
  business_id: number
  external_item_id?: string
  name: string
  points_price?: number
  rewardable: boolean
  reward_points?: number
  created_at: string
  updated_at: string
  files?: Record<string, unknown>[]
}
