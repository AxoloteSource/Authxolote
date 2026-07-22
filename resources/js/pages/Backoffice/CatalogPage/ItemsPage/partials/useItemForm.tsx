import { useOnSubmit } from '@/hooks/useOnSubmit'
import { IItem } from '@/interfaces/models/Item/IItem'
import { useServiceStoreItem, useServiceUpdateItem } from '@/services/rewards/items/useServiceItems'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { es } from 'yup-locales'
Yup.setLocale(es)

export interface IInitialValuesItem {
  name: string
  external_item_id: string
  points_price: number
  rewardable: boolean
  reward_points: number
  business_id: number
  images: File[] | null
}

const initialValues: IInitialValuesItem = {
  name: '',
  external_item_id: '',
  points_price: 0,
  rewardable: true,
  reward_points: 0,
  business_id: 1, // Default business ID for now
  images: null
}

interface IUseItemFormProps {
  selectedItem?: IItem | null
  onSuccess?: () => void
}

export const useItemForm = ({ selectedItem, onSuccess }: IUseItemFormProps) => {
  const { t } = useTranslation()
  const businessId = selectedItem?.business_id ?? 1

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required')),
    points_price: Yup.number().when('rewardable', {
      is: true,
      then: (schema) => schema.required(t('required_field')).min(0, t('only_number')),
      otherwise: (schema) => schema.nullable()
    }),
    reward_points: Yup.number().min(0, t('only_number')),
    rewardable: Yup.boolean().required(),
    images: Yup.array().nullable()
  })

  const mutator = useServiceStoreItem(businessId)
  const mutatorUpdate = useServiceUpdateItem(businessId, selectedItem?.id ?? 0)

  const { onSubmit } = useOnSubmit<IInitialValuesItem>({
    mutateAsync: selectedItem?.id ? mutatorUpdate.mutateAsync : mutator.mutateAsync,
    onSuccess: async () => {
      if (onSuccess) {
        onSuccess()
      }
    }
  })

  const filledValues: IInitialValuesItem = {
    ...initialValues,
    name: selectedItem?.name ?? '',
    external_item_id: selectedItem?.external_item_id ?? '',
    points_price: selectedItem?.points_price ?? 0,
    rewardable: selectedItem?.rewardable ?? true,
    reward_points: selectedItem?.reward_points ?? 0,
    business_id: businessId,
    images: null
  }

  const formikProps = {
    validationSchema,
    initialValues: filledValues,
    onSubmit
  }

  return { formikProps, t }
}
