export type MenuItemType = 'header' | 'link'

export interface IMenuItem {
  id: string
  menu_id: string
  parent_id: string | null
  type: MenuItemType
  name: string
  slug: string
  route: string | null
  path: string | null
  icon: string | null
  sort_order: number
  active: boolean
  has_role?: boolean
  menu?: string | null
  children: IMenuItem[]
  created_at: string
}
