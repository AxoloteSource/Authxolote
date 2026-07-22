import { IFormat } from '@/interfaces/models/Format/IFormat'
import { IUser } from '@/interfaces/models/User/user.interface'
import { IOrganization } from '../Organization/IOrganization'
import { IPriority } from '../Priority/IPriority'
import { IRequest } from '../Request/IRequest'
import { ITurnStatus } from './ITurnStatus'

export interface ITurn {
  id: number
  created_at: string
  updated_at: string
  turn_status: ITurnStatus
  organization: IOrganization
  priority: IPriority
  user_created: IUser
  attention_to_users?: IUser[]
  copy_to_users?: IUser[]
  request: IRequest
  request_id: number
  organization_id: number
  turn_status_id: number
  priority_id: number
  format_id: number
  description?: string | null
  file_url?: string | null
  format: IFormat
}
