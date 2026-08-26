import Button from '@/components/Buttons/Button'
import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IMenuItem } from '@/interfaces/models/MenuItem/IMenuItem'
import { useServiceDeleteMenuItem, useServiceIndexMenuItems } from '@/services/authxolote/menuItems/useServiceMenuItems'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItemsTree } from './partials/MenuItemsTree'

export interface IFilterSearchMenuItem {
  name: string
  menu_id: string
}

export const useMenuItemsPage = () => {
  const { isOpen, open, close } = useModal(false)
  const { t } = useTranslation()
  const [selectedMenuItem, setSelectedMenuItem] = useState<IMenuItem | null>(null)
  const filters: IFilters<IFilterSearchMenuItem>[] = [
    {
      property: 'name',
      initialValue: ''
    },
    {
      property: 'menu_id',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'menuItem', service: useServiceIndexMenuItems, close })

  const handleEdit = (data: IMenuItem) => {
    open()
    setSelectedMenuItem(data)
  }

  const handleOpen = () => {
    open()
    setSelectedMenuItem(null)
  }

  const handleDeleteAction = (data: IMenuItem) => () => {
    const confirmed = window.confirm(t('confirm_delete_menu_item'))
    if (confirmed) {
      const { mutateAsync } = useServiceDeleteMenuItem(data.id)
      mutateAsync({}).then(() => {
        handleSuccess()
      })
    }
  }

  const renderersMap = {
    actions: (data: IMenuItem) => {
      return (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(data)}>{t('edit')}</Button>
          <Button onClick={handleDeleteAction(data)}>{t('delete')}</Button>
        </div>
      )
    }
  }

  const rowExpansion = {
    content: ({ record }: { record: Record<string, unknown> }) => {
      const item = record as unknown as IMenuItem
      return <MenuItemsTree items={item.children ?? []} />
    }
  }

  return {
    isOpen,
    open: handleOpen,
    close,
    filters,
    renderersMap,
    rowExpansion,
    selectedMenuItem,
    refreshKey,
    handleSuccess
  }
}
