import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchRole } from '../useRolePage'

interface IFilterFormRoleProps {
  formik: FormikProps<IFilterSearchRole>
}

export const FilterFormRole = ({ formik }: IFilterFormRoleProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchRole> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
      <Input<IFilterSearchRole> className="col-span-12" name="description" label={`${t('description')}`} formik={formik} />
    </>
  )
}
