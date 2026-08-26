export interface IApplication {
  id: string
  name: string
  slug: string
  description: string | null
  menus_count: number
  active: boolean
  created_at: string
}
