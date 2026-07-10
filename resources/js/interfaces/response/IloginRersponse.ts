import { IUser } from '@/interfaces/models/User/user.interface'

export interface ILoginResponse {
  user: IUser
  access_token: string
}
