import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IImage } from '@/interfaces/models/Image/IImage'
import { useServiceIndexImages } from '@/services/rewards/images/useServiceImages'
import { useState } from 'react'

export interface IFilterSearchImage {
  name: string
}

export const useImagesPage = () => {
  const { isOpen, open, close } = useModal(false)
  const [selectedItem, setSelectedItem] = useState<IImage | null>(null)

  const filters: IFilters<IFilterSearchImage>[] = [
    {
      property: 'name',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'image', service: useServiceIndexImages, close })

  const handleOpen = () => {
    open()
    setSelectedItem(null)
  }

  const renderersMap = {
    path: (data: IImage) => {
      return <img src={`/storage/${data.path}`} className="h-25 w-25 rounded object-cover shadow-sm" alt={data.name} />
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
