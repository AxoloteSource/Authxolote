import { Input } from '@/components/Form/Input'
import { FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { IFilterSearchCoupon } from '../useCouponsPage'

interface IFilterFormCouponProps {
  formik: FormikProps<IFilterSearchCoupon>
}

export const FilterFormCoupon = ({ formik }: IFilterFormCouponProps) => {
  const { t } = useTranslation()
  return (
    <>
      <Input<IFilterSearchCoupon> className="col-span-12" name="title" label={`${t('title')}`} formik={formik} />
    </>
  )
}
