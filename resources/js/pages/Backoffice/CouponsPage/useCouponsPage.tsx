import { Badge } from '@/components/Badge/Badge'
import { BadgeVariant } from '@/components/Badge/IBadgeProps'
import { Dropdown, DropdownItem } from '@/components/Dropdown'
import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { ICoupon } from '@/interfaces/models/Coupon/ICoupon'
import { useServiceDestroyCoupon, useServiceIndexCoupons } from '@/services/rewards/coupons/useServiceCoupons'
import { Edit3, SendHorizontal, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface IFilterSearchCoupon {
  title: string
}

export const useCouponsPage = () => {
  const { isOpen, open, close } = useModal(false)
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<ICoupon | null>(null)
  const [initialStep, setInitialStep] = useState(0)

  const filters: IFilters<IFilterSearchCoupon>[] = [
    {
      property: 'title',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'coupon', service: useServiceIndexCoupons })

  const handleEdit = (data: ICoupon) => {
    setInitialStep(0)
    setSelectedItem(data)
    open()
  }

  const handleOpen = () => {
    setInitialStep(0)
    setSelectedItem(null)
    open()
  }

  const [deleteTarget, setDeleteTarget] = useState<{ businessId: number; id: number } | null>(null)
  const destroyMutation = useServiceDestroyCoupon(deleteTarget?.businessId ?? 0, deleteTarget?.id ?? 0)

  useEffect(() => {
    if (deleteTarget) {
      destroyMutation.mutate(undefined, {
        onSuccess: () => {
          handleSuccess()
          setDeleteTarget(null)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTarget])

  const handleSendCoupon = (data: ICoupon) => {
    setSelectedItem(data)
    setInitialStep(1)
    open()
  }

  const handleDelete = (data: ICoupon) => {
    if (!window.confirm(t('confirm_delete_coupon'))) return
    setDeleteTarget({ businessId: data.business_id, id: data.id })
  }

  const renderersMap = {
    'image.path': (data: ICoupon) => {
      if (!data.image?.url) {
        return (
          <div>NOT FOUND</div>
        )
      }
      return <img src={data.image.url} className="h-25 w-25 rounded object-cover shadow-sm" alt={data.image.name ?? '-'} />
    },
    amount: (data: ICoupon) => {
      return `$${data.amount}`
    },
    status: (data: ICoupon) => {
      const statusName = data.status?.name ?? ''
      const statusVariant: Record<string, BadgeVariant> = {
        active: 'success',
        activo: 'success',
        inactive: 'danger',
        inactivo: 'danger',
        expired: 'danger',
        vencido: 'danger',
        pending: 'warning',
        pendiente: 'warning',
        redeemed: 'info',
        canjeado: 'info'
      }

      const variant = statusVariant[statusName.toLowerCase()] ?? 'primary'

      return <Badge variant={variant}>{statusName}</Badge>
    },
    actions: (data: ICoupon) => {
      return (
        <Dropdown title={t('actions')}>
          <DropdownItem onClick={() => handleEdit(data)} disabled={data.status?.id !== 1}>
            <Edit3 size={18} />
            {t('edit')}
          </DropdownItem>
          <DropdownItem onClick={() => handleSendCoupon(data)} disabled={data.status?.id !== 1}>
            <SendHorizontal size={18} />
            {t('send')}
          </DropdownItem>
          <DropdownItem onClick={() => handleDelete(data)}>
            <Trash2 size={18} />
            {t('delete')}
          </DropdownItem>
        </Dropdown>
      )
    }
  }

  return {
    isOpen,
    open: handleOpen,
    close,
    filters,
    renderersMap,
    selectedItem,
    initialStep,
    refreshKey,
    handleSuccess
  }
}
