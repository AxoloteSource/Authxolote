import { IUser } from './user.interface'

export interface IUserChat extends IUser {
  id: string
  name: string
  external_user_id: string
}
