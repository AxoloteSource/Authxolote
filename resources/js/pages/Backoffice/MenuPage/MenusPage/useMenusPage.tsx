import Button from '@/components/Buttons/Button'
import { IFilters } from '@/components/Filters/ModalFilter/types'
import { useModal } from '@/hooks/useModal'
import { useRefreshKey } from '@/hooks/useRefreshKey'
import { IMenu } from '@/interfaces/models/Menu/IMenu'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { useServiceDeleteMenu, useServiceIndexMenus } from '@/services/authxolote/menus/useServiceMenus'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export interface IFilterSearchMenu {
  name: string
}

export const useMenusPage = () => {
  const { isOpen, open, close } = useModal(false)
  const { t } = useTranslation()
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null)
  const filters: IFilters<IFilterSearchMenu>[] = [
    {
      property: 'name',
      initialValue: ''
    }
  ]

  const { refreshKey, handleSuccess } = useRefreshKey({ module: 'menu', service: useServiceIndexMenus, close })

  const handleEdit = (data: IMenu) => {
    open()
    setSelectedMenu(data)
  }

  const handleOpen = () => {
    open()
    setSelectedMenu(null)
  }

  const handleDeleteAction = (data: IMenu) => () => {
    const confirmed = window.confirm(t('confirm_delete_menu'))
    if (confirmed) {
      const { mutateAsync } = useServiceDeleteMenu(data.id)
      mutateAsync({}).then(() => {
        handleSuccess()
      })
    }
  }

  const renderersMap = {
    actions: (data: IMenu) => {
      return (
        <div className="flex gap-2">
          <Link to={`${RoutesBackoffice.MenuShow}?slug=${data.slug}`}>
            <Button>{t('show')}</Button>
          </Link>
          <Button onClick={() => handleEdit(data)}>{t('edit')}</Button>
          <Button onClick={handleDeleteAction(data)}>{t('delete')}</Button>
        </div>
      )
    }
  }

  return {
    isOpen,
    open: handleOpen,
    close,
    filters,
    renderersMap,
    selectedMenu,
    refreshKey,
    handleSuccess
  }
}
