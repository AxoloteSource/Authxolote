import { useGET } from '@/hooks/useApi'
import { IPaginate } from '@/interfaces/IPaginate'
import { IPaginateServiceProps } from '@/interfaces/IPaginateServiceProps'
import { IUser } from '@/interfaces/models/User/user.interface'

const url = '/api/v1/users'

export const useServiceIndexUsers = ({ filters = [], search = null, page = 1, limit = 10 }: IPaginateServiceProps) => {
  return useGET<IPaginate<IUser>>({
    url,
    filters: {
      filters,
      search,
      page,
      limit
    }
  })
}
