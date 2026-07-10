import { ApisEnum } from '@/configs/apisEnum'
import { useGET } from '@/hooks/useApi'

interface IUserList {
  name: string
  description: string
}

export const useServiceUserLists = () => {
  return useGET<IUserList[]>({
    url: '/api/v1/user-lists',
    customHost: ApisEnum.BaseLogin
  })
}
