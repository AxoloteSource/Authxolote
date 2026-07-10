import { alertSwal } from '@/components/AlertSwal/AlertSwal'
import { AlertTypeEnum } from '@/enums/types/AlertTypeEnum'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { ICoupon } from '@/interfaces/models/Coupon/ICoupon'
import { useServiceStoreCouponUser } from '@/services/rewards/coupons/useServiceCouponUser'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export interface IInitialValuesCouponUser {
  user_ids: number[]
}

interface IUseCouponUserFormProps {
  selectedItem: ICoupon
  onSuccess?: () => void
}

export const useCouponUserForm = ({ selectedItem, onSuccess }: IUseCouponUserFormProps) => {
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    user_ids: Yup.array().min(1, t('user_ids_required')).required(t('user_ids_required'))
  })

  const mutator = useServiceStoreCouponUser(selectedItem.business_id)

  const { onSubmit } = useOnSubmit<IInitialValuesCouponUser>({
    mutateAsync: mutator.mutateAsync,
    formatData: (data) => ({
      ...data,
      coupon_id: selectedItem.id
    }),
    onSuccess: async () => {
      alertSwal({ type: AlertTypeEnum.SuccessNotification, title: t('users_linked_successfully') })
      if (onSuccess) {
        onSuccess()
      }
    },
    onError: () => {
      alertSwal({ type: AlertTypeEnum.ErrorNotification, title: t('error_linking_users') })
    }
  })

  const initialValues: IInitialValuesCouponUser = {
    user_ids: []
  }

  const formikProps = {
    validationSchema,
    initialValues,
    onSubmit
  }

  return { formikProps, t, selectedItem }
}
