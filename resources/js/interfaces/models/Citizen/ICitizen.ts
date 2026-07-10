export interface ICitizen {
  id: number
  name: string
  institution: string
  position: string
  curp?: string
  rfc?: string
  gender_id: number
  organization_id: number
  municipality_id: number
  postal_code: string
  locality: string
  address: string
  email: string
  telephone: string
  gender: {
    id: number
    name: string
    active: boolean
  }
  municipality: {
    id: number
    state_id: number
    name: string
    key: number
    active: boolean
    state: {
      id: number
      name: string
    }
  }
  organization: {
    id: number
    name: string
    organization_type_id: number
    organization_type: string
  }
}
