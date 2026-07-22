import { Input } from '@/components/Form/Input'
import Switch from '@/components/Form/Switch'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchRoleAction } from '../useRoleActionPage'

interface IFilterFormRoleActionProps {
  formik: FormikProps<IFilterSearchRoleAction>
}
export const FilterFormRoleAction = ({ formik }: IFilterFormRoleActionProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchRoleAction> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
      <Switch<IFilterSearchRoleAction>
        className="col-span-12"
        name="active"
        label={`${formik.values?.active ? t('active') : t('inactive')}`}
        formik={formik}
      />
    </>
  )
}
