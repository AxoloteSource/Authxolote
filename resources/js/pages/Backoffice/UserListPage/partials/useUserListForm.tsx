import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IUserList } from '@/interfaces/models/UserList/IUserList'
import { useServiceStoreUserList, useServiceUpdateUserList } from '@/services/authxolote/userLists/useServiceUserLists'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { es } from 'yup-locales'
Yup.setLocale(es)

export interface IInitialValuesNewUserList {
  name: string
  slug: string
  description: string
}
const initialValues: IInitialValuesNewUserList = {
  name: '',
  slug: '',
  description: ''
}

interface IUseUserListFormProps {
  selectedUserList?: IUserList | null
  onSuccess?: () => void
}

export const useUserListForm = ({ selectedUserList, onSuccess }: IUseUserListFormProps) => {
  const { t } = useTranslation()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required'))
  })

  const mutator = useServiceStoreUserList()
  const mutatorUpdate = useServiceUpdateUserList(selectedUserList?.id ?? '')

  const { onSubmit } = useOnSubmit<IInitialValuesNewUserList>({
    mutateAsync: selectedUserList?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => {
      if (onSuccess) {
        onSuccess()
      }
    }
  })
  const filledValues = {
    ...initialValues,
    name: selectedUserList?.name ?? '',
    slug: selectedUserList?.slug ?? '',
    description: selectedUserList?.description ?? ''
  }
  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }
  return { formikProps, t }
}
