import { IOrganization } from '@/interfaces/models/Organization/IOrganization'
import { ITurnStatus } from '@/interfaces/models/Turn/ITurnStatus'
import { IUser } from '@/interfaces/models/User/user.interface'

export interface ITurn {
  id: number
  request_id: number
  organization_id: number
  turn_status_id: number
  response: string
  priority_id: number
  format_id: number
  user_created_id: string
  file_id: number
  description: string
  created_at: string
  updated_at: string
  status: ITurnStatus | null
  user: IUser | null
  organization: IOrganization | null
}
