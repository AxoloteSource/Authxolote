import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IImage } from '@/interfaces/models/Image/IImage'
import { useServiceStoreImage } from '@/services/rewards/images/useServiceImages'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { es } from 'yup-locales'
Yup.setLocale(es)

export interface IInitialValuesImage {
  image: File | null
}

const initialValues: IInitialValuesImage = {
  image: null
}

interface IUseImageFormProps {
  onSuccess?: (data: IImage) => void
}

export const useImageForm = ({ onSuccess }: IUseImageFormProps) => {
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().required(t('file_required'))
  })

  const mutator = useServiceStoreImage()

  const { onSubmit } = useOnSubmit<IInitialValuesImage>({
    mutateAsync: mutator.mutateAsync,
    onSuccess: async (data) => {
      if (onSuccess) {
        onSuccess(data as IImage)
      }
    }
  })

  const formikProps = {
    validationSchema,
    initialValues,
    onSubmit
  }

  return { formikProps, t }
}
