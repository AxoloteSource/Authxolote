import { IUser } from '@/interfaces/models/User/user.interface'

export interface IRequestUserAssignments {
  id: number
  request_id: number
  request_assignment_type_id: number
  user_id: number
  created_at: string
  updated_at: string
  user: IUser
}
