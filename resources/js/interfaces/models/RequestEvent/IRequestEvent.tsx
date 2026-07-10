import { RequestEventTypeEnum } from '@/enums/types/RequestEventTypeEnum'
import { IRequestEventType } from '@/interfaces/models/RequestEventType/IRequestEventType'
import { ITurn } from '@/interfaces/models/Turn/ITurn'

export interface IRequestEventFile {
  id: number
  name: string
  path: string
  mime_type: string
  download_url: string
  extension: string
}

export interface IRequestEvent {
  id: number
  user_id: number
  request_id: number
  request_status_id?: number
  request_event_type_id: RequestEventTypeEnum
  eventable_type?: string
  eventable_id?: number
  eventable?: {
    id: number
    name: string
    description: string
  } | null
  user: {
    id: string
    full_name: string
  } | null
  files: IRequestEventFile[]
  event_type: IRequestEventType
  turns: ITurn[] | null
  created_at: string
}
