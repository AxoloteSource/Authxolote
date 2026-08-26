export interface IMenu {
  id: string
  application_id: string
  application?: string | null
  name: string
  slug: string | null
  icon: string | null
  sort_order: number
  active: boolean
  items_count: number
  created_at: string
}
