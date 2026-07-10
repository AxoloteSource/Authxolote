import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IRole } from '@/interfaces/models/Role/IRole'
import { useServiceStoreRole, useServiceUpdateRole } from '@/services/authxolote/roles/useServiceRoles'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { es } from 'yup-locales'
Yup.setLocale(es)

export interface IInitialValuesNewRole {
  name: string
  key: string
  description: string
}
const initialValues: IInitialValuesNewRole = {
  name: '',
  key: '',
  description: ''
}

interface IUseRoleFormProps {
  selectedRole?: IRole | null
  onSuccess?: () => void
}

export const useRoleForm = ({ selectedRole, onSuccess }: IUseRoleFormProps) => {
  const { t } = useTranslation()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required')),
    key: Yup.string().required(t('key_required')),
    description: Yup.string().required(t('role_required'))
  })

  const mutator = useServiceStoreRole()
  const mutatorUpdate = useServiceUpdateRole(selectedRole?.id ?? 0)
  const { onSubmit } = useOnSubmit<IInitialValuesNewRole>({
    mutateAsync: selectedRole?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => {
      if (onSuccess) {
        onSuccess()
      }
    }
  })
  const filledValues = {
    ...initialValues,
    name: selectedRole?.name ?? '',
    key: selectedRole?.key ?? '',
    description: selectedRole?.description ?? ''
  }
  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }
  return { formikProps, t }
}
