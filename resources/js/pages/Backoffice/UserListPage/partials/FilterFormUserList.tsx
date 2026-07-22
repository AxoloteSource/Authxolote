import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchUserList } from '../useUserListPage'

interface IFilterFormUserListProps {
  formik: FormikProps<IFilterSearchUserList>
}

export const FilterFormUserList = ({ formik }: IFilterFormUserListProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchUserList> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
    </>
  )
}
