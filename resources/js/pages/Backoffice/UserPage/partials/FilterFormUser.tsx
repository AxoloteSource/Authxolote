import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchUser } from '../useUserPage'

interface IFilterFormUserProps {
  formik: FormikProps<IFilterSearchUser>
}

export const FilterFormUser = ({ formik }: IFilterFormUserProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchUser> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
      <Input<IFilterSearchUser> className="col-span-12" name="email" label={`${t('email')}`} formik={formik} />
    </>
  )
}
