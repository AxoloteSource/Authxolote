import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchImage } from '../useImagesPage'

interface IFilterFormImageProps {
  formik: FormikProps<IFilterSearchImage>
}

export const FilterFormImage = ({ formik }: IFilterFormImageProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchImage> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
    </>
  )
}
