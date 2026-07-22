import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchItem } from '../useItemPage'

interface IFilterFormItemProps {
  formik: FormikProps<IFilterSearchItem>
}

export const FilterFormItem = ({ formik }: IFilterFormItemProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchItem> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
    </>
  )
}
