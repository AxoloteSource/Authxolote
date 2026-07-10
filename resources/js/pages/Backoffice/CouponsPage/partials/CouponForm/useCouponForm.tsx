import { IOptions } from '@/components/Form/Select/interfaces/IOptions'
import { useOnSubmit } from '@/hooks/useOnSubmit'
import { useSelectService } from '@/hooks/useSelectService'
import { ICoupon } from '@/interfaces/models/Coupon/ICoupon'
import { IImage } from '@/interfaces/models/Image/IImage'
import { useServiceCouponSend } from '@/services/rewards/coupons/useServiceCouponSend'
import { useServiceStoreCoupon, useServiceUpdateCoupon } from '@/services/rewards/coupons/useServiceCoupons'
import { useServiceIndexCouponTypes } from '@/services/rewards/coupons/useServiceCouponTypes'
import { useServiceUserListsSelect } from '@/services/rewards/coupons/useServiceUserListsSelect'
import { FormikProps } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

export interface IInitialValuesCoupon {
  title: string
  description: string
  amount: number
  expiration_date: string
  coupon_type_id: number
  business_id: number
  image_id?: number | null
}

const initialValues: IInitialValuesCoupon = {
  title: '',
  description: '',
  amount: 0,
  expiration_date: '',
  coupon_type_id: 2,
  business_id: 1,
  image_id: null
}

interface IUseCouponFormProps {
  selectedItem?: ICoupon | null
  onSuccess?: (data: Record<string, unknown>) => void
  close: () => void
  isOpen: boolean
  initialStep?: number
}

export const useCouponForm = ({ selectedItem, onSuccess, close, isOpen, initialStep = 0 }: IUseCouponFormProps) => {
  const { t } = useTranslation()

  const [currentStep, setCurrentStep] = useState(initialStep)
  const [savedCoupon, setSavedCoupon] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    setCurrentStep(initialStep)
    if (!isOpen) {
      setSavedCoupon(null)
    }
  }, [isOpen, initialStep])

  const {
    options: couponTypeOptions,
    isLoading: isLoadingCouponTypes,
    handleInputChange: handleCouponTypeInputChange
  } = useSelectService({
    useService: useServiceIndexCouponTypes,
    storeKey: 'coupon_type'
  })

  const {
    options: userListOptions,
    isLoading: isLoadingUserLists,
    handleInputChange: handleUserListInputChange
  } = useSelectService({
    useService: useServiceUserListsSelect,
    value: 'name',
    label: 'name',
    storeKey: 'user_list',
    useCache: false
  })

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('title_required')),
    description: Yup.string().required(t('description_required')),
    amount: Yup.number().min(0, t('amount_min_0')).required(t('amount_required')),
    expiration_date: Yup.date().required(t('expiration_date_required')),
    coupon_type_id: Yup.number().required(),
    business_id: Yup.number().required()
  })

  const mutator = useServiceStoreCoupon(selectedItem?.business_id ?? 1)
  const mutatorUpdate = useServiceUpdateCoupon(selectedItem?.business_id ?? 1, selectedItem?.id ?? 0)

  const { onSubmit } = useOnSubmit<IInitialValuesCoupon>({
    mutateAsync: selectedItem?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async (data) => {
      setSavedCoupon(data)
      setCurrentStep(1)
      if (onSuccess) {
        onSuccess(data)
      }
    }
  })

  const filledValues = {
    ...initialValues,
    title: selectedItem?.title ?? '',
    description: selectedItem?.description ?? '',
    amount: selectedItem?.amount ?? 0,
    expiration_date: selectedItem?.expiration_date ?? '',
    coupon_type_id: selectedItem?.coupon_type_id ?? 2,
    business_id: selectedItem?.business_id ?? 1
  }

  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }

  const couponId = (savedCoupon?.id as number) ?? selectedItem?.id ?? 0
  const businessId = (savedCoupon?.business_id as number) ?? selectedItem?.business_id ?? 1
  const sendMutation = useServiceCouponSend(businessId, couponId)

  const handleSend = (listId: string) => {
    if (!listId) return

    sendMutation.mutate(
      { user_list_id: listId },
      {
        onSuccess: () => {
          close()
          onSuccess?.()
        }
      }
    )
  }

  const handleSelectImage = (formik: FormikProps<IInitialValuesCoupon>) => (image: IImage | null) => {
    formik.setFieldValue('image_id', image?.id ?? null)
  }

  const [selectedRecords, setSelectedRecords] = useState<Record<string, unknown>[]>([])

  return {
    formikProps,
    t,
    currentStep,
    setCurrentStep,
    couponTypeOptions: couponTypeOptions as IOptions[],
    isLoadingCouponTypes,
    handleCouponTypeInputChange,
    userListOptions: userListOptions as IOptions[],
    isLoadingUserLists,
    handleUserListInputChange,
    sendMutation,
    handleSend,
    selectedRecords,
    setSelectedRecords,
    handleSelectImage
  }
}
