import { IOrganizationOwners } from './IOrganizationOwners'
import { IOrganizationTypes } from './IOrganizationTypes'

export interface IOrganization {
  id: number
  name: string
  organization_type_id: number
  address: string
  phone: string
  organization_type?: IOrganizationTypes
  owner?: IOrganizationOwners & { id?: number }
}
