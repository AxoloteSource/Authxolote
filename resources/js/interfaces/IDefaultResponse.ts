export interface IDefaultResponse<T> {
  status: string
  message: string | null
  data: T[]
}
