import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchApplication } from '../useApplicationsPage'

interface IFilterFormApplicationProps {
  formik: FormikProps<IFilterSearchApplication>
}

export const FilterFormApplication = ({ formik }: IFilterFormApplicationProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchApplication> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
    </>
  )
}
