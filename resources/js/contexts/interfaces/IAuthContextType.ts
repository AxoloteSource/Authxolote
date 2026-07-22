import { IUser } from '@/interfaces/models/User/user.interface'
import { AxiosInstance } from 'axios'

export interface IAuthContextType {
  authToken: string | null
  user: IUser | null
  isAuth: boolean
  saveAuth: (accessToken: string, user: Record<string, unknown>) => void
  logout: () => void
  axiosApi: AxiosInstance
  updateUser: (user: IUser) => void
}
