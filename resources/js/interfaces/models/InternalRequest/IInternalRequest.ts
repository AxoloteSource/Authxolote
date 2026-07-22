import { IAccuse } from '@/interfaces/models/Accuse/IAccuse'
import { IArea } from '@/interfaces/models/Area/IArea'
import { IDocument } from '@/interfaces/models/Document/IDocument'
import { IRequestUserAssignments } from '@/interfaces/models/RequestUserAssignments/IRequestUserAssignments'
import { ITurn } from '@/interfaces/models/Turn/ITurn'
import { IUser } from '@/interfaces/models/User/user.interface'

export interface IInternalRequest {
  id: number
  citizen_id: number
  department_id: number
  request_status_id: number
  reception_location_id: number
  area_id: number
  user_receiver_id: number
  copy_to_users: IRequestUserAssignments[]
  attention_to_users: IRequestUserAssignments[]
  reference_number: string
  urgency: boolean
  with_representation: boolean
  issue: string
  observations: string
  organization_id: number
  code: number
  created_at: string
  formatted_date: string
  updated_at: string
  documents?: IDocument[]
  user_receiver?: IUser
  destination_user?: IUser
  area?: IArea
  accuses?: IAccuse[]
  turns?: ITurn[]
}
