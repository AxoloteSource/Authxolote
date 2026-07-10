import { IRole } from '@/interfaces/models/Role/IRole'
import { IOrganization } from '../Organization/IOrganization'

export interface IUser {
  id: string
  name: string
  last_name_paternal: string
  last_name_maternal: string
  full_name: string
  email: string
  phone: string
  department_id: number
  organization_id: number
  organization?: IOrganization | null
  position: string
  courtesy_title_id: number
  area_id: number
  external_user_id: string
  role: IRole
  role_key?: string
}
