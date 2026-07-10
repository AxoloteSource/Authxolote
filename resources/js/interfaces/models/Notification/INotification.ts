export interface INotification {
  id: number
  notification_type_id: string
  user_id: string
  title: string
  message: string
  read_at: string | null
  send_at: string | null
  priority: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}
