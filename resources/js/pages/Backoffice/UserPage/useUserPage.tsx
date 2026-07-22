import { IFilters } from '@/components/Filters/ModalFilter/types'
import { IUser } from '@/interfaces/models/User/user.interface'
import { useTranslation } from 'react-i18next'

export interface IFilterSearchUser {
  name: string
  email: string
}

export const useUserPage = () => {
  const { t } = useTranslation()
  const filters: IFilters<IFilterSearchUser>[] = [
    {
      property: 'name',
      initialValue: ''
    },
    {
      property: 'email',
      initialValue: ''
    }
  ]

  return {
    filters
  }
}
