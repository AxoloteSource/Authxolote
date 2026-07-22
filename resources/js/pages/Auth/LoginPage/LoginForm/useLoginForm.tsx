import { useAxios } from '@/hooks/useAxios'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IFormsMutator } from '@/interfaces/IFormsMutator'
import { IFormikProps } from '@/interfaces/formikProps.interface'
import { ILoginResponse } from '@/interfaces/response/IloginRersponse'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { ObjectSchema } from 'yup'
import { IInitialValuesLogin } from '../Interfaces/IInitialValuesLogin.interface'

export const useLoginForm = ({ mutateAsync }: IFormsMutator): IFormikProps<IInitialValuesLogin> => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { saveAuth } = useAxios()
  const { onSubmit } = useOnSubmit<IInitialValuesLogin, ILoginResponse>({
    mutateAsync,
    onSuccess: (data) => {
      saveAuth(data.access_token, data.user)
      navigate(RoutesBackoffice.Home)
    }
  })

  const initialValues: IInitialValuesLogin = {
    email: '',
    password: ''
  }

  const validationSchema: ObjectSchema<Record<string, unknown>> = Yup.object().shape({
    email: Yup.string().email(t('invalid_email_format')).required(t('the_email_field_is_required')),
    password: Yup.string().required(t('password_is_required'))
  })

  return {
    initialValues,
    validationSchema,
    onSubmit
  }
}
