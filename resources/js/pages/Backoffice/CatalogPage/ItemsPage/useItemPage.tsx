import Button from '@/components/Buttons/Button'
import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IItem } from '@/interfaces/models/Item/IItem'
import { useServiceIndexItems } from '@/services/rewards/items/useServiceItems'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface IFilterSearchItem {
  name: string
}

export const useItemPage = () => {
  const { isOpen, open, close } = useModal(false)
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null)

  const filters: IFilters<IFilterSearchItem>[] = [
    {
      property: 'name',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'item', service: useServiceIndexItems, close })

  const handleEdit = (data: IItem) => {
    open()
    setSelectedItem(data)
  }

  const handleOpen = () => {
    open()
    setSelectedItem(null)
  }

  const renderersMap = {
    actions: (data: IItem) => {
      return (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(data)}>{t('edit')}</Button>
        </div>
      )
    },
    rewardable: (data: IItem) => {
      return data.rewardable ? t('active') : t('inactive')
    },
    'files[0].path': (data: IItem) => {
      return data.files?.[0]?.path ? <img src={`/storage/${data.files[0].path}`} className="h-25 w-25 rounded object-cover" alt={data.name} /> : null
    }
  }

  return {
    isOpen,
    open: handleOpen,
    close,
    filters,
    renderersMap,
    selectedItem,
    refreshKey,
    handleSuccess
  }
}
