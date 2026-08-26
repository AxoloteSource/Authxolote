import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchMenu } from '../useMenusPage'

interface IFilterFormMenuProps {
  formik: FormikProps<IFilterSearchMenu>
}

export const FilterFormMenu = ({ formik }: IFilterFormMenuProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchMenu> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
    </>
  )
}
