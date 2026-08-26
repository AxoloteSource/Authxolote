import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { Input } from '@/components/Form/Input'
import InputSelect from '@/components/Form/Select/Select'
import { useServiceIndexMenus } from '@/services/authxolote/menus/useServiceMenus'
import { FormikProps } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IFilterSearchMenuItem } from '../useMenuItemsPage'

interface IFilterFormMenuItemProps {
  formik: FormikProps<IFilterSearchMenuItem>
}

export const FilterFormMenuItem = ({ formik }: IFilterFormMenuItemProps) => {
  const { t } = useTranslation()
  const { data: menusData, isLoading } = useServiceIndexMenus({ page: 1, limit: 100 })

  const menuOptions = useMemo<IOptions[]>(
    () => (menusData?.data ?? []).map((menu) => ({ value: menu.id, label: menu.name })),
    [menusData]
  )

  return (
    <>
      <Input<IFilterSearchMenuItem> className="col-span-12" name="name" label={`${t('name')}`} formik={formik} />
      <InputSelect<IFilterSearchMenuItem> className="col-span-12" name="menu_id" label={`${t('menu')}`} formik={formik} options={menuOptions} isLoading={isLoading} />
    </>
  )
}
