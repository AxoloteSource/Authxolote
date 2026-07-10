import { IAccuse } from '@/interfaces/models/Accuse/IAccuse'
import { IArea } from '@/interfaces/models/Area/IArea'
import { ICitizen } from '@/interfaces/models/Citizen/ICitizen'
import { ITurn } from '@/interfaces/models/Turn/ITurn'
import { IUser } from '@/interfaces/models/User/user.interface'

export interface IRequest {
  id: number
  citizen_id: number
  department_id: number
  request_status_id: number
  reception_location_id: number
  area_id: number
  user_receiver_id: number
  copy_to_users: IUser[]
  attention_to_users: IUser[]
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
  destination_user?: IUser | null
  documents?: Array<Record<string, unknown>>
  document_type_ids: number[] | null
  user_receiver?: IUser
  area?: IArea
  accuses?: IAccuse[]
  citizen?: ICitizen
  turns?: ITurn[]
}
