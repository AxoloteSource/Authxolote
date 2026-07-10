import { DataTableColumn } from 'mantine-datatable'

interface Link {
  url: string | null
  label: string
  active: boolean
}

export interface IPaginate<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
  columns: DataTableColumn<T>[]
}

export interface IPaginateInfinite<T> {
  pages: IPaginate<T>[]
  pageParam: number
}
