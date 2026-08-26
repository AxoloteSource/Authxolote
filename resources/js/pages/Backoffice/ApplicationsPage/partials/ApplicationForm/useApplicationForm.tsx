import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IApplication } from '@/interfaces/models/Application/IApplication'
import { useServiceStoreApplication, useServiceUpdateApplication } from '@/services/authxolote/applications/useServiceApplications'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { es } from 'yup-locales'
Yup.setLocale(es)

export interface IInitialValuesApplication {
  name: string
  slug: string
  description: string
  active: boolean
}
const initialValues: IInitialValuesApplication = {
  name: '',
  slug: '',
  description: '',
  active: true
}

interface IUseApplicationFormProps {
  selectedApplication?: IApplication | null
  onSuccess?: () => void
}

export const useApplicationForm = ({ selectedApplication, onSuccess }: IUseApplicationFormProps) => {
  const { t } = useTranslation()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required')),
    slug: Yup.string().required(t('slug_required'))
  })

  const mutator = useServiceStoreApplication()
  const mutatorUpdate = useServiceUpdateApplication(selectedApplication?.id ?? '')

  const { onSubmit } = useOnSubmit<IInitialValuesApplication>({
    mutateAsync: selectedApplication?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => {
      if (onSuccess) {
        onSuccess()
      }
    }
  })
  const filledValues = {
    ...initialValues,
    name: selectedApplication?.name ?? '',
    slug: selectedApplication?.slug ?? '',
    description: selectedApplication?.description ?? '',
    active: selectedApplication?.active ?? true
  }
  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }
  return { formikProps, t }
}
